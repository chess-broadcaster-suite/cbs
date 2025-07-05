import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPieceInterface } from '#interfaces/chess-piece.interface'

export function findPieces(
	piece: ChessPieceInterface,
	pieces: Record<ChessSquare, ChessPieceInterface | undefined>,
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
