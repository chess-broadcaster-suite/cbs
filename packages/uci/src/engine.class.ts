import type { UCIInterface } from '#interfaces/uci.interfaces'
import type {
	GoUCIParams,
	PositionUCIParams,
	RegisterUCIParams,
	SetDebugUCIParams,
	SetOptionUCIParams,
	UCIBestmoveMessage,
	UCIDataCallback,
	UCIEngineParams,
	UCIErrorCallback,
	UCIInvalidMessageCallback,
	UCIOKMessage,
	UCIReadyokMessage,
} from '#types/uci.types'
import type { CallbackQueue, CallbackSet } from '#types/util.types'
import type { ChildProcess } from 'child_process'

import { UCIEngineState, UCIMessageType, UCISearchType } from '#enums/uci.enums'
import {
	COMPLETE_ANALYSIS_TIMEOUT,
	COMPLETE_INFINITE_ANALYSIS,
	EXPECTED_BESTMOVE,
	EXPECTED_READYOK,
	EXPECTED_UCIOK,
	FAILED_TO_INITIALIZE_ENGINE,
	ISREADY_TIMEOUT,
	STOP_TIMEOUT,
	UCI_TIMEOUT,
	UNABLE_TO_GO,
	UNABLE_TO_REGISTER,
	UNABLE_TO_SET_POSITION,
} from '#structs/messages'
import { UCIError } from '#structs/uci-error.class'
import { buildGoString } from '#utils/build-go-string.util'
import { buildPositionString } from '#utils/build-position-string.util'
import { parseUCIMessage } from '#utils/parse-uci-message.util'
import { writeUCIMessage } from '#utils/write-uci-message.util'
import { exec } from 'child_process'

const DEFAULT_UCI_OK_TIMEOUT_MS = 10000
const DEFAULT_ISREADY_TIMEOUT_MS = 10000
const DEFAULT_BESTMOVE_TIMEOUT_MS = 10000

export class Engine implements UCIInterface {
	protected path: string
	protected dataCallback: UCIDataCallback
	protected errorCallback?: UCIErrorCallback
	protected invalidMessageCallback?: UCIInvalidMessageCallback
	protected uciokTimeout: number
	protected isreadyTimeout: number
	protected stopTimeout: number

	protected process?: ChildProcess
	protected dataAccumulator: Buffer
	protected state: UCIEngineState
	protected currentSearchType: UCISearchType

	protected uciCallbackQueue: CallbackQueue<UCIOKMessage>
	protected isreadyCallbackQueue: CallbackQueue<UCIReadyokMessage>
	protected bestmoveCallbackSet: CallbackSet<UCIBestmoveMessage>

	/**
	 * Set up the object with parameters, not starting engine process yet.
	 *
	 * @param {UCIEngineParams} params
	 * @param {number?} params.stopTimeout optional; timeout for the stop command
	 * @param {UCIDataCallback} params.dataCallback to be triggered on new messages
	 * @param {UCIErrorCallback?} params.errorCallback optional callback to trigger on engine process stderror data
	 * @param {UCIInvalidMessageCallback?} params.invalidMessageCallback optional callback to trigger on non uci-compliant messages on stdout
	 * @param {number?} params.isreadyTimeout optional isready timeout in ms (default = 10000)
	 * @param {string} params.path engine path
	 * @param {number?} params.uciokTimeout optional uci timeout in ms (default = 10000)
	 */
	constructor({
		dataCallback,
		errorCallback,
		invalidMessageCallback,
		isreadyTimeout = DEFAULT_ISREADY_TIMEOUT_MS,
		path,
		stopTimeout,
		uciokTimeout = DEFAULT_UCI_OK_TIMEOUT_MS,
	}: UCIEngineParams) {
		this.path = path
		this.dataCallback = dataCallback
		this.errorCallback = errorCallback
		this.invalidMessageCallback = invalidMessageCallback
		this.uciokTimeout = uciokTimeout
		this.isreadyTimeout = isreadyTimeout
		this.stopTimeout = stopTimeout ?? DEFAULT_BESTMOVE_TIMEOUT_MS

		this.dataAccumulator = Buffer.alloc(0)
		this.state = UCIEngineState.NOT_INITIALIZED
		this.currentSearchType = UCISearchType.INFINITE

		this.uciCallbackQueue = []
		this.isreadyCallbackQueue = []
		this.bestmoveCallbackSet = new Set()
	}

	/**
	 * Kicks off the process and awaits it with isready() call
	 *
	 * @throws {UCIError} if unable to create process or not ready
	 */
	public async initialize(): Promise<void> {
		try {
			this.process = exec(this.path)
			this.process.stdout?.on('data', (data: Buffer | string) => this.processData(data))
			this.process.stderr?.on('data', (data: Buffer | string) => this.errorCallback?.(data))

			this.dataAccumulator = Buffer.alloc(0)
			this.uciCallbackQueue = []
			this.isreadyCallbackQueue = []

			await this.uci()
		} catch (err) {
			throw new UCIError(FAILED_TO_INITIALIZE_ENGINE, { cause: err })
		}

		await this.isready()
	}

