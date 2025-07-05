import type { ChessPieceInterface } from '#interfaces/chess-piece.interface'

import { ChessSquare } from '#enums/chess-square.enum'

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
