import { ChessColour } from '#enums/chess-colour.enum'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { pieceToString } from '#variants/fischer/utils/piece-to-string.util'

describe(pieceToString, () => {
	it('converts piece to a fen string representation', () => {
		expect(
			pieceToString({
				type: ChessPieceType.KING,
				colour: ChessColour.WHITE,
			}),
		).toBe('K')
		expect(
			pieceToString({
				type: ChessPieceType.KING,
				colour: ChessColour.BLACK,
			}),
		).toBe('k')

		expect(
			pieceToString({
				type: ChessPieceType.QUEEN,
				colour: ChessColour.WHITE,
			}),
		).toBe('Q')
		expect(
			pieceToString({
				type: ChessPieceType.QUEEN,
				colour: ChessColour.BLACK,
			}),
		).toBe('q')

		expect(
			pieceToString({
				type: ChessPieceType.ROOK,
				colour: ChessColour.WHITE,
			}),
		).toBe('R')
		expect(
			pieceToString({
				type: ChessPieceType.ROOK,
				colour: ChessColour.BLACK,
			}),
		).toBe('r')

		expect(
			pieceToString({
				type: ChessPieceType.BISHOP,
				colour: ChessColour.WHITE,
			}),
		).toBe('B')
		expect(
			pieceToString({
				type: ChessPieceType.BISHOP,
				colour: ChessColour.BLACK,
			}),
		).toBe('b')

		expect(
			pieceToString({
				type: ChessPieceType.KNIGHT,
				colour: ChessColour.WHITE,
			}),
		).toBe('N')
		expect(
			pieceToString({
				type: ChessPieceType.KNIGHT,
				colour: ChessColour.BLACK,
			}),
		).toBe('n')

		expect(
			pieceToString({
				type: ChessPieceType.PAWN,
				colour: ChessColour.WHITE,
			}),
		).toBe('P')
		expect(
			pieceToString({
				type: ChessPieceType.PAWN,
				colour: ChessColour.BLACK,
			}),
		).toBe('p')
	})
})