	/**
	 * Grab all available data up to the last linebreak,
	 * parse observed messages and pass them to the data callback.
	 *
	 * @param {Buffer | string} data new console chunk
	 */
	protected processData(data: Buffer | string): void {
		const newDataBuffer = typeof data === 'string' ? Buffer.from(data) : (data as Buffer)
		this.dataAccumulator = Buffer.concat([this.dataAccumulator, newDataBuffer])
		const lastNewlineIdx = this.dataAccumulator.lastIndexOf(0x0a)

		if (lastNewlineIdx === undefined) {
			return
		}

		const chunk = this.dataAccumulator.subarray(0, lastNewlineIdx + 1)
		const remainder = this.dataAccumulator.subarray(lastNewlineIdx + 1)

		const normalized = chunk.toString('utf8').replace(/\r\n/g, '\n')
		const lines = normalized.split('\n')
		const messages = lines
			.map((line) => parseUCIMessage(line, this.invalidMessageCallback))
			.filter((message) => message !== undefined)
		for (const message of messages) {
			switch (message.type) {
				case UCIMessageType.UCIOK:
					if (this.uciCallbackQueue.length > 0) {
						this.uciCallbackQueue.splice(0, 1)[0](message)
					}
					if (this.state === UCIEngineState.NOT_INITIALIZED) {
						this.state = UCIEngineState.STOPPED
					}
					continue
				case UCIMessageType.READYOK:
					if (this.isreadyCallbackQueue.length > 0) {
						this.isreadyCallbackQueue.splice(0, 1)[0](message)
					}
					continue
				case UCIMessageType.BEST_MOVE:
					this.state = UCIEngineState.STOPPED
					this.bestmoveCallbackSet.forEach((cb) => cb(message))
					this.bestmoveCallbackSet.clear()
					continue
			}
		}

		this.dataAccumulator = remainder
		this.dataCallback(messages)
	}

	/**
	 * A mechanism to await finite analysis - resolves only when bestmove is received (or if no analysis running)
	 *
	 * @param {number?} timeout optional timeout in ms
	 * @returns {Promise<UCIBestmoveMessage | void>} ucibestmove if running, otherwise nothing
	 *
	 * @throws {UCIError} if analysis fails to finish in specified time or if trying to run this on infinite analysis
	 */
	public async completeAnalysis(timeout?: number): Promise<UCIBestmoveMessage | void> {
		if (this.currentSearchType === UCISearchType.INFINITE) {
			throw new UCIError(COMPLETE_INFINITE_ANALYSIS)
		}
		if (this.state !== UCIEngineState.RUNNING) {
			return undefined
		}

		return new Promise((resolve, reject) => {
			this.bestmoveCallbackSet.add(resolve)

			if (!timeout) {
				return
			}
			setTimeout(() => {
				this.bestmoveCallbackSet.delete(resolve)

				reject(new UCIError(COMPLETE_ANALYSIS_TIMEOUT))
			}, timeout)
		})
	}

	/**
	 * Sends uci command, awaiting uciok
	 *
	 * @returns {UCIOKMessage} uciok
	 *
	 * @throws {UCIError} if unable to write command or if no uciok received in time
	 */
	public async uci(): Promise<UCIOKMessage> {
		writeUCIMessage({ message: 'uci', process: this.process })

		try {
			return new Promise((resolve, reject) => {
				this.uciCallbackQueue.push(resolve)

				setTimeout(() => {
					const idx = this.uciCallbackQueue.findIndex((el) => el === resolve)
					if (idx !== -1) {
						this.uciCallbackQueue.splice(idx, 1)
					}

					reject(new UCIError(UCI_TIMEOUT))
				}, this.uciokTimeout)
			})
		} catch (err) {
			throw new UCIError(EXPECTED_UCIOK, { cause: err })
		}
	}

	/**
	 * Sets engine debug mode on/off
	 *
	 * @param {SetDebugUCIParams} params
	 * @param params.turnOn
	 *
	 * @throws {UCIError} if unable to write uci command
	 */
	public debug({ turnOn }: SetDebugUCIParams): void {
		const message = `debug ${turnOn ? 'on' : 'off'}`
		writeUCIMessage({ message, process: this.process })
	}

