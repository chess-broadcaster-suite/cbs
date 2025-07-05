import type {
	AnyUCIMessage,
	UCIInvalidMessageCallback,
	UCIOKMessage,
	UCIReadyokMessage,
} from '#types/uci.types'

import { UCIMessageType } from '#enums/uci.enums'
import { UCIOK, UCIREADYOK } from '#structs/consts'
import { parseUCIBestmoveMessage } from '#utils/parse-uci-bestmove-message.util'
import { parseUCICopyProtectionMessage } from '#utils/parse-uci-copyprotection-message.util'
import { parseUCIIDMessage } from '#utils/parse-uci-id-message.util'
import { parseUCIInfoMessage } from '#utils/parse-uci-info-message.util'
import { parseUCIOptionMessage } from '#utils/parse-uci-option-message.util'
import { parseUCIRegistrationMessage } from '#utils/parse-uci-registration-message.util'

/**
 * Parse engine UCI output, optionally invoking invalidMessageCallback on unparseable/partially unparseable messages
 *
 * @param line uci line to parse
 * @param invalidMessageCallback invoke when parsing non-compliant message
 * @returns AnyUCIMessage or undefined if unparseable
 */
export function parseUCIMessage(
	line: string,
	invalidMessageCallback?: UCIInvalidMessageCallback,
): AnyUCIMessage | undefined {
	const trimmed = line.trim()
	if (trimmed.length === 0) {
		return undefined
	}

	const bits = trimmed.split(/\s+/)
	switch (bits[0]) {
		case 'id':
			return parseUCIIDMessage(line, invalidMessageCallback)

		case UCIOK:
			const uciokMessage: UCIOKMessage = { raw: line, type: UCIMessageType.UCIOK }
			return uciokMessage

		case UCIREADYOK:
			const readyokMessage: UCIReadyokMessage = { raw: line, type: UCIMessageType.READYOK }
			return readyokMessage

		case 'bestmove':
			return parseUCIBestmoveMessage(line, invalidMessageCallback)

		case 'copyprotection':
			return parseUCICopyProtectionMessage(line, invalidMessageCallback)

		case 'registration':
			return parseUCIRegistrationMessage(line, invalidMessageCallback)

		case 'info':
			return parseUCIInfoMessage(line, invalidMessageCallback)

		case 'option':
			return parseUCIOptionMessage(line, invalidMessageCallback)
	}

	invalidMessageCallback?.(line)
	return undefined
}
