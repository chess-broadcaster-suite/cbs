import { ChessColour } from '#enums/chess-colour.enum'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { parsePiece } from '#variants/fischer/utils/parse-piece.util'

describe(parsePiece, () => {
	it('converts string representation for a fischer random piece to a ChessPiece', () => {
		expect(parsePiece('K')).toMatchObject({
			type: ChessPieceType.KING,
			colour: ChessColour.WHITE,
		})
		expect(parsePiece('q')).toMatchObject({
			type: ChessPieceType.QUEEN,
			colour: ChessColour.BLACK,
		})
		expect(parsePiece('r')).toMatchObject({
			type: ChessPieceType.ROOK,
			colour: ChessColour.BLACK,
		})
		expect(parsePiece('N')).toMatchObject({
			type: ChessPieceType.KNIGHT,
			colour: ChessColour.WHITE,
		})
		expect(parsePiece('B')).toMatchObject({
			type: ChessPieceType.BISHOP,
			colour: ChessColour.WHITE,
		})
		expect(parsePiece('p')).toMatchObject({
			type: ChessPieceType.PAWN,
			colour: ChessColour.BLACK,
		})
	})

	it('trims whitespace', () => {
		expect(parsePiece('   \n\r \t K  ')).toMatchObject({
			type: ChessPieceType.KING,
			colour: ChessColour.WHITE,
		})
	})

	it('returns null on junk', () => {})
})
