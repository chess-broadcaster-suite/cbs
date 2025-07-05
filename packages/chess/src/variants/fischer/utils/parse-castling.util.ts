import type { Castling } from '#variants/fischer/types/castling.type'
import type { ChessPiece } from '#variants/fischer/types/chess-piece.type'

import { ChessError } from '#classes/chess-error.class'
import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { findPiece } from '#utils/find-piece.util'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'

/**
 *
 * @param subfen
 * @param pieces optional piece placement, necessary for proper fischer random parsing
 * @returns successfully parsed castling object
 *
 * @throws {ChessError} if missing pieces context when it's needed for fischer parsing
 */
export function parseCastling(
	subfen: string,
	pieces?: Partial<Record<ChessSquare, ChessPiece | undefined>>,
): Castling {
	const trimmed = subfen
	const result: Castling = {}
	if (trimmed === '-') {
		return result
	}

	for (const ch of trimmed) {
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
				if (result.whiteK === undefined) {
					result.whiteK = ChessSquare.C1
				} else {
					result.whiteQ = ChessSquare.C1
				}
				continue
			case 'D':
				if (result.whiteK === undefined) {
					result.whiteK = ChessSquare.D1
				} else {
					result.whiteQ = ChessSquare.D1
				}
				continue
			case 'E':
				if (result.whiteK === undefined) {
					result.whiteK = ChessSquare.E1
				} else {
					result.whiteQ = ChessSquare.E1
				}
				continue
			case 'F':
				if (result.whiteK === undefined) {
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
				if (result.blackK === undefined) {
					result.blackK = ChessSquare.C8
				} else {
					result.blackQ = ChessSquare.C8
				}
				continue
			case 'd':
				if (result.blackK === undefined) {
					result.blackK = ChessSquare.D8
				} else {
					result.blackQ = ChessSquare.D8
				}
				continue
			case 'e':
				if (result.blackK === undefined) {
					result.blackK = ChessSquare.E8
				} else {
					result.blackQ = ChessSquare.E8
				}
				continue
			case 'f':
				if (result.blackK === undefined) {
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

	if (
		result.whiteK === undefined &&
		result.whiteQ === undefined &&
		result.blackK === undefined &&
		result.blackQ === undefined
	) {
		return result
	}
	if (
		result.whiteK !== undefined &&
		result.whiteQ !== undefined &&
		result.blackK !== undefined &&
		result.blackQ !== undefined
	) {
		return result
	}

	// in fischer chess, subfen might be ambiguous without piece placement
	let isKQkqSubfen = true
	for (const char of subfen) {
		if ('KQkq'.indexOf(char) === -1) isKQkqSubfen = false
	}
	if (isKQkqSubfen) return result

	if (result.whiteK === ChessSquare.H1 || result.whiteK === ChessSquare.G1) return result
	if (result.whiteQ === ChessSquare.A1 || result.whiteQ === ChessSquare.B1) return result
	if (result.blackK === ChessSquare.H8 || result.blackK === ChessSquare.G8) return result
	if (result.blackQ === ChessSquare.A8 || result.blackQ === ChessSquare.B8) return result

	// if there's at least one side with both castlings, we don't need piece placement either
	if (result.whiteK !== undefined && result.whiteQ !== undefined) {
		if (result.blackK === undefined && result.blackQ === undefined) return result
		if (result.blackK !== undefined && result.blackK !== result.whiteK + 56) {
			result.blackK = result.whiteK + 56
			result.blackQ = result.whiteQ + 56
		}
		return result
	} else if (result.blackK !== undefined && result.blackQ !== undefined) {
		if (result.whiteK === undefined && result.whiteQ === undefined) return result
		if (result.whiteK !== undefined && result.whiteK !== result.blackK - 56) {
			result.whiteK = result.blackK - 56
			result.whiteQ = result.blackQ - 56
		}
		return result
	}

	// finally, we're in trouble
	if (result.whiteK !== undefined) {
		const whiteKing: ChessPiece = {
			type: ChessPieceType.KING,
			colour: ChessColour.WHITE,
		}
		const whiteKingPosition = findPiece(whiteKing, pieces ?? {})
		if (whiteKingPosition === undefined) {
			throw new ChessError('White king piece placement is needed for additional context')
		}

		if (whiteKingPosition > result.whiteK) {
			result.whiteQ = result.whiteK
			result.whiteK = undefined
		}
	}
	if (result.blackK !== undefined) {
		const blackKing: ChessPiece = {
			type: ChessPieceType.KING,
			colour: ChessColour.BLACK,
		}
		const blackKingPosition = findPiece(blackKing, pieces ?? {})
		if (blackKingPosition === undefined) {
			throw new ChessError('Black king piece placement is needed for additional context')
		}

		if (blackKingPosition > result.blackK) {
			result.blackQ = result.blackK
			result.blackK = undefined
		}
	}

	return result
}
