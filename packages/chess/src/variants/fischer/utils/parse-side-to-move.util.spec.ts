import { ChessColour } from '#enums/chess-colour.enum'
import { parseSideToMove } from '#variants/fischer/utils/parse-side-to-move.util'

describe(parseSideToMove, () => {
	it('returns chess colour from the first character of a subfen', () => {
		expect(parseSideToMove('w')).toBe(ChessColour.WHITE)
		expect(parseSideToMove('W')).toBe(ChessColour.WHITE)
		expect(parseSideToMove('b')).toBe(ChessColour.BLACK)
		expect(parseSideToMove('B')).toBe(ChessColour.BLACK)
	})

	it('trims whitespace', () => {
		expect(parseSideToMove('   \n\t\r  W   \r')).toBe(ChessColour.WHITE)
	})

	it('returns null on junk', () => {
		expect(parseSideToMove('xxx')).toBe(null)
		expect(parseSideToMove('1')).toBe(null)
		expect(parseSideToMove('')).toBe(null)
	})
})
