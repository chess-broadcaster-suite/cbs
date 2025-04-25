import { INVALID_SCORE } from '#structs/messages'
import { parseUCIScore } from '#utils/parse-uci-score.util'

test('cp', () => {
	expect(parseUCIScore('cp -456')).toEqual({
		cp: -456,
	})
})

test('mate', () => {
	expect(parseUCIScore('mate 10')).toEqual({
		mate: 10,
	})
})

test('lowerbound', () => {
	expect(parseUCIScore('cp 10 lowerbound')).toEqual({
		cp: 10,
		lowerbound: true,
	})
})

test('upperbound', () => {
	expect(parseUCIScore('mate -4 upperbound')).toEqual({
		mate: -4,
		upperbound: true,
	})
})

test('invalid messages', () => {
	expect(() => parseUCIScore('mate apples')).toThrow(INVALID_SCORE)
	expect(() => parseUCIScore('cp oranges')).toThrow(INVALID_SCORE)
})
