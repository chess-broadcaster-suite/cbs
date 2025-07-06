import { ChessSquare } from '#enums/chess-square.enum'
import { squareToString } from '#utils/square-to-string.util'

describe(squareToString, () => {
	it('stringifies chess squares', () => {
		expect(squareToString(ChessSquare.A1)).toBe('a1')
		expect(squareToString(ChessSquare.F7)).toBe('f7')
		expect(squareToString(ChessSquare.H8)).toBe('h8')
	})
})
