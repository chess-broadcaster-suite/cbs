import type { ChessPiece } from '#variants/fischer/types/chess-piece.type'

import { ChessColour } from '#enums/chess-colour.enum'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'

export function parsePiece(subfen: string): ChessPiece | null {
	const trimmed = subfen.trim()

	switch (trimmed[0]) {
		case 'K':
			return {
				colour: ChessColour.WHITE,
				type: ChessPieceType.KING,
			}
		case 'Q':
			return {
				colour: ChessColour.WHITE,
				type: ChessPieceType.QUEEN,
			}
		case 'R':
			return {
				colour: ChessColour.WHITE,
				type: ChessPieceType.ROOK,
			}
		case 'B':
			return {
				colour: ChessColour.WHITE,
				type: ChessPieceType.BISHOP,
			}
		case 'N':
			return {
				colour: ChessColour.WHITE,
				type: ChessPieceType.KNIGHT,
			}
		case 'P':
			return {
				colour: ChessColour.WHITE,
				type: ChessPieceType.PAWN,
			}
		case 'k':
			return {
				colour: ChessColour.BLACK,
				type: ChessPieceType.KING,
			}
		case 'q':
			return {
				colour: ChessColour.BLACK,
				type: ChessPieceType.QUEEN,
			}
		case 'r':
			return {
				colour: ChessColour.BLACK,
				type: ChessPieceType.ROOK,
			}
		case 'b':
			return {
				colour: ChessColour.BLACK,
				type: ChessPieceType.BISHOP,
			}
		case 'n':
			return {
				colour: ChessColour.BLACK,
				type: ChessPieceType.KNIGHT,
			}
		case 'p':
			return {
				colour: ChessColour.BLACK,
				type: ChessPieceType.PAWN,
			}
		default:
			return null
	}
}
