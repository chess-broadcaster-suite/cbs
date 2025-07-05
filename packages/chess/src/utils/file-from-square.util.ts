import type { ChessFile } from '#enums/chess-file.enum'
import type { ChessSquare } from '#enums/chess-square.enum'

export function fileFromSquare(square: ChessSquare): ChessFile {
	return (square % 8) as ChessFile
}
