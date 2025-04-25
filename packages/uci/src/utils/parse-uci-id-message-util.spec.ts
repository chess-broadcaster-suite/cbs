import { UCIIDType, UCIMessageType } from '#enums/uci.enums'
import { parseUCIIDMessage } from '#utils/parse-uci-id-message.util'

test('Stockfish', () => {
	expect(parseUCIIDMessage('id name Stockfish 17.1')).toEqual({
		id: UCIIDType.NAME,
		raw: 'id name Stockfish 17.1',
		type: UCIMessageType.ID,
		value: 'Stockfish 17.1',
	})

	expect(parseUCIIDMessage('id author the Stockfish developers (see AUTHORS file)')).toEqual({
		id: UCIIDType.AUTHOR,
		raw: 'id author the Stockfish developers (see AUTHORS file)',
		type: UCIMessageType.ID,
		value: 'the Stockfish developers (see AUTHORS file)',
	})
})

test('lc0', () => {
	expect(parseUCIIDMessage('id name Lc0 v0.31.2')).toEqual({
		id: UCIIDType.NAME,
		raw: 'id name Lc0 v0.31.2',
		type: UCIMessageType.ID,
		value: 'Lc0 v0.31.2',
	})

	expect(parseUCIIDMessage('id author The LCZero Authors.')).toEqual({
		id: UCIIDType.AUTHOR,
		raw: 'id author The LCZero Authors.',
		type: UCIMessageType.ID,
		value: 'The LCZero Authors.',
	})
})

test('invalid messages', () => {
	expect(parseUCIIDMessage('id the Stockfish developers')).toEqual(undefined)
	expect(parseUCIIDMessage('id version 1.20')).toEqual(undefined)
})
