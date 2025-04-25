import type { UCIIDMessage, UCIInvalidMessageCallback } from '#types/uci.types'

import { UCIIDType, UCIMessageType } from '#enums/uci.enums'

/**
 * Parse id message; assuming first word is 'id'.
 * Ignore leading & trailing whitespace.
 *
 * @param raw uci line
 * @param invalidMessageCallback invoke when parsing non-compliant message
 * @returns parsed message object
 */
export function parseUCIIDMessage(
	raw: string,
	invalidMessageCallback?: UCIInvalidMessageCallback,
): UCIIDMessage | undefined {
	const bits = raw.trim().split(/\s+/)
	const id = bits[1]
	const value = bits.slice(2).join(' ')

	if (!Object.values(UCIIDType).includes(id as UCIIDType) || typeof value !== 'string') {
		invalidMessageCallback?.(raw)
		return undefined
	}
	const message: UCIIDMessage = { id, raw, type: UCIMessageType.ID, value }
	return message
}
