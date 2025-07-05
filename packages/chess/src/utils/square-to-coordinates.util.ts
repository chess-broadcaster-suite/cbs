import type { ChessFile } from '#enums/chess-file.enum'
import type { ChessRank } from '#enums/chess-rank.enum'
import type { ChessSquare } from '#enums/chess-square.enum'

import { fileFromSquare } from '#utils/file-from-square.util'
import { rankFromSquare } from '#utils/rank-from-square.util'

export function squareToCoordinates(square: ChessSquare): { file: ChessFile; rank: ChessRank } {
	const file = fileFromSquare(square)
	const rank = rankFromSquare(square)

	return { file, rank }
}
