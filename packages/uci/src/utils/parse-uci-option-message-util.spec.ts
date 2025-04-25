import { UCIMessageType, UCIOptionType } from '#enums/uci.enums'
import { parseUCIOptionMessage } from '#utils/parse-uci-option-message.util'

test('check', () => {
	expect(parseUCIOptionMessage('option name Ponder type check default false')).toEqual({
		default: false,
		max: undefined,
		min: undefined,
		name: 'Ponder',
		optionType: UCIOptionType.CHECK,
		raw: 'option name Ponder type check default false',
		type: UCIMessageType.OPTION,
		vars: undefined,
	})

	expect(parseUCIOptionMessage('option name Syzygy50MoveRule type check default true')).toEqual({
		default: true,
		max: undefined,
		min: undefined,
		name: 'Syzygy50MoveRule',
		optionType: UCIOptionType.CHECK,
		raw: 'option name Syzygy50MoveRule type check default true',
		type: UCIMessageType.OPTION,
		vars: undefined,
	})
})

test('spin', () => {
	expect(
		parseUCIOptionMessage('option name Move Overhead type spin default 10 min 0 max 5000'),
	).toEqual({
		default: 10,
		max: 5000,
		min: 0,
		name: 'Move Overhead',
		optionType: UCIOptionType.SPIN,
		raw: 'option name Move Overhead type spin default 10 min 0 max 5000',
		type: UCIMessageType.OPTION,
		vars: undefined,
	})

	expect(parseUCIOptionMessage('option name MultiPV type spin default 1 min 1 max 256')).toEqual({
		default: 1,
		max: 256,
		min: 1,
		name: 'MultiPV',
		optionType: UCIOptionType.SPIN,
		raw: 'option name MultiPV type spin default 1 min 1 max 256',
		type: UCIMessageType.OPTION,
		vars: undefined,
	})
})

test('combo', () => {
	expect(
		parseUCIOptionMessage(
			'option name ScoreType type combo default WDL_mu var centipawn var centipawn_with_drawscore var centipawn_2019 var centipawn_2018 var win_percentage var Q var W-L var WDL_mu',
		),
	).toEqual({
		default: 'WDL_mu',
		max: undefined,
		min: undefined,
		name: 'ScoreType',
		optionType: UCIOptionType.COMBO,
		raw: 'option name ScoreType type combo default WDL_mu var centipawn var centipawn_with_drawscore var centipawn_2019 var centipawn_2018 var win_percentage var Q var W-L var WDL_mu',
		type: UCIMessageType.OPTION,
		vars: [
			'centipawn',
			'centipawn_with_drawscore',
			'centipawn_2019',
			'centipawn_2018',
			'win_percentage',
			'Q',
			'W-L',
			'WDL_mu',
		],
	})
})

test('button', () => {
	expect(parseUCIOptionMessage('option name Clear Hash type button')).toEqual({
		default: undefined,
		max: undefined,
		min: undefined,
		name: 'Clear Hash',
		optionType: UCIOptionType.BUTTON,
		raw: 'option name Clear Hash type button',
		type: UCIMessageType.OPTION,
		vars: undefined,
	})
})

test('string', () => {
	expect(parseUCIOptionMessage('option name Debug Log File type string default <empty>')).toEqual({
		default: '',
		max: undefined,
		min: undefined,
		name: 'Debug Log File',
		optionType: UCIOptionType.STRING,
		raw: 'option name Debug Log File type string default <empty>',
		type: UCIMessageType.OPTION,
		vars: undefined,
	})
})

test('default', () => {
	expect(
		parseUCIOptionMessage('option name EvalFile type string default nn-1c0000000000.nnue'),
	).toEqual({
		default: 'nn-1c0000000000.nnue',
		max: undefined,
		min: undefined,
		name: 'EvalFile',
		optionType: UCIOptionType.STRING,
		raw: 'option name EvalFile type string default nn-1c0000000000.nnue',
		type: UCIMessageType.OPTION,
		vars: undefined,
	})

	expect(
		parseUCIOptionMessage('option name WeightsFile type string default <autodiscover>'),
	).toEqual({
		default: '<autodiscover>',
		max: undefined,
		min: undefined,
		name: 'WeightsFile',
		optionType: UCIOptionType.STRING,
		raw: 'option name WeightsFile type string default <autodiscover>',
		type: UCIMessageType.OPTION,
		vars: undefined,
	})
})

test('min max', () => {
	expect(parseUCIOptionMessage('option name Hash type spin default 16 min 1 max 33554432')).toEqual(
		{
			default: 16,
			max: 33554432,
			min: 1,
			name: 'Hash',
			optionType: UCIOptionType.SPIN,
			raw: 'option name Hash type spin default 16 min 1 max 33554432',
			type: UCIMessageType.OPTION,
			vars: undefined,
		},
	)
})

test('vars', () => {
	expect(
		parseUCIOptionMessage(
			'option name Backend type combo default blas var blas var eigen var trivial var random var check var recordreplay var roundrobin var multiplexing var demux',
		),
	).toEqual({
		default: 'blas',
		max: undefined,
		min: undefined,
		name: 'Backend',
		optionType: UCIOptionType.COMBO,
		raw: 'option name Backend type combo default blas var blas var eigen var trivial var random var check var recordreplay var roundrobin var multiplexing var demux',
		type: UCIMessageType.OPTION,
		vars: [
			'blas',
			'eigen',
			'trivial',
			'random',
			'check',
			'recordreplay',
			'roundrobin',
			'multiplexing',
			'demux',
		],
	})
})

test('invalid messages', () => {
	expect(parseUCIOptionMessage('option type spin default 16 min 1 max 33554432')).toEqual(undefined)
	expect(parseUCIOptionMessage('option name MultiPV type spin default none min 1 max 256')).toEqual(
		{
			default: undefined,
			max: 256,
			min: 1,
			name: 'MultiPV',
			optionType: UCIOptionType.SPIN,
			raw: 'option name MultiPV type spin default none min 1 max 256',
			type: UCIMessageType.OPTION,
		},
	)
})
