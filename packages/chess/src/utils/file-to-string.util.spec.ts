import { ChessFile } from '#enums/chess-file.enum'
import { fileToString } from '#utils/file-to-string.util'

describe(fileToString, () => {
	it('stringifies chess file', () => {
		expect(fileToString(ChessFile.A)).toBe('a')
		expect(fileToString(ChessFile.B)).toBe('b')
		expect(fileToString(ChessFile.C)).toBe('c')
		expect(fileToString(ChessFile.D)).toBe('d')
		expect(fileToString(ChessFile.E)).toBe('e')
		expect(fileToString(ChessFile.F)).toBe('f')
		expect(fileToString(ChessFile.G)).toBe('g')
		expect(fileToString(ChessFile.H)).toBe('h')
	})
})
