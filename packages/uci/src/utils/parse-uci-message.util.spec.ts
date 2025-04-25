import {
	UCICopyProtectionStatus,
	UCIMessageType,
	UCIOptionType,
	UCIRegistrationStatus,
} from '#enums/uci.enums'
import { parseUCIMessage } from '#utils/parse-uci-message.util'

test('id', () => {
	expect(parseUCIMessage('id author The LCZero Authors.')).toEqual({
		id: 'author',
		raw: 'id author The LCZero Authors.',
		type: UCIMessageType.ID,
		value: 'The LCZero Authors.',
	})
})

test('uciok', () => {
	expect(parseUCIMessage('uciok')).toEqual({
		raw: 'uciok',
		type: UCIMessageType.UCIOK,
	})
})

test('readyok', () => {
	expect(parseUCIMessage('readyok')).toEqual({
		raw: 'readyok',
		type: UCIMessageType.READYOK,
	})
})

test('bestmove', () => {
	expect(parseUCIMessage('bestmove e2e4 ponder c7c6')).toEqual({
		bestmove: 'e2e4',
		ponder: 'c7c6',
		raw: 'bestmove e2e4 ponder c7c6',
		type: UCIMessageType.BEST_MOVE,
	})
})

test('copyprotection', () => {
	expect(parseUCIMessage('copyprotection ok')).toEqual({
		raw: 'copyprotection ok',
		status: UCICopyProtectionStatus.OK,
		type: UCIMessageType.COPY_PROTECTION,
	})
})

test('registration', () => {
	expect(parseUCIMessage('registration checking')).toEqual({
		raw: 'registration checking',
		status: UCIRegistrationStatus.CHECKING,
		type: UCIMessageType.REGISTRATION,
	})
})

test('info', () => {
	expect(
		parseUCIMessage(
			'info depth 1 seldepth 2 time 599 nodes 2 score cp 29 nps 7 tbhits 0 pv e2e4 c7c6',
		),
	).toEqual({
		depth: 1,
		nodes: 2,
		nps: 7,
		pv: ['e2e4', 'c7c6'],
		raw: 'info depth 1 seldepth 2 time 599 nodes 2 score cp 29 nps 7 tbhits 0 pv e2e4 c7c6',
		score: {
			cp: 29,
		},
		seldepth: 2,
		tbhits: 0,
		time: 599,
		type: UCIMessageType.INFO,
	})
})

test('option', () => {
	expect(parseUCIMessage('option name SearchSpinBackoff type check default false')).toEqual({
		default: false,
		name: 'SearchSpinBackoff',
		optionType: UCIOptionType.CHECK,
		raw: 'option name SearchSpinBackoff type check default false',
		type: UCIMessageType.OPTION,
	})
})

test('invalid messages', () => {
	expect(parseUCIMessage('option SearchSpinBackoff type check default 1234')).toEqual(undefined)
})
