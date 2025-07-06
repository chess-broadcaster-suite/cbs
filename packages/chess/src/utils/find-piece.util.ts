import type { ChessPieceInterface } from '#interfaces/chess-piece.interface'

import { ChessSquare } from '#enums/chess-square.enum'

export function findPiece(
	piece: ChessPieceInterface,
	pieces: Partial<Record<ChessSquare, ChessPieceInterface | undefined>>,
): ChessSquare | undefined {
	for (let idx = ChessSquare.A1; idx <= ChessSquare.H8; idx++) {
		const anotherPiece = pieces[idx]
		if (anotherPiece?.colour === piece.colour && anotherPiece?.type === piece.type) {
			return idx as ChessSquare
		}
	}

	return undefined
}
