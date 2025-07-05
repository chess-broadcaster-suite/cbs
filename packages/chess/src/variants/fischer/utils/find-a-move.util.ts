import type { ChessMove } from '#variants/fischer/types/chess-move.type'
import type { ChessPosition } from '#variants/fischer/types/chess-position.type'

import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { isIdenticalPosition } from '#variants/fischer/utils/is-identical-position.util'
import { isLegalMove } from '#variants/fischer/utils/is-legal-move.util'
import { makeALegalMove } from '#variants/fischer/utils/make-a-legal-move.util'

export function findAMove(
	originPosition: ChessPosition,
	targetPosition: ChessPosition,
): ChessMove | null {
	const diffChessSquares: Set<ChessSquare> = new Set()
	for (let square = ChessSquare.A1; square <= ChessSquare.H8; square++) {
		const originPiece = originPosition.pieces[square]
		const targetPiece = targetPosition.pieces[square]
		if (originPiece?.colour !== targetPiece?.colour || originPiece?.type !== targetPiece?.type) {
			continue
		}
		diffChessSquares.add(square)
	}

	switch (diffChessSquares.size) {
		case 4:
			return findCastlingMove(originPosition, targetPosition)
		case 3:
			return (
				findEnPassantMove(originPosition, targetPosition, diffChessSquares) ??
				findCastlingMove(originPosition, targetPosition)
			)
		case 2:
			return (
				findCastlingMove(originPosition, targetPosition) ??
				findStandardMove(originPosition, targetPosition, diffChessSquares)
			)
		default:
			return null
	}
}

function findCastlingMove(
	originPosition: ChessPosition,
	targetPosition: ChessPosition,
): ChessMove | null {
	let originSquare: ChessSquare | undefined
	let targetSquare: ChessSquare | undefined

	if (originPosition.sideToMove === ChessColour.WHITE) {
		originSquare = originPosition.whiteKing
		targetSquare =
			targetPosition.whiteKing === ChessSquare.G1
				? originPosition.history.castling.whiteK
				: originPosition.history.castling.whiteQ
	} else {
		originSquare = originPosition.blackKing
		targetSquare =
			targetPosition.blackKing === ChessSquare.G1
				? originPosition.history.castling.blackK
				: originPosition.history.castling.blackQ
	}

	if (!originSquare || !targetSquare) return null

	const move = { originSquare, targetSquare }
	if (!isLegalMove(move, originPosition)) return null

	return isIdenticalPosition(targetPosition, makeALegalMove(move, originPosition)) ? move : null
}

function findEnPassantMove(
	originPosition: ChessPosition,
	targetPosition: ChessPosition,
	diffSquares: Set<ChessSquare>,
): ChessMove | null {
	if (
		!originPosition.history.enPassantTarget ||
		!diffSquares.has(originPosition.history.enPassantTarget)
	)
		return null

	const targetSquare = diffSquares
		.values()
		.find((square) => !originPosition.pieces[square] && targetPosition.pieces[square])
	if (!targetSquare) return null

	const originSquare = diffSquares
		.values()
		.find((square) => square !== targetSquare && square !== originPosition.history.enPassantTarget)
	if (!originSquare) return null

	const move = {
		originSquare,
		targetSquare,
	}

	if (!isLegalMove(move, originPosition)) return null

	return isIdenticalPosition(targetPosition, makeALegalMove(move, originPosition)) ? move : null
}

function findStandardMove(
	originPosition: ChessPosition,
	targetPosition: ChessPosition,
	diffSquares: Set<ChessSquare>,
): ChessMove | null {
	const originSquare = diffSquares
		.values()
		.find((square) => targetPosition.pieces[square] === undefined)
	if (originSquare === undefined) return null

	const targetSquare = diffSquares
		.values()
		.filter((square) => square !== originSquare)
		.next().value!
	const movingPieceType = originPosition.pieces[originSquare]!.type
	let promotedPieceType: ChessPieceType | undefined

	if (
		movingPieceType === ChessPieceType.PAWN &&
		targetPosition.pieces[targetSquare]?.type !== ChessPieceType.PAWN
	) {
		promotedPieceType = targetPosition.pieces[targetSquare]?.type
	}

	const move: ChessMove = {
		originSquare,
		targetSquare,
		promotedPieceType,
	}

	if (!isLegalMove(move, originPosition)) return null

	return isIdenticalPosition(targetPosition, makeALegalMove(move, originPosition)) ? move : null
}
