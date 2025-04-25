import {
	UCICopyProtectionStatus,
	UCIMessageType,
	UCIOptionType,
	UCIRegistrationStatus,
} from '#enums/uci.enums'

export type RawUCIMessage = string

export type SetDebugUCIParams = {
	turnOn: boolean
}

export type SetOptionUCIParams = {
	name: string
	value: string
}

export type RegisterUCIParams =
	| {
			later: true
	  }
	| Partial<{
			code: string
			name: string
	  }>

export type PositionUCIParams = ({ fen: string } | { startpos: true }) & {
	moves?: string[]
}

export type GoUCIParams = Partial<{
	depth: number
	infinite: true
	movetime: number
	nodes: number
}> &
	GoUCIStateParams

export type GoUCIStateParams = Partial<{
	binc: number
	btime: number
	mate: number
	movestogo: number
	ponder: true
	searchmoves: string[]
	winc: number
	wtime: number
}>

export type UCIMessage = {
	raw: string
	type: UCIMessageType
}

export type AnyUCIMessage =
	| UCIIDMessage
	| UCIOKMessage
	| UCIReadyokMessage
	| UCIBestmoveMessage
	| UCICopyprotectionMessage
	| UCIRegistrationMessage
	| UCIInfoMessage
	| UCIOptionMessage

export type UCIIDMessage = UCIMessage & {
	id: string
	type: UCIMessageType.ID
	value: string
}

export type UCIOKMessage = UCIMessage & {
	type: UCIMessageType.UCIOK
}

export type UCIReadyokMessage = UCIMessage & {
	type: UCIMessageType.READYOK
}

export type UCIBestmoveMessage = UCIMessage & {
	bestmove: string
	ponder?: string
	type: UCIMessageType.BEST_MOVE
}

export type UCICopyprotectionMessage = UCIMessage & {
	status: UCICopyProtectionStatus
	type: UCIMessageType.COPY_PROTECTION
}

export type UCIRegistrationMessage = UCIMessage & {
	status: UCIRegistrationStatus
	type: UCIMessageType.REGISTRATION
}

export type UCIInfoMessage = UCIMessage &
	Partial<{
		cpuload: number
		currline: UCICurrline
		currmove: string
		currmovenumber: number
		depth: number
		hashfull: number
		multipv: number
		nodes: number
		nps: number
		pv: string[]
		refutation: UCIRefutation
		sbhits: number
		score: UCIScore
		seldepth: number
		string: string
		tbhits: number
		time: number
	}> & { type: UCIMessageType.INFO }

export type UCIOptionMessage = UCIMessage & {
	default?: string | number | boolean
	max?: number
	min?: number
	name: string
	optionType: UCIOptionType
	type: UCIMessageType.OPTION
	vars?: Array<string | number>
}

export type UCIScore = Partial<{
	cp: number
	lowerbound: true
	mate: number
	upperbound: true
}>

export type UCIRefutation = {
	move: string
	moves: string[]
}

export type UCICurrline = {
	cpunr?: number
	moves: string[]
}

export type UCIDataCallback = (messages: UCIMessage[]) => Promise<unknown>
export type UCIErrorCallback = (data: Buffer | string) => Promise<unknown>
export type UCIInvalidMessageCallback = (message: RawUCIMessage) => Promise<unknown>

export type UCIEngineParams = {
	dataCallback: UCIDataCallback
	errorCallback?: UCIErrorCallback
	invalidMessageCallback?: UCIInvalidMessageCallback
	isreadyTimeout?: number
	path: string
	stopTimeout?: number
	uciokTimeout?: number
}
