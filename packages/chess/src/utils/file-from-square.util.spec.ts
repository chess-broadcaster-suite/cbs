import { ChessFile } from '#enums/chess-file.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { fileFromSquare } from '#utils/file-from-square.util'

describe(fileFromSquare, () => {
	it('extracts chess file from a chess square', () => {
		expect(fileFromSquare(ChessSquare.A1)).toBe(ChessFile.A)
		expect(fileFromSquare(ChessSquare.B7)).toBe(ChessFile.B)
		expect(fileFromSquare(ChessSquare.C5)).toBe(ChessFile.C)
		expect(fileFromSquare(ChessSquare.F8)).toBe(ChessFile.F)
		expect(fileFromSquare(ChessSquare.H8)).toBe(ChessFile.H)
	})
})
