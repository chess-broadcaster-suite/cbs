import type { UCICopyprotectionMessage, UCIInvalidMessageCallback } from '#types/uci.types'

import { UCICopyProtectionStatus, UCIMessageType } from '#enums/uci.enums'

/**
 * Parse copyprotection message; assuming first word is 'copyprotection'.
 * Ignore extraneous whitespace.
 *
 * @param raw uci line
 * @param invalidMessageCallback invoke when parsing non-compliant message
 * @returns parsed message object
 */
export function parseUCICopyProtectionMessage(
	raw: string,
	invalidMessageCallback?: UCIInvalidMessageCallback,
): UCICopyprotectionMessage | undefined {
	const bits = raw.trim().split(/\s+/)
	const status = bits[1]
	if (!Object.values(UCICopyProtectionStatus).includes(status as UCICopyProtectionStatus)) {
		invalidMessageCallback?.(raw)

		return undefined
	}
	const message: UCICopyprotectionMessage = {
		raw,
		status: status as UCICopyProtectionStatus,
		type: UCIMessageType.COPY_PROTECTION,
	}
	return message
}
