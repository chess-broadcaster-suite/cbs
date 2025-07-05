import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { parseCastling } from '#variants/fischer/utils/parse-castling.util'

describe(parseCastling, () => {
	it('parses castling from a subfen string', () => {
		expect(parseCastling('KQkq')).toMatchObject({
			whiteK: ChessSquare.H1,
			whiteQ: ChessSquare.A1,
			blackK: ChessSquare.H8,
			blackQ: ChessSquare.A8,
		})
		expect(parseCastling('Kq')).toMatchObject({
			whiteK: ChessSquare.H1,
			blackQ: ChessSquare.A8,
		})
	})

	it('handles fischer chess castling subfens properly', () => {
		expect(parseCastling('HAha')).toMatchObject({
			whiteK: ChessSquare.H1,
			whiteQ: ChessSquare.A1,
			blackK: ChessSquare.H8,
			blackQ: ChessSquare.A8,
		})
		expect(parseCastling('FBfb')).toMatchObject({
			whiteK: ChessSquare.F1,
			whiteQ: ChessSquare.B1,
			blackK: ChessSquare.F8,
			blackQ: ChessSquare.B8,
		})
	})

	it('returns an empty object on no matches', () => {
		expect(parseCastling('-')).toMatchObject({})
		expect(parseCastling('bla bla')).toMatchObject({})
		expect(parseCastling('')).toMatchObject({})
	})

	it('can sometimes do without piece context in fischer random', () => {
		expect(parseCastling('A')).toMatchObject({
			whiteQ: ChessSquare.A1,
		})
		expect(parseCastling('g')).toMatchObject({
			blackK: ChessSquare.G8,
		})
	})

	it('mostly needs pieces to figure out additional context in fischer random', () => {
		expect(() => {
			parseCastling('Ee')
		}).toThrow()
		expect(
			parseCastling('Ee', {
				'3': {
					type: ChessPieceType.KING,
					colour: ChessColour.WHITE,
				},
				'59': {
					type: ChessPieceType.KING,
					colour: ChessColour.BLACK,
				},
			}),
		).toMatchObject({
			whiteK: ChessSquare.E1,
			blackK: ChessSquare.E8,
		})
		expect(
			parseCastling('Ee', {
				'6': {
					type: ChessPieceType.KING,
					colour: ChessColour.WHITE,
				},
				'62': {
					type: ChessPieceType.KING,
					colour: ChessColour.BLACK,
				},
			}),
		).toMatchObject({
			whiteQ: ChessSquare.E1,
			blackQ: ChessSquare.E8,
		})
	})
})
