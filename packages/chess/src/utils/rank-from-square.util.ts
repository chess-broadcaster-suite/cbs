import type { ChessRank } from '#enums/chess-rank.enum'
import type { ChessSquare } from '#enums/chess-square.enum'

export function rankFromSquare(square: ChessSquare): ChessRank {
	return Math.floor(square / 8) as ChessRank
}
