import { ChessSquare } from '#enums/chess-square.enum'
import { castlingToString } from '#variants/fischer/utils/castling-to-string.util'

describe(castlingToString, () => {
	it('stringifies fischer castling into a subfen', () => {
		expect(
			castlingToString({
				whiteK: ChessSquare.H1,
				whiteQ: ChessSquare.A1,
				blackK: ChessSquare.H8,
				blackQ: ChessSquare.A8,
			}),
		).toBe('HAha')
		expect(
			castlingToString({
				whiteK: ChessSquare.C1,
				blackK: ChessSquare.C8,
				blackQ: ChessSquare.A8,
			}),
		).toBe('Cca')
		expect(castlingToString({})).toBe('-')
	})
})
