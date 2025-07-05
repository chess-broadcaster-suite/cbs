import { ChessRank } from '#enums/chess-rank.enum'
import { rankToString } from '#utils/rank-to-string.util'

test('all ranks', () => {
	expect(rankToString(ChessRank.FIRST)).toBe('1')
	expect(rankToString(ChessRank.SECOND)).toBe('2')
	expect(rankToString(ChessRank.THIRD)).toBe('3')
	expect(rankToString(ChessRank.FOURTH)).toBe('4')
	expect(rankToString(ChessRank.FIFTH)).toBe('5')
	expect(rankToString(ChessRank.SIXTH)).toBe('6')
	expect(rankToString(ChessRank.SEVENTH)).toBe('7')
	expect(rankToString(ChessRank.EIGHTH)).toBe('8')
})
