import { PositionUCIParams } from '#types/uci.types'

/**
 * Builds position UCI command
 *
 * @param params.fen position FEN; this or startpos is required
 * @param params.startpos true
 * @param params.moves UCI moves
 * @returns position UCI command
 */
export function buildPositionString(params: PositionUCIParams): string {
	let result = `position`
	if ((params as { fen: string }).fen !== undefined) {
		const { fen } = params as { fen: string }
		result += ` fen ${fen}`
	} else {
		result += ` startpos`
	}
	const { moves } = params
	if (moves !== undefined && moves.length !== 0) {
		result += ` moves`
		moves.forEach((move) => {
			result += ` ${move}`
		})
	}

	return result
}
