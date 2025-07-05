import { ChessRank } from '#enums/chess-rank.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { rankFromSquare } from '#utils/rank-from-square.util'

test('some squares', () => {
	expect(rankFromSquare(ChessSquare.A1)).toBe(ChessRank.FIRST)
	expect(rankFromSquare(ChessSquare.B4)).toBe(ChessRank.FOURTH)
	expect(rankFromSquare(ChessSquare.E6)).toBe(ChessRank.SIXTH)
	expect(rankFromSquare(ChessSquare.F8)).toBe(ChessRank.EIGHTH)
	expect(rankFromSquare(ChessSquare.H8)).toBe(ChessRank.EIGHTH)
})
