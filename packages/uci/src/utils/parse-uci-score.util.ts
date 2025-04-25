import { UCIScoreToken } from '#enums/uci.enums'
import { EXPECTED_INTEGER, INVALID_SCORE, NO_TOKEN_FOR_VALUE } from '#structs/messages'
import { UCIError } from '#structs/uci-error.class'
import { UCIScore } from '#types/uci.types'

/**
 * Parse UCI score from raw substring
 *
 * @param raw uci line substring
 * @returns UCIScore object
 * @throws {UCIError} on non-integer cp and mate values
 */
export function parseUCIScore(raw: string): UCIScore {
	const bits = raw.trim().split(/\s+/)
	const result: UCIScore = {}

	let currentToken: UCIScoreToken | undefined
	for (const bit of bits) {
		const isToken = Object.values(UCIScoreToken).includes(bit as UCIScoreToken)
		if (isToken) {
			switch (bit as UCIScoreToken) {
				case UCIScoreToken.CP:
				case UCIScoreToken.MATE:
					currentToken = bit as UCIScoreToken
					break
				case UCIScoreToken.LOWERBOUND:
					result.lowerbound = true
					break
				case UCIScoreToken.UPPERBOUND:
					result.upperbound = true
					break
			}
			continue
		}

		if (currentToken === undefined) {
			throw new UCIError(INVALID_SCORE, {
				cause: {
					message: NO_TOKEN_FOR_VALUE,
					raw,
				},
			})
		}

		const num = parseInt(bit)
		if (isNaN(num)) {
			throw new UCIError(INVALID_SCORE, {
				cause: {
					message: EXPECTED_INTEGER,
					raw,
				},
			})
		}
		switch (currentToken) {
			case UCIScoreToken.CP:
				result.cp = num
				break
			case UCIScoreToken.MATE:
				result.mate = num
				break
		}
	}

	return result
}
