import {
	GoUCIParams,
	PositionUCIParams,
	RegisterUCIParams,
	SetDebugUCIParams,
	SetOptionUCIParams,
	UCIBestmoveMessage,
	UCIOKMessage,
	UCIReadyokMessage,
} from '#types/uci.types'

export interface UCIInterface {
	debug(params: SetDebugUCIParams): void
	go(params: GoUCIParams): void
	isready(): Promise<UCIReadyokMessage>
	ponderhit(): void
	position(params: PositionUCIParams): void
	quit(): void
	register(params: RegisterUCIParams): void
	setoption(params: SetOptionUCIParams): void
	stop(): Promise<UCIBestmoveMessage | void>
	uci(): Promise<UCIOKMessage>
	ucinewgame(): void
}
