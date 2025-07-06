import type { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import type { ChessMove } from '#variants/fischer/types/chess-move.type'
import type { ChessPosition } from '#variants/fischer/types/chess-position.type'

import { ChessColour } from '#enums/chess-colour.enum'
import { fileFromSquare } from '#utils/file-from-square.util'
import { fileToString } from '#utils/file-to-string.util'
import { rankToString } from '#utils/rank-to-string.util'
import { squareToCoordinates } from '#utils/square-to-coordinates.util'
import { squareToString } from '#utils/square-to-string.util'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { getLegalMoves } from '#variants/fischer/utils/get-legal.moves'
import { makeALegalMove } from '#variants/fischer/utils/make-a-legal-move.util'
import { pieceToString } from '#variants/fischer/utils/piece-to-string.util'
import { squareUnderAttack } from '#variants/fischer/utils/square-under-attack.util'

// asserting legal move in a legal position
export function describeLegalMove(
	move: ChessMove,
	position: ChessPosition,
): ChessMoveDescriptorInterface<ChessMove> {
	const { originSquare, targetSquare } = move
	const originCoordinates = squareToCoordinates(originSquare)
	const { sideToMove } = position

	const movingPiece = position.pieces[originSquare]!
	const targetPosition = makeALegalMove(move, position)

	const isCheck = squareUnderAttack(
		sideToMove === ChessColour.WHITE ? targetPosition.blackKing : targetPosition.whiteKing,
		position.pieces,
		sideToMove === ChessColour.WHITE ? ChessColour.BLACK : ChessColour.WHITE,
	)
	const isMate = isCheck && getLegalMoves(targetPosition).length === 0
	const suffix = isMate ? '#' : isCheck ? '+' : ''

	const originSquareToString = squareToString(originSquare)
	const targetSquareString = squareToString(targetSquare)

	const uci = originSquareToString + targetSquareString

	switch (movingPiece.type) {
		case ChessPieceType.KING:
			if (!position.pieces[targetSquare]) {
				return {
					move,
					san: `K${squareToString(targetSquare)}${suffix}`,
					uci,
				}
			}

			if (position.pieces[targetSquare].colour !== sideToMove) {
				return {
					move,
					san: `Kx${squareToString(targetSquare)}${suffix}`,
					uci,
				}
			}

			return {
				move,
				san: `${targetSquare > originSquare ? 'O-O' : 'O-O-O'}${suffix}`,
				uci,
			}

		case ChessPieceType.PAWN:
			const promotedPieceString = move.promotedPieceType
				? `=${pieceToString({ type: move.promotedPieceType, colour: ChessColour.WHITE })}`
				: ''
			if (fileFromSquare(originSquare) === fileFromSquare(targetSquare)) {
				return {
					move,
					san: `${targetSquareString}${promotedPieceString}${suffix}`,
					uci,
				}
			}

			return {
				move,
				san: `${fileFromSquare(originSquare)}x${targetSquare}${promotedPieceString}${suffix}`,
				uci,
			}

		default:
			let hasMoveFromSameFile = false
			let hasMoveFromSameRank = false
			getLegalMoves(position).forEach((anotherMove) => {
				if (anotherMove.targetSquare !== targetSquare) return
				if (anotherMove.originSquare === originSquare) return
				if (position.pieces[originSquare]?.type !== movingPiece.type) return

				const coordinates = squareToCoordinates(anotherMove.originSquare)
				if (coordinates.file === originCoordinates.file) {
					hasMoveFromSameFile = true
				}
				if (coordinates.rank === originCoordinates.rank) {
					hasMoveFromSameRank = true
				}
			})

			const pieceString = pieceToString(movingPiece).toUpperCase()
			const captureString = position.pieces[targetSquare] ? 'x' : ''

			if (!hasMoveFromSameFile && !hasMoveFromSameRank) {
				return {
					move,
					san: `${pieceString}${captureString}${targetSquareString}${suffix}`,
					uci,
				}
			}

			if (!hasMoveFromSameFile) {
				return {
					move,
					san: `${pieceString}${fileToString(originCoordinates.file)}${captureString}${targetSquareString}${suffix}`,
					uci,
				}
			}

			if (!hasMoveFromSameRank) {
				return {
					move,
					san: `${pieceString}${rankToString(originCoordinates.rank)}${captureString}${targetSquareString}${suffix}`,
					uci,
				}
			}

			return {
				move,
				san: `${pieceString}${squareToString(originSquare)}${captureString}${targetSquareString}${suffix}`,
				uci,
			}
	}
}
