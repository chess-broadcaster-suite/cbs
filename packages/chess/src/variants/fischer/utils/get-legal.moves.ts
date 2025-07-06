import type { ChessMove } from '#variants/fischer/types/chess-move.type'
import type { ChessPosition } from '#variants/fischer/types/chess-position.type'

import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { squareToCoordinates } from '#utils/square-to-coordinates.util'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { isLegalMove } from '#variants/fischer/utils/is-legal-move.util'

export function getLegalMoves(position: ChessPosition): Array<ChessMove> {
	const candidates: ChessMove[] = []
	const { sideToMove } = position

	for (let originSquare = ChessSquare.A1; originSquare <= ChessSquare.H8; originSquare++) {
		const piece = position.pieces[originSquare]

		if (!piece || piece.colour !== sideToMove) {
			continue
		}
		switch (piece.type) {
			case ChessPieceType.KING:
				candidates.push(
					...getKingTargetSquares(originSquare, position).map((targetSquare) => {
						return { originSquare, targetSquare }
					}),
				)
				break

			case ChessPieceType.QUEEN:
				const queenTargetSquares = getStraightTargetSquares(originSquare)
				queenTargetSquares.push(...getDiagonalTargetSquares(originSquare))
				candidates.push(
					...queenTargetSquares.map((targetSquare) => {
						return { originSquare, targetSquare }
					}),
				)
				break

			case ChessPieceType.ROOK:
				candidates.push(
					...getStraightTargetSquares(originSquare).map((targetSquare) => {
						return { originSquare, targetSquare }
					}),
				)
				break

			case ChessPieceType.BISHOP:
				candidates.push(
					...getDiagonalTargetSquares(originSquare).map((targetSquare) => {
						return { originSquare, targetSquare }
					}),
				)
				break

			case ChessPieceType.KNIGHT:
				candidates.push(
					...getKnightTargetSquares(originSquare).map((targetSquare) => {
						return { originSquare, targetSquare }
					}),
				)
				break

			case ChessPieceType.PAWN:
				getPawnTargetSquares(originSquare, sideToMove).forEach((targetSquare) => {
					if (targetSquare > ChessSquare.H1 && targetSquare < ChessSquare.H7) {
						candidates.push({ originSquare, targetSquare })
						return
					}

					candidates.push({
						originSquare,
						promotedPieceType: ChessPieceType.QUEEN,
						targetSquare,
					})
					candidates.push({
						originSquare,
						promotedPieceType: ChessPieceType.ROOK,
						targetSquare,
					})
					candidates.push({
						originSquare,
						promotedPieceType: ChessPieceType.BISHOP,
						targetSquare,
					})
					candidates.push({
						originSquare,
						promotedPieceType: ChessPieceType.KNIGHT,
						targetSquare,
					})
				})
				break
		}
	}

	return candidates.filter((candidate) => isLegalMove(candidate, position))
}

function getKingTargetSquares(originSquare: ChessSquare, position: ChessPosition): ChessSquare[] {
	const result: ChessSquare[] = []
	const { blackK, blackQ, whiteK, whiteQ } = position.history.castling
	result.push(...getStraightTargetSquares(originSquare, 1))
	result.push(...getDiagonalTargetSquares(originSquare, 1))
	if (position.sideToMove === ChessColour.WHITE) {
		if (whiteK) {
			result.push(whiteK as unknown as ChessSquare)
		}
		if (whiteQ) {
			result.push(whiteQ as unknown as ChessSquare)
		}
	} else {
		if (blackK) {
			result.push((ChessSquare.H7 + blackK) as unknown as ChessSquare)
		}
		if (blackQ) {
			result.push((ChessSquare.H7 + blackQ) as unknown as ChessSquare)
		}
	}

	return result
}

