import type { ChessSquare } from '#enums/chess-square.enum'

import { parseFile } from '#utils/parse-file.util'
import { parseRank } from '#utils/parse-rank.util'
import { squareFromCoordinates } from '#utils/square-from-coordinates.util'

export function parseSquare(string: string): ChessSquare | null | undefined {
	const trimmed = string.trim()

	if (trimmed === '-') {
		return undefined
	}
	if (trimmed.length < 2) {
		return null
	}

	const file = parseFile(trimmed[0])
	const rank = parseRank(trimmed[1])

	if (file === null || rank === null) {
		return null
	}
	return squareFromCoordinates(file, rank)
}
