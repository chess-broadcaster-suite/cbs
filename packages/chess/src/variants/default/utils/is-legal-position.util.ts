import type { ChessFile } from '#enums/chess-file.enum'
import type { ChessPosition } from '#variants/default/types/chess-position.type'

import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { fileFromSquare } from '#utils/file-from-square.util'
import { ChessPieceType } from '#variants/default/enums/chess-piece-type.enum'
import { squareUnderAttack } from '#variants/default/utils/square-under-attack.util'

export function isLegalPosition(position: ChessPosition): boolean {
	let whiteKingSquare: ChessSquare | undefined
	let blackKingSquare: ChessSquare | undefined

	for (let square = ChessSquare.A1; square <= ChessSquare.H8; square++) {
		const piece = position.pieces[square]
		switch (piece?.type) {
			case ChessPieceType.KING:
				if (piece.colour === ChessColour.WHITE) {
					if (whiteKingSquare !== undefined) {
						return false
					}
					whiteKingSquare = square
					continue
				}

				if (blackKingSquare !== undefined) {
					return false
				}
				blackKingSquare = square
				continue
			case ChessPieceType.PAWN:
				if (square < ChessSquare.A2 || square > ChessSquare.H7) {
					return false
				}
				continue
			default:
				continue
		}
	}
	if (whiteKingSquare === undefined || blackKingSquare === undefined) {
		return false
	}

	if (!validateCastling(position)) {
		return false
	}
	if (
		squareUnderAttack(whiteKingSquare, position.pieces, ChessColour.BLACK) &&
		position.sideToMove === ChessColour.BLACK
	) {
		return false
	}
	if (
		squareUnderAttack(blackKingSquare, position.pieces, ChessColour.WHITE) &&
		position.sideToMove === ChessColour.WHITE
	) {
		return false
	}

	return true
}

function validateCastling(position: ChessPosition): boolean {
	const { pieces } = position
	const { castling } = position.history

	const { blackK, blackQ, whiteK, whiteQ } = castling
	if (whiteK !== undefined) {
		const rook = pieces[whiteK]
		if (rook?.colour !== ChessColour.WHITE || rook?.type !== ChessPieceType.ROOK) {
			return false
		}
	}
	if (whiteQ !== undefined) {
		const rook = pieces[whiteQ]
		if (rook?.colour !== ChessColour.WHITE || rook?.type !== ChessPieceType.ROOK) {
			return false
		}
	}
	if (blackK !== undefined) {
		const rook = pieces[blackK]
		if (rook?.colour !== ChessColour.BLACK || rook?.type !== ChessPieceType.ROOK) {
			return false
		}
	}
	if (blackQ !== undefined) {
		const rook = pieces[blackQ]
		if (rook?.colour !== ChessColour.BLACK || rook?.type !== ChessPieceType.ROOK) {
			return false
		}
	}

	if (whiteK !== undefined && blackK !== undefined && whiteK % 8 !== blackK % 8) {
		return false
	}
	if (whiteQ !== undefined && blackQ !== undefined && whiteQ % 8 !== blackQ % 8) {
		return false
	}
	if (whiteK !== undefined && whiteQ !== undefined && whiteK <= whiteQ) {
		return false
	}
	if (blackK !== undefined && blackQ !== undefined && blackK <= blackQ) {
		return false
	}

	let whiteKingFile: ChessFile | undefined
	if (whiteK !== undefined || whiteQ !== undefined) {
		for (let i = ChessSquare.B1; i < ChessSquare.H1; i++) {
			const king = pieces[i]
			if (king?.colour === ChessColour.WHITE && king?.type === ChessPieceType.KING) {
				whiteKingFile = fileFromSquare(i)
				break
			}
		}

		if (
			whiteKingFile === undefined ||
			(whiteK !== undefined && whiteKingFile > whiteK % 8) ||
			(whiteQ !== undefined && whiteKingFile < whiteQ % 8)
		) {
			return false
		}
	}

	let blackKingFile: ChessFile | undefined
	if (blackK !== undefined || blackQ !== undefined) {
		for (let i = ChessSquare.B8; i < ChessSquare.H8; i++) {
			const king = pieces[i]
			if (king?.colour === ChessColour.WHITE && king?.type === ChessPieceType.KING) {
				blackKingFile = fileFromSquare(i)
				break
			}
		}

		if (
			blackKingFile === undefined ||
			(blackK !== undefined && blackKingFile > blackK % 8) ||
			(blackQ !== undefined && blackKingFile < blackQ % 8)
		) {
			return false
		}
	}

	if (
		whiteKingFile !== undefined &&
		blackKingFile !== undefined &&
		whiteKingFile !== blackKingFile
	) {
		return false
	}

	return true
}
