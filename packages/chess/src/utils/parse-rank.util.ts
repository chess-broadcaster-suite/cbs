import { ChessRank } from '#enums/chess-rank.enum'

export function parseRank(string: string): ChessRank | null {
	if (string.length < 1) {
		return null
	}

	switch (string[0]) {
		case '1':
			return ChessRank.FIRST
		case '2':
			return ChessRank.SECOND
		case '3':
			return ChessRank.THIRD
		case '4':
			return ChessRank.FOURTH
		case '5':
			return ChessRank.FIFTH
		case '6':
			return ChessRank.SIXTH
		case '7':
			return ChessRank.SEVENTH
		case '8':
			return ChessRank.EIGHTH
		default:
			return null
	}
}
