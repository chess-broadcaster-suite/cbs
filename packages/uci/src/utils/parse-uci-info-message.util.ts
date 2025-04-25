import { UCIInfoNumericToken, UCIInfoToken, UCIMessageType } from '#enums/uci.enums'
import { EXPECTED_INTEGER, INVALID_INFO_MESSAGE, NO_TOKEN_FOR_VALUE } from '#structs/messages'
import { UCIError } from '#structs/uci-error.class'
import { UCIInfoMessage, UCIInvalidMessageCallback } from '#types/uci.types'
import { parseUCICurrline } from '#utils/parse-uci-currline.util'
import { parseUCIScore } from '#utils/parse-uci-score.util'

/**
 * Parse info UCI message. Ignore bad bits
 *
 * @param raw uci line
 * @param invalidMessageCallback invoke when parsing non-compliant message
 * @returns UCIInfoMessage
 */
export function parseUCIInfoMessage(
	raw: string,
	invalidMessageCallback?: UCIInvalidMessageCallback,
): UCIInfoMessage {
	const bits = raw.trim().split(/\s+/)
	const message: UCIInfoMessage = {
		raw,
		type: UCIMessageType.INFO,
	}
	let currentToken: UCIInfoToken | undefined
	let currentValue: string = ''

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

	return message
}

function processBit(params: {
	bit: string
	currentToken?: UCIInfoToken
	currentValue: string
	message: UCIInfoMessage
}): { currentToken?: UCIInfoToken; currentValue: string } {
	const { bit, message } = params
	let { currentToken, currentValue } = params

	if (currentToken === UCIInfoToken.STRING) {
		if (currentValue.length !== 0) {
			currentValue += ' '
		}
		currentValue += bit
		return { currentToken, currentValue }
	}

	const isToken = Object.values(UCIInfoToken).includes(bit as UCIInfoToken)
	if (!isToken) {
		if (currentToken === undefined) {
			throw new UCIError(INVALID_INFO_MESSAGE, {
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
	currentToken = bit as UCIInfoToken
	currentValue = ''

	return { currentToken, currentValue }
}

function processValue({
	currentToken,
	currentValue,
	message,
}: {
	currentToken: UCIInfoToken
	currentValue: string
	message: UCIInfoMessage
}) {
	if (
		[UCIInfoToken.SCORE, UCIInfoToken.PV, UCIInfoToken.REFUTATION, UCIInfoToken.CURRLINE].includes(
			currentToken as UCIInfoToken,
		)
	) {
		switch (currentToken) {
			case UCIInfoToken.SCORE:
				message.score = parseUCIScore(currentValue)
				break
			case UCIInfoToken.PV:
				message.pv = currentValue.split(/\s+/)
				break
			case UCIInfoToken.REFUTATION:
				const moves = currentValue.split(/\s+/)
				message.refutation = {
					move: moves[1],
					moves: moves.slice(1),
				}
				break
			case UCIInfoToken.CURRLINE:
				message.currline = parseUCICurrline(currentValue)
				break
		}

		return
	}

	const isNumeric: boolean = Object.values(UCIInfoNumericToken).includes(
		currentToken as string as UCIInfoNumericToken,
	)
	if (isNumeric && isNaN(parseInt(currentValue))) {
		throw new UCIError(INVALID_INFO_MESSAGE, {
			cause: {
				message: EXPECTED_INTEGER,
			},
		})
	}
	;(message as unknown as Record<string, string | number>)[currentToken] = isNumeric
		? parseInt(currentValue)
		: currentValue

	return
}
