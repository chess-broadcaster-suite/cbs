export enum UCIOptionType {
	BUTTON = 'button',
	CHECK = 'check',
	COMBO = 'combo',
	SPIN = 'spin',
	STRING = 'string',
}

export enum UCIIDType {
	AUTHOR = 'author',
	NAME = 'name',
}

export enum UCIMessageType {
	BEST_MOVE = 'bestmove',
	COPY_PROTECTION = 'copyprotection',
	ID = 'id',
	INFO = 'info',
	OPTION = 'option',
	READYOK = 'readyok',
	REGISTRATION = 'registration',
	UCIOK = 'uciok',
}

export enum UCICopyProtectionStatus {
	CHECKING = 'checking',
	ERROR = 'error',
	OK = 'ok',
}

export enum UCIRegistrationStatus {
	CHECKING = 'checking',
	ERROR = 'error',
	OK = 'ok',
}

export enum UCIInfoNumericToken {
	CPULOAD = 'cpuload',
	CURRMOVENUMBER = 'currmovenumber',
	DEPTH = 'depth',
	HASHFULL = 'hashfull',
	MULTIPV = 'multipv',
	NODES = 'nodes',
	NPS = 'nps',
	SBHITS = 'sbhits',
	SCORE = 'score',
	SELDEPTH = 'seldepth',
	TBHITS = 'tbhits',
	TIME = 'time',
}

export enum UCIInfoToken {
	CPULOAD = 'cpuload',
	CURRLINE = 'currline',
	CURRMOVE = 'currmove',
	CURRMOVENUMBER = 'currmovenumber',
	DEPTH = 'depth',
	HASHFULL = 'hashfull',
	MULTIPV = 'multipv',
	NODES = 'nodes',
	NPS = 'nps',
	PV = 'pv',
	REFUTATION = 'refutation',
	SBHITS = 'sbhits',
	SCORE = 'score',
	SELDEPTH = 'seldepth',
	STRING = 'string',
	TBHITS = 'tbhits',
	TIME = 'time',
}

export enum UCIOptionToken {
	DEFAULT = 'default',
	MAX = 'max',
	MIN = 'min',
	NAME = 'name',
	TYPE = 'type',
	VAR = 'var',
}

export enum UCIScoreToken {
	CP = 'cp',
	LOWERBOUND = 'lowerbound',
	MATE = 'mate',
	UPPERBOUND = 'upperbound',
}

export enum UCIEngineState {
	NOT_INITIALIZED = 'not_initialized',
	RUNNING = 'running',
	STOPPED = 'stopped',
}

export enum UCISearchType {
	FINITE = 'finite',
	INFINITE = 'infinite',
}
