import type { Castling } from '#variants/default/types/castling.type'

import { ChessSquare } from '#enums/chess-square.enum'

export function parseCastling(subfen: string): Castling | null {
	const result: Castling = {}
	if (subfen === '-') {
		return result
	}

	for (const ch of subfen) {
		switch (ch) {
			case 'K':
				result.whiteK = ChessSquare.H1
				continue
			case 'Q':
				result.whiteQ = ChessSquare.A1
				continue

			case 'A':
				result.whiteQ = ChessSquare.A1
				continue
			case 'B':
				result.whiteQ = ChessSquare.B1
				continue
			case 'C':
				if (result.whiteK !== undefined) {
					result.whiteK = ChessSquare.C1
				} else {
					result.whiteQ = ChessSquare.C1
				}
				continue
			case 'D':
				if (result.whiteK !== undefined) {
					result.whiteK = ChessSquare.D1
				} else {
					result.whiteQ = ChessSquare.D1
				}
				continue
			case 'E':
				if (result.whiteK !== undefined) {
					result.whiteK = ChessSquare.E1
				} else {
					result.whiteQ = ChessSquare.E1
				}
				continue
			case 'F':
				if (result.whiteK !== undefined) {
					result.whiteK = ChessSquare.F1
				} else {
					result.whiteQ = ChessSquare.F1
				}
				continue
			case 'G':
				result.whiteK = ChessSquare.G1
				continue
			case 'H':
				result.whiteK = ChessSquare.H1
				continue

			case 'k':
				result.blackK = ChessSquare.H8
				continue
			case 'q':
				result.blackQ = ChessSquare.A8
				continue

			case 'a':
				result.blackQ = ChessSquare.A8
				continue
			case 'b':
				result.blackQ = ChessSquare.B8
				continue
			case 'c':
				if (result.whiteK !== undefined) {
					result.blackK = ChessSquare.C8
				} else {
					result.blackQ = ChessSquare.C8
				}
				continue
			case 'd':
				if (result.whiteK !== undefined) {
					result.blackK = ChessSquare.D8
				} else {
					result.blackQ = ChessSquare.D8
				}
				continue
			case 'e':
				if (result.whiteK !== undefined) {
					result.blackK = ChessSquare.E8
				} else {
					result.blackQ = ChessSquare.E8
				}
				continue
			case 'f':
				if (result.whiteK !== undefined) {
					result.blackK = ChessSquare.F8
				} else {
					result.blackQ = ChessSquare.F8
				}
				continue
			case 'g':
				result.blackK = ChessSquare.G8
				continue
			case 'h':
				result.blackK = ChessSquare.H8
				continue

			default:
				continue
		}
	}

	return result
}
