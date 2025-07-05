import { ChessFile } from '#enums/chess-file.enum'
import { ChessRank } from '#enums/chess-rank.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { squareToCoordinates } from '#utils/square-to-coordinates.util'

test('some squares', () => {
	expect(squareToCoordinates(ChessSquare.A1)).toMatchObject({
		file: ChessFile.A,
		rank: ChessRank.FIRST,
	})
	expect(squareToCoordinates(ChessSquare.E5)).toMatchObject({
		file: ChessFile.E,
		rank: ChessRank.FIFTH,
	})
	expect(squareToCoordinates(ChessSquare.H8)).toMatchObject({
		file: ChessFile.H,
		rank: ChessRank.EIGHTH,
	})
})