	/**
	 * Sends isready command, awaiting readyok.
	 *
	 * @returns {UCIReadyokMessage} readyok
	 *
	 * @throws {UCIError} if unable to write command or if no readyok received in time
	 */
	public async isready(): Promise<UCIReadyokMessage> {
		writeUCIMessage({ message: 'isready', process: this.process })

		try {
			return await new Promise((resolve, reject) => {
				this.isreadyCallbackQueue.push(resolve)

				setTimeout(() => {
					const idx = this.isreadyCallbackQueue.findIndex((el) => el === resolve)
					if (idx !== -1) {
						this.isreadyCallbackQueue.splice(idx, 1)
					}

					reject(new UCIError(ISREADY_TIMEOUT))
				}, this.isreadyTimeout)
			})
		} catch (err) {
			throw new UCIError(EXPECTED_READYOK, { cause: err })
		}
	}

	/**
	 * Sends engine options command
	 * @param {SetOptionUCIParams}params
	 * @param {string} params.name
	 * @param {string} params.value
	 *
	 * @throws {UCIError} if unable to write command
	 */
	public setoption({ name, value }: SetOptionUCIParams): void {
		const message = `setoption name ${name} value ${value}`
		writeUCIMessage({ message, process: this.process })
	}

	/**
	 * Send the register command
	 *
	 * @param {RegisterUCIParams} params
	 *
	 * @throws {UCIError} if unable to write command
	 */
	public register(params: RegisterUCIParams): void {
		const { code, later, name } = params as Partial<{ code: string; later: boolean; name: string }>
		try {
			if (later === undefined && (name === undefined || code === undefined)) {
				return
			}
			if (later === true) {
				writeUCIMessage({ message: 'register later', process: this.process })
				return
			}
			writeUCIMessage({ message: `register name ${name} code ${code}`, process: this.process })
			return
		} catch (err) {
			throw new UCIError(UNABLE_TO_REGISTER, { cause: err })
		}
	}

	/**
	 * Sends the ucinewgame command
	 *
	 * @throws {UCIError} if unable to write command
	 */
	public ucinewgame(): void {
		writeUCIMessage({ message: 'ucinewgame', process: this.process })
	}

	/**
	 * Set position and moves.
	 * If this position is from a different game than the last position sent
	 * to the engine, an ucinewgame should be sent in-between
	 *
	 * @param {PositionUCIParams} params either fen & startpos has to be present
	 *
	 * @throws {UCIError} if unable to write command
	 */
	public position(params: PositionUCIParams): void {
		try {
			const message = buildPositionString(params)
			writeUCIMessage({ message, process: this.process })
			return
		} catch (err) {
			throw new UCIError(UNABLE_TO_SET_POSITION, { cause: err })
		}
	}

	/**
	 * Send go command. Don't send if already going.
	 * defers to infinite search even without an explicit infinite if no depth|nodes|movetime specified
	 *
	 * @param params go command params, all optional
	 *
	 * @throws {UCIError} if unable to write command
	 */
	public go(params: GoUCIParams): void {
		try {
			if (this.state === UCIEngineState.RUNNING) {
				return
			}

			const { depth, infinite, movetime, nodes } = params
			const isInfinite = infinite ?? (!depth && !nodes && !movetime ? true : undefined)
			const message = buildGoString({ ...params, infinite: isInfinite })

			this.state = UCIEngineState.RUNNING
			this.currentSearchType = isInfinite ? UCISearchType.INFINITE : UCISearchType.FINITE
			writeUCIMessage({ message, process: this.process })
		} catch (err) {
			throw new UCIError(UNABLE_TO_GO, { cause: err })
		}
	}

	/**
	 * Write stop command, returning best move if running.
	 *
	 * @returns {UCIBestmoveMessage} if engine's running
	 *
	 * @throws {UCIError} if unable to write command or if stop times out
	 */
	public async stop(): Promise<UCIBestmoveMessage | void> {
		if (this.state !== UCIEngineState.RUNNING) {
			return
		}

		writeUCIMessage({ message: 'stop', process: this.process })

		try {
			return new Promise((resolve, reject) => {
				this.bestmoveCallbackSet.add(resolve)

				setTimeout(() => {
					this.bestmoveCallbackSet.delete(resolve)

					reject(new UCIError(STOP_TIMEOUT))
				}, this.stopTimeout)
			})
		} catch (err) {
			throw new UCIError(EXPECTED_BESTMOVE, { cause: err })
		}
	}

	/**
	 * Write ponderhit command
	 *
	 * @throws {UCIError} if unable to write command
	 */
	public ponderhit(): void {
		writeUCIMessage({ message: 'ponderhit', process: this.process })
	}

	/**
	 * Write quit command
	 *
	 * @throws {UCIError} if unable to write command
	 */
	public quit(): void {
		writeUCIMessage({ message: 'quit', process: this.process })
		if (this.state !== UCIEngineState.NOT_INITIALIZED) {
			this.state = UCIEngineState.STOPPED
		}
	}
}
