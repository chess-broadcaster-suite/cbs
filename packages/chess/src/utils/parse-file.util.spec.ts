import { ChessFile } from '#enums/chess-file.enum'
import { parseFile } from '#utils/parse-file.util'

describe(parseFile, () => {
	it('parses valid file strings to chess files', () => {
		expect(parseFile('a')).toBe(ChessFile.A)
		expect(parseFile('b')).toBe(ChessFile.B)
		expect(parseFile('C')).toBe(ChessFile.C)
		expect(parseFile('d')).toBe(ChessFile.D)
		expect(parseFile('E')).toBe(ChessFile.E)
		expect(parseFile('F')).toBe(ChessFile.F)
		expect(parseFile('g')).toBe(ChessFile.G)
		expect(parseFile('H')).toBe(ChessFile.H)
	})
})

it('trims whitespace', () => {
	expect(parseFile('   A')).toBe(ChessFile.A)
	expect(parseFile('\t   B \n\n')).toBe(ChessFile.B)
})

it('returns null on invalid strings', () => {
	expect(parseFile('x')).toBe(null)
	expect(parseFile('wqA')).toBe(null)
	expect(parseFile('2')).toBe(null)
	expect(parseFile('')).toBe(null)
})
