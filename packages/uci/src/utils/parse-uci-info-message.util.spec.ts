import { UCIMessageType } from '#enums/uci.enums'
import { parseUCIInfoMessage } from '#utils/parse-uci-info-message.util'

test('string', () => {
	expect(parseUCIInfoMessage('info string Available processors: 0-9')).toEqual({
		raw: 'info string Available processors: 0-9',
		string: 'Available processors: 0-9',
		type: UCIMessageType.INFO,
	})

	expect(
		parseUCIInfoMessage(
			'info string NNUE evaluation using nn-1c0000000000.nnue (133MiB, (22528, 3072, 15, 32, 1))',
		),
	).toEqual({
		raw: 'info string NNUE evaluation using nn-1c0000000000.nnue (133MiB, (22528, 3072, 15, 32, 1))',
		string: 'NNUE evaluation using nn-1c0000000000.nnue (133MiB, (22528, 3072, 15, 32, 1))',
		type: UCIMessageType.INFO,
	})
})

test('move', () => {
	const input =
		'info depth 12 seldepth 19 multipv 1 score cp 33 nodes 34187 nps 432746 hashfull 12 tbhits 0 time 79 pv e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f3d4 g8f6 d4c6 d7c6 d1d8 e8d8 f1d3 f8b4 c2c3'

	expect(parseUCIInfoMessage(input)).toEqual({
		depth: 12,
		hashfull: 12,
		multipv: 1,
		nodes: 34187,
		nps: 432746,
		pv: [
			'e2e4',
			'e7e5',
			'g1f3',
			'b8c6',
			'd2d4',
			'e5d4',
			'f3d4',
			'g8f6',
			'd4c6',
			'd7c6',
			'd1d8',
			'e8d8',
			'f1d3',
			'f8b4',
			'c2c3',
		],
		raw: input,
		score: {
			cp: 33,
		},
		seldepth: 19,
		tbhits: 0,
		time: 79,
		type: UCIMessageType.INFO,
	})
})

test('invalid messages', () => {
	expect(parseUCIInfoMessage('info depth onetwothree')).toEqual({
		raw: 'info depth onetwothree',
		type: UCIMessageType.INFO,
	})
	expect(parseUCIInfoMessage('info score cp john')).toEqual({
		raw: 'info score cp john',
		type: UCIMessageType.INFO,
	})
	expect(parseUCIInfoMessage('info -2')).toEqual({
		raw: 'info -2',
		type: UCIMessageType.INFO,
	})
})
