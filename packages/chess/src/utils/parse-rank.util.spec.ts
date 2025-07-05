import { ChessRank } from '#enums/chess-rank.enum'
import { parseRank } from '#utils/parse-rank.util'

describe(parseRank, () => {
	it('parses string numbers to ranks', () => {
		expect(parseRank('1')).toBe(ChessRank.FIRST)
		expect(parseRank('2')).toBe(ChessRank.SECOND)
		expect(parseRank('3')).toBe(ChessRank.THIRD)
		expect(parseRank('4')).toBe(ChessRank.FOURTH)
		expect(parseRank('5')).toBe(ChessRank.FIFTH)
		expect(parseRank('6')).toBe(ChessRank.SIXTH)
		expect(parseRank('7')).toBe(ChessRank.SEVENTH)
		expect(parseRank('8')).toBe(ChessRank.EIGHTH)
	})

	it('trims whitespace', () => {
		expect(parseRank('   1')).toBe(ChessRank.FIRST)
		expect(parseRank('\t   2 \n\n')).toBe(ChessRank.SECOND)
	})

	it('returns null on invalid strings', () => {
		expect(parseRank('9')).toBe(null)
		expect(parseRank('.')).toBe(null)
		expect(parseRank('wqA')).toBe(null)
		expect(parseRank('a2')).toBe(null)
		expect(parseRank('')).toBe(null)
	})
})
