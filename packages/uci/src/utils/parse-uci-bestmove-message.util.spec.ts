import { UCIMessageType } from '#enums/uci.enums'
import { parseUCIBestmoveMessage } from '#utils/parse-uci-bestmove-message.util'

test('best move', () => {
	const input = 'bestmove e2e4'

	expect(parseUCIBestmoveMessage(input)).toEqual({
		bestmove: 'e2e4',
		ponder: undefined,
		raw: input,
		type: UCIMessageType.BEST_MOVE,
	})
})

test('best move with ponder', () => {
	const input = 'bestmove g8f6 ponder d2d4'

	expect(parseUCIBestmoveMessage(input)).toEqual({
		bestmove: 'g8f6',
		ponder: 'd2d4',
		raw: input,
		type: UCIMessageType.BEST_MOVE,
	})
})

test('extraneous whitespace', () => {
	const input = '   \n\r\t bestmove e2e4      \t ponder c7c5'

	expect(parseUCIBestmoveMessage(input)).toEqual({
		bestmove: 'e2e4',
		ponder: 'c7c5',
		raw: input,
		type: UCIMessageType.BEST_MOVE,
	})
})

test('invalid message', () => {
	expect(parseUCIBestmoveMessage('   \n\r\t bestmove e2e4      \t ponder')).toEqual({
		bestmove: 'e2e4',
		raw: '   \n\r\t bestmove e2e4      \t ponder',
		type: UCIMessageType.BEST_MOVE,
	})
})
