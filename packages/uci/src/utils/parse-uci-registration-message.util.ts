import { UCIMessageType, UCIRegistrationStatus } from '#enums/uci.enums'
import { UCIInvalidMessageCallback, UCIRegistrationMessage } from '#types/uci.types'

/**
 * Parse registration message; assuming first word is 'registration'.
 * Ignore extraneous whitespace.
 *
 * @param raw uci line
 * @param invalidMessageCallback invoke when parsing non-compliant message
 * @returns parsed message object
 */
export function parseUCIRegistrationMessage(
	raw: string,
	invalidMessageCallback?: UCIInvalidMessageCallback,
): UCIRegistrationMessage | undefined {
	const bits = raw.trim().split(/\s+/)
	const status = bits[1]
	if (!Object.values(UCIRegistrationStatus).includes(status as UCIRegistrationStatus)) {
		invalidMessageCallback?.(raw)
		return undefined
	}
	const message: UCIRegistrationMessage = {
		raw,
		status: status as UCIRegistrationStatus,
		type: UCIMessageType.REGISTRATION,
	}
	return message
}
