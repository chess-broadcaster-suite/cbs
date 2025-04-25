import {
	ENGINE_NOT_INITIALIZED,
	ERROR_WRITING_TO_STDIN,
	STDIN_NOT_AVAILABLE,
} from '#structs/messages'
import { UCIError } from '#structs/uci-error.class'
import { ChildProcess } from 'child_process'

/**
 * Write uci message, adding the \n terminator
 *
 * @param params.process process to use
 * @param params.message raw string to write
 * @throws {UCIError} if unable to write
 */
export function writeUCIMessage({
	message,
	process,
}: {
	message: string
	process?: ChildProcess
}): void {
	if (process === undefined) {
		throw new UCIError(ENGINE_NOT_INITIALIZED)
	}
	const { stdin } = process
	if (stdin === undefined || stdin === null) {
		throw new UCIError(STDIN_NOT_AVAILABLE)
	}

	try {
		stdin.write(`${message}\n`)
	} catch (err) {
		throw new UCIError(ERROR_WRITING_TO_STDIN, { cause: err })
	}
}
