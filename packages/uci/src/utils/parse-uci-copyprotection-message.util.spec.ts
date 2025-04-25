import { UCICopyProtectionStatus, UCIMessageType } from '#enums/uci.enums'
import { parseUCICopyProtectionMessage } from '#utils/parse-uci-copyprotection-message.util'

test('checking status', () => {
	const input = 'copyprotection checking'

	expect(parseUCICopyProtectionMessage(input)).toEqual({
		raw: input,
		status: UCICopyProtectionStatus.CHECKING,
		type: UCIMessageType.COPY_PROTECTION,
	})
})

test('ok status', () => {
	const input = 'copyprotection ok'

	expect(parseUCICopyProtectionMessage(input)).toEqual({
		raw: input,
		status: UCICopyProtectionStatus.OK,
		type: UCIMessageType.COPY_PROTECTION,
	})
})

test('error status', () => {
	const input = 'copyprotection error'

	expect(parseUCICopyProtectionMessage(input)).toEqual({
		raw: input,
		status: UCICopyProtectionStatus.ERROR,
		type: UCIMessageType.COPY_PROTECTION,
	})
})

test('extraneous whitespace', () => {
	const input = '  \t\t\t    copyprotection  ok \n'

	expect(parseUCICopyProtectionMessage(input)).toEqual({
		raw: input,
		status: UCICopyProtectionStatus.OK,
		type: UCIMessageType.COPY_PROTECTION,
	})
})

test('invalid messages', () => {
	expect(parseUCICopyProtectionMessage('copyprotection')).toEqual(undefined)
	expect(parseUCICopyProtectionMessage('copyprotection success')).toEqual(undefined)
})
