import { UCIMessageType, UCIOptionToken, UCIOptionType } from '#enums/uci.enums'
import {
	EXPECTED_INTEGER,
	INVALID_OPTION_MESSAGE,
	INVALID_OPTION_TYPE,
	NO_TOKEN_FOR_VALUE,
} from '#structs/messages'
import { UCIError } from '#structs/uci-error.class'
import { UCIInvalidMessageCallback, UCIOptionMessage } from '#types/uci.types'

/**
 * Parse option message; assuming first word is 'option'.
 * Ignore leading & trailing whitespace.
 *
 * @param raw uci line
 * @param invalidMessageCallback invoke when parsing non-compliant message
 * @returns parsed message object
 */
export function parseUCIOptionMessage(
	raw: string,
	invalidMessageCallback?: UCIInvalidMessageCallback,
): UCIOptionMessage | undefined {
	const bits = raw.trim().split(/\s+/)
	let currentToken: UCIOptionToken | undefined
	let currentValue: string = ''
	const message: Partial<UCIOptionMessage> = {
		raw,
		type: UCIMessageType.OPTION,
	}

	for (const bit of bits.slice(1)) {
		try {
			const { currentToken: newToken, currentValue: newValue } = processBit({
				bit,
				currentToken,
				currentValue,
				message,
			})
			currentToken = newToken
			currentValue = newValue
		} catch {
			invalidMessageCallback?.(raw)

			currentToken = undefined
			currentValue = ''
		}
	}
	if (currentToken !== undefined) {
		try {
			processValue({ currentToken, currentValue, message })
		} catch {
			invalidMessageCallback?.(raw)
		}
	}

	if (message.optionType === undefined || message.name === undefined) {
		invalidMessageCallback?.(raw)

		return undefined
	}

	switch (message.optionType) {
		case UCIOptionType.CHECK:
			if (message.default !== undefined) {
				if (message.default === 'true' || message.default === '1') {
					message.default = true
				} else if (message.default === 'false' || message.default === '0') {
					message.default = false
				} else {
					invalidMessageCallback?.(raw)
					message.default = undefined
				}
			}
			break
		case UCIOptionType.SPIN:
			if (message.default !== undefined) {
				message.default = parseInt(message.default as string)
				if (isNaN(message.default)) {
					invalidMessageCallback?.(raw)
					message.default = undefined
				}
			}
			if (message.vars !== undefined) {
				for (let idx = 0; idx < message.vars.length; idx++) {
					message.vars[idx] = parseInt(message.vars[idx] as string)
					if (isNaN(message.vars[idx] as number)) {
						invalidMessageCallback?.(raw)
						message.vars = undefined
						break
					}
				}
			}
			break
		default:
			if (message.default === '<empty>') {
				message.default = ''
			}
			break
	}

	return message as UCIOptionMessage
}

function processBit(params: {
	bit: string
	currentToken?: UCIOptionToken
	currentValue: string
	message: Partial<UCIOptionMessage>
}): { currentToken?: UCIOptionToken; currentValue: string } {
	const { bit, message } = params
	let { currentToken, currentValue } = params

	const isToken = Object.values(UCIOptionToken).includes(bit as UCIOptionToken)
	if (!isToken) {
		if (currentToken === undefined) {
			throw new UCIError(INVALID_OPTION_MESSAGE, {
				cause: {
					message: NO_TOKEN_FOR_VALUE,
				},
			})
		}
		if (currentValue.length !== 0) {
			currentValue += ' '
		}
		currentValue += bit
		return { currentToken, currentValue }
	}

	if (currentToken !== undefined) {
		processValue({ currentToken, currentValue, message })
	}
	currentToken = bit as UCIOptionToken
	currentValue = ''

	return { currentToken, currentValue }
}

function processValue({
	currentToken,
	currentValue,
	message,
}: {
	currentToken: UCIOptionToken
	currentValue: string
	message: Partial<UCIOptionMessage>
}) {
	switch (currentToken) {
		case UCIOptionToken.TYPE:
			if (!Object.values(UCIOptionType).includes(currentValue as UCIOptionType)) {
				throw new UCIError(INVALID_OPTION_MESSAGE, {
					cause: {
						message: INVALID_OPTION_TYPE,
						raw: currentValue,
					},
				})
			}
			message.optionType = currentValue as UCIOptionType
			return
		case UCIOptionToken.VAR:
			if (message.vars === undefined) {
				message.vars = []
			}
			message.vars.push(currentValue)
			return
		case UCIOptionToken.MIN:
			message.min = parseInt(currentValue)
			if (isNaN(message.min)) {
				throw new UCIError(INVALID_OPTION_MESSAGE, {
					cause: {
						message: EXPECTED_INTEGER,
						raw: currentValue,
					},
				})
			}
			return
		case UCIOptionToken.MAX:
			message.max = parseInt(currentValue)
			if (isNaN(message.max)) {
				throw new UCIError(INVALID_OPTION_MESSAGE, {
					cause: {
						message: EXPECTED_INTEGER,
						raw: currentValue,
					},
				})
			}
			return
		default:
			;(message as unknown as Record<string, string>)[currentToken] = currentValue
			return
	}
}
