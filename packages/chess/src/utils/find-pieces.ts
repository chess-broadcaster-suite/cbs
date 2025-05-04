import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPiece } from '#interfaces/chess-piece.interface'

export function findPiece(
	piece: ChessPiece,
	pieces: Record<ChessSquare, ChessPiece | undefined>,
): ChessSquare[] {
	const result: ChessSquare[] = []

	for (let idx = ChessSquare.A1; idx <= ChessSquare.H8; idx++) {
		const anotherPiece = pieces[idx]
		if (anotherPiece?.colour === piece.colour && anotherPiece?.type === piece.type) {
			result.push(idx as ChessSquare)
		}
	}

	return result
}
