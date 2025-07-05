import { ChessRank } from '#enums/chess-rank.enum'

export function rankToString(rank: ChessRank): string {
	switch (rank) {
		case ChessRank.FIRST:
			return '1'
		case ChessRank.SECOND:
			return '2'
		case ChessRank.THIRD:
			return '3'
		case ChessRank.FOURTH:
			return '4'
		case ChessRank.FIFTH:
			return '5'
		case ChessRank.SIXTH:
			return '6'
		case ChessRank.SEVENTH:
			return '7'
		default:
			return '8'
	}
}
