import type { ChessMove } from '#variants/fischer/types/chess-move.type'
import type { ChessPosition } from '#variants/fischer/types/chess-position.type'

import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { squareToCoordinates } from '#utils/square-to-coordinates.util'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { copyPosition } from '#variants/fischer/utils/copy-position.util'

// asserting legal move in a legal position
export function makeALegalMove(move: ChessMove, position: ChessPosition): ChessPosition {
	const { originSquare, targetSquare } = move
	const { sideToMove } = position
	const movingPiece = position.pieces[originSquare]!

	let newPosition: ChessPosition

	switch (movingPiece.type) {
		case ChessPieceType.KING:
			newPosition = makeALegalKingMove(move, position)
			break
		case ChessPieceType.QUEEN:
		case ChessPieceType.ROOK:
		case ChessPieceType.BISHOP:
		case ChessPieceType.KNIGHT:
			newPosition = copyPosition(position)
			const targetPiece = position.pieces[targetSquare]
			newPosition.pieces[originSquare] = undefined
			newPosition.pieces[targetSquare] = movingPiece
			if (targetPiece !== undefined) {
				newPosition.history.halfMoveClock = 0
			} else {
				newPosition.history.halfMoveClock += 1
			}
			newPosition.history.enPassantTarget = undefined
			break
		case ChessPieceType.PAWN:
			newPosition = makeALegalPawnMove(move, position)
			break
	}

	newPosition.sideToMove = sideToMove === ChessColour.WHITE ? ChessColour.BLACK : ChessColour.WHITE
	if (sideToMove === ChessColour.WHITE) {
		newPosition.history.fullMoveNumber += 1
	}

	return newPosition
}

// asserting legal king's move
function makeALegalKingMove(move: ChessMove, position: ChessPosition): ChessPosition {
	const { originSquare, targetSquare } = move
	const { sideToMove } = position
	const newPosition = copyPosition(position)

	const king = position.pieces[originSquare]!
	newPosition.history.enPassantTarget = undefined

	if (!isALegalCastlingMove(move, position)) {
		newPosition.pieces[originSquare] = undefined
		newPosition.pieces[targetSquare] = king
		if (sideToMove === ChessColour.WHITE) {
			newPosition.whiteKing = targetSquare
		} else {
			newPosition.blackKing = targetSquare
		}
		if (position.pieces[targetSquare] !== undefined) {
			newPosition.history.halfMoveClock = 0
		} else {
			newPosition.history.halfMoveClock += 1
		}

		return newPosition
	}

	const { castling } = position.history
	newPosition.pieces[originSquare] = undefined

	if (sideToMove === ChessColour.WHITE) {
		if (targetSquare === castling.whiteK) {
			const rookSquare = castling.whiteK
			const rook = position.pieces[rookSquare]
			newPosition.pieces[rookSquare] = undefined
			newPosition.pieces[ChessSquare.G1] = king
			newPosition.pieces[ChessSquare.F1] = rook
			newPosition.whiteKing = ChessSquare.G1
		} else {
			const rookSquare = castling.whiteQ!
			const rook = position.pieces[rookSquare]
			newPosition.pieces[rookSquare] = undefined
			newPosition.pieces[ChessSquare.C1] = king
			newPosition.pieces[ChessSquare.D1] = rook
			newPosition.whiteKing = ChessSquare.C1
		}
	} else {
		if (targetSquare === castling.blackK) {
			const rookSquare = castling.blackK
			const rook = position.pieces[rookSquare]
			newPosition.pieces[rookSquare] = undefined
			newPosition.pieces[ChessSquare.G8] = king
			newPosition.pieces[ChessSquare.F8] = rook
			newPosition.blackKing = ChessSquare.G8
		} else {
			const rookSquare = castling.blackQ!
			const rook = position.pieces[rookSquare]
			newPosition.pieces[rookSquare] = undefined
			newPosition.pieces[ChessSquare.C1] = king
			newPosition.pieces[ChessSquare.D1] = rook
			newPosition.blackKing = ChessSquare.C8
		}
	}
	newPosition.history.halfMoveClock += 1
	return newPosition
}

// asserting legal king's move
function isALegalCastlingMove(move: ChessMove, position: ChessPosition): boolean {
	const { sideToMove } = position
	const { castling } = position.history
	const { targetSquare } = move

	if (sideToMove === ChessColour.WHITE) {
		return (
			targetSquare === (castling.whiteK as unknown as ChessSquare) ||
			targetSquare === (castling.whiteQ as unknown as ChessSquare)
		)
	}

	if (castling.blackK !== undefined && castling.blackK + ChessSquare.H7 === targetSquare) {
		return true
	}
	if (castling.blackQ !== undefined && castling.blackQ + ChessSquare.H7 === targetSquare) {
		return true
	}

	return false
}

function makeALegalPawnMove(move: ChessMove, position: ChessPosition): ChessPosition {
	const { originSquare, targetSquare } = move
	const { sideToMove } = position
	const { rank: originRank } = squareToCoordinates(originSquare)
	const { rank: targetRank } = squareToCoordinates(targetSquare)
	const newPosition = copyPosition(position)
	newPosition.history.halfMoveClock = 0

	const pawn = position.pieces[originSquare]
	newPosition.pieces[originSquare] = undefined
	newPosition.pieces[targetSquare] = pawn

	if (position.history.enPassantTarget === targetSquare) {
		if (sideToMove === ChessColour.WHITE) {
			newPosition.pieces[(targetSquare - 8) as ChessSquare] = undefined
		} else {
			newPosition.pieces[(targetSquare + 8) as ChessSquare] = undefined
		}
	}

	if (Math.abs(originRank - targetRank) === 2) {
		newPosition.history.enPassantTarget =
			sideToMove === ChessColour.WHITE ? originSquare + 8 : originSquare - 8
	} else {
		newPosition.history.enPassantTarget = undefined
	}

	return newPosition
}