function getKnightTargetSquares(originSquare: ChessSquare): ChessSquare[] {
	const result: ChessSquare[] = []
	const { file, rank } = squareToCoordinates(originSquare)

	if (file > 1 && rank > 0) {
		result.push(((rank - 1) * 8 + file - 2) as ChessSquare)
	}
	if (file > 1 && rank < 7) {
		result.push(((rank + 1) * 8 + file - 2) as ChessSquare)
	}
	if (file < 6 && rank > 0) {
		result.push(((rank - 1) * 8 + file + 2) as ChessSquare)
	}
	if (file < 6 && rank < 7) {
		result.push(((rank + 1) * 8 + file + 2) as ChessSquare)
	}
	if (file > 0 && rank > 1) {
		result.push(((rank - 2) * 8 + file - 1) as ChessSquare)
	}
	if (file > 0 && rank < 6) {
		result.push(((rank + 2) * 8 + file - 1) as ChessSquare)
	}
	if (file < 7 && rank > 1) {
		result.push(((rank - 2) * 8 + file + 1) as ChessSquare)
	}
	if (file < 7 && rank < 6) {
		result.push(((rank + 2) * 8 + file + 1) as ChessSquare)
	}

	return result
}

function getPawnTargetSquares(originSquare: ChessSquare, sideToMove: ChessColour): ChessSquare[] {
	const result: ChessSquare[] = []
	const { file, rank } = squareToCoordinates(originSquare)
	if (sideToMove === ChessColour.WHITE) {
		if (rank === 1) {
			result.push(originSquare + 16)
		}
		result.push(originSquare + 8)

		if (file > 0) {
			result.push(originSquare + 7)
		}
		if (file < 7) {
			result.push(originSquare + 9)
		}
	} else {
		if (rank === 6) {
			result.push(originSquare - 16)
		}
		result.push(originSquare - 8)

		if (file > 0) {
			result.push(originSquare - 9)
		}
		if (file < 7) {
			result.push(originSquare + 7)
		}
	}

	return result
}

function getStraightTargetSquares(
	originSquare: ChessSquare,
	maxDistance: number = 7,
): ChessSquare[] {
	const result: ChessSquare[] = []
	if (maxDistance < 1) {
		return result
	}

	const { file, rank } = squareToCoordinates(originSquare)

	if (file > 0) {
		let xx = file - 1
		while (xx >= 0 && file - xx <= maxDistance) {
			result.push((rank * 8 + xx) as ChessSquare)
			xx -= 1
		}
	}
	if (file < 7) {
		let xx = file + 1
		while (xx <= 7 && xx - file <= maxDistance) {
			result.push((rank * 8 + xx) as ChessSquare)
			xx += 1
		}
	}
	if (rank > 0) {
		let yy = rank - 1
		while (yy >= 0 && rank - yy <= maxDistance) {
			result.push((yy * 8 + file) as ChessSquare)
			yy -= 1
		}
	}
	if (rank < 7) {
		let yy = rank + 1
		while (yy <= 7 && yy - rank <= maxDistance) {
			result.push((yy * 8 + file) as ChessSquare)
			yy += 1
		}
	}

	return result
}

function getDiagonalTargetSquares(
	originSquare: ChessSquare,
	maxDistance: number = 7,
): ChessSquare[] {
	const result: ChessSquare[] = []
	if (maxDistance < 1) {
		return result
	}

	const { file, rank } = squareToCoordinates(originSquare)

	if (file > 0 && rank > 0) {
		let xx = file - 1
		let yy = rank - 1
		while (xx >= 0 && yy >= 0 && file - xx <= maxDistance) {
			result.push((yy * 8 + xx) as ChessSquare)
			xx -= 1
			yy -= 1
		}
	}
	if (file > 0 && rank < 7) {
		let xx = file - 1
		let yy = rank + 1
		while (xx >= 0 && yy <= 7 && file - xx <= maxDistance) {
			result.push((yy * 8 + xx) as ChessSquare)
			xx -= 1
			yy += 1
		}
	}
	if (file < 7 && rank > 0) {
		let xx = file + 1
		let yy = rank - 1
		while (xx <= 7 && yy >= 0 && xx - file <= maxDistance) {
			result.push((yy * 8 + xx) as ChessSquare)
			xx += 1
			yy -= 1
		}
	}
	if (file < 7 && rank < 7) {
		let xx = file + 1
		let yy = rank + 1
		while (xx <= 7 && yy <= 7 && xx - file <= maxDistance) {
			result.push((yy * 8 + xx) as ChessSquare)
			xx += 1
			yy += 1
		}
	}

	return result
}
