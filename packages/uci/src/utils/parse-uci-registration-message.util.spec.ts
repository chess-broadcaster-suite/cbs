import { UCIMessageType, UCIRegistrationStatus } from '#enums/uci.enums'
import { parseUCIRegistrationMessage } from '#utils/parse-uci-registration-message.util'

test('checking status', () => {
	const input = 'registration checking'

	expect(parseUCIRegistrationMessage(input)).toEqual({
		raw: input,
		status: UCIRegistrationStatus.CHECKING,
		type: UCIMessageType.REGISTRATION,
	})
})

test('ok status', () => {
	const input = 'registration ok'

	expect(parseUCIRegistrationMessage(input)).toEqual({
		raw: input,
		status: UCIRegistrationStatus.OK,
		type: UCIMessageType.REGISTRATION,
	})
})

test('error status', () => {
	const input = 'registration error'

	expect(parseUCIRegistrationMessage(input)).toEqual({
		raw: input,
		status: UCIRegistrationStatus.ERROR,
		type: UCIMessageType.REGISTRATION,
	})
})

test('extraneous whitespace', () => {
	const input = '  \t\t\t    registration  ok \n'

	expect(parseUCIRegistrationMessage(input)).toEqual({
		raw: input,
		status: UCIRegistrationStatus.OK,
		type: UCIMessageType.REGISTRATION,
	})
})

test('invalid messages', () => {
	expect(parseUCIRegistrationMessage('registration')).toEqual(undefined)
	expect(parseUCIRegistrationMessage('registration success')).toEqual(undefined)
})
