import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPiece } from '#interfaces/chess-piece.interface'

export function findPiece(
	piece: ChessPiece,
	pieces: Record<ChessSquare, ChessPiece | undefined>,
): ChessSquare | undefined {
	for (let idx = ChessSquare.A1; idx <= ChessSquare.H8; idx++) {
		const anotherPiece = pieces[idx]
		if (anotherPiece?.colour === piece.colour && anotherPiece?.type === piece.type) {
			return idx as ChessSquare
		}

		return undefined
	}
}
