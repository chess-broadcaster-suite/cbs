import type { ChessPosition } from '#variants/fischer/types/chess-position.type'

import { ChessColour } from '#enums/chess-colour.enum'
import { findPiece } from '#utils/find-piece.util'
import { parseSquare } from '#utils/parse-square.util'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { isLegalPosition } from '#variants/fischer/utils/is-legal-position.util'
import { parseCastling } from '#variants/fischer/utils/parse-castling.util'
import { parsePieces } from '#variants/fischer/utils/parse-pieces.util'
import { parseSideToMove } from '#variants/fischer/utils/parse-side-to-move'

export function parsePosition(fen: string): ChessPosition | null {
	const bits = fen.trim().split(' ')
	if (bits.length < 3) {
		return null
	}

	const [piecesBit, sideToMoveBit, castlingBit] = bits
	const enPassantTargetBit = bits[3] ?? '-'
	const halfMoveClockBit = bits[4] ?? '0'
	const fullMoveNumberBit = bits[5] ?? '1'

	const pieces = parsePieces(piecesBit)
	if (!pieces) {
		return null
	}
	const sideToMove = parseSideToMove(sideToMoveBit)
	const castling = parseCastling(castlingBit, pieces)
	const enPassantTarget = parseSquare(enPassantTargetBit)
	const halfMoveClock = parseInt(halfMoveClockBit)
	const fullMoveNumber = parseInt(fullMoveNumberBit)

	if (
		!sideToMove ||
		!castling ||
		enPassantTarget === null ||
		isNaN(halfMoveClock) ||
		isNaN(fullMoveNumber)
	) {
		return null
	}

	const whiteKing = findPiece({ colour: ChessColour.WHITE, type: ChessPieceType.KING }, pieces)
	const blackKing = findPiece({ colour: ChessColour.BLACK, type: ChessPieceType.KING }, pieces)

	if (!whiteKing || !blackKing) {
		return null
	}
	const position = {
		blackKing,
		history: { castling, enPassantTarget, fullMoveNumber, halfMoveClock },
		pieces,
		sideToMove,
		whiteKing,
	}

	return isLegalPosition(position) ? position : null
}
