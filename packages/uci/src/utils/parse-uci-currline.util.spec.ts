import { parseUCICurrline } from '#utils/parse-uci-currline.util'

test('cpunr', () => {
	expect(parseUCICurrline('1 e2e4 c7c5 g1f3')).toEqual({
		cpunr: 1,
		moves: ['e2e4', 'c7c5', 'g1f3'],
	})
})

test('no cpunr', () => {
	expect(parseUCICurrline('d2d4 d7d5 g1f3 g8f6')).toEqual({
		cpunr: undefined,
		moves: ['d2d4', 'd7d5', 'g1f3', 'g8f6'],
	})
})
