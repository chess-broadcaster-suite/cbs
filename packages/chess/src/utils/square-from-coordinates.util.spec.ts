import { ChessFile } from '#enums/chess-file.enum'
import { ChessRank } from '#enums/chess-rank.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { squareFromCoordinates } from '#utils/square-from-coordinates.util'

describe(squareFromCoordinates, () => {
	it('converts file + rank to square', () => {
		expect(squareFromCoordinates(ChessFile.A, ChessRank.FIRST)).toBe(ChessSquare.A1)
		expect(squareFromCoordinates(ChessFile.C, ChessRank.SECOND)).toBe(ChessSquare.C2)
		expect(squareFromCoordinates(ChessFile.E, ChessRank.FIFTH)).toBe(ChessSquare.E5)
		expect(squareFromCoordinates(ChessFile.G, ChessRank.SIXTH)).toBe(ChessSquare.G6)
		expect(squareFromCoordinates(ChessFile.H, ChessRank.EIGHTH)).toBe(ChessSquare.H8)
	})
})
