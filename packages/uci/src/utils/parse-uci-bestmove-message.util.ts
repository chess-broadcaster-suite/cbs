import { UCIMessageType } from '#enums/uci.enums'
import { UCIBestmoveMessage, UCIInvalidMessageCallback } from '#types/uci.types'

/**
 * Parse bestmove message; assuming first word is 'bestmove'.
 * Ignore extraneous whitespace.
 *
 * @param raw uci line
 * @param invalidMessageCallback invoke when parsing non-compliant message
 * @returns UCIBestMoveMessage
 */
export function parseUCIBestmoveMessage(
	raw: string,
	invalidMessageCallback?: UCIInvalidMessageCallback,
): UCIBestmoveMessage | undefined {
	const bits = raw.trim().split(/\s+/)
	const bestmove = bits[1]
	const [ponder, ponderMove] = bits.slice(2, 4)
	if (
		bestmove === undefined ||
		(ponder !== undefined && (ponder !== 'ponder' || ponderMove === undefined))
	) {
		invalidMessageCallback?.(raw)

		if (bestmove !== undefined) {
			return {
				bestmove,
				raw,
				type: UCIMessageType.BEST_MOVE,
			}
		}

		return undefined
	}
	const message: UCIBestmoveMessage = {
		bestmove,
		ponder: ponder ? ponderMove : undefined,
		raw,
		type: UCIMessageType.BEST_MOVE,
	}

	return message
}
