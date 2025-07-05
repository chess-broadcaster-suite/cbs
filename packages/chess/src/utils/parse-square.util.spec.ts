import { ChessSquare } from '#enums/chess-square.enum'
import { parseSquare } from '#utils/parse-square.util'

test('valid strings', () => {
	expect(parseSquare('a1')).toBe(ChessSquare.A1)
	expect(parseSquare('C8')).toBe(ChessSquare.C8)
	expect(parseSquare('g3')).toBe(ChessSquare.G3)
})

test('invalid strings', () => {
	expect(parseSquare('xxx')).toBe(null)
	expect(parseSquare('')).toBe(null)
	expect(parseSquare('a 12')).toBe(null)
	expect(parseSquare('a9')).toBe(null)
	expect(parseSquare('99')).toBe(null)
})

test('weird stuff', () => {
	expect(parseSquare('  a3.  ')).toBe(ChessSquare.A3)
	expect(parseSquare('\n\n \n\n b4 ')).toBe(ChessSquare.B4)
})
