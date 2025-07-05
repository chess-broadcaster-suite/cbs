import type { ChessFile } from '#enums/chess-file.enum'
import type { ChessRank } from '#enums/chess-rank.enum'
import type { ChessSquare } from '#enums/chess-square.enum'

export function squareFromCoordinates(file: ChessFile, rank: ChessRank): ChessSquare {
	return (rank * 8 + file) as ChessSquare
}
