import type { ChessSquare } from '#enums/chess-square.enum'

import { parseFile } from '#utils/parse-file.util'
import { parseRank } from '#utils/parse-rank.util'
import { squareFromCoordinates } from '#utils/square-from-coordinates.util'

export function parseSquare(string: string): ChessSquare | null | undefined {
	if (string === '-') {
		return undefined
	}
	if (string.length < 2) {
		return null
	}

	const file = parseFile(string[0])
	const rank = parseRank(string[1])

	if (file === null || rank === null) {
		return null
	}
	return squareFromCoordinates(file, rank)
}
