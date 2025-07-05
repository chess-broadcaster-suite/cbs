import type { ChessPosition } from '#variants/default/types/chess-position.type'

import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { squareToString } from '#utils/square-to-string.util'
import { ChessPiece } from '#variants/default/types/chess-piece.type'
import { castlingToString } from '#variants/default/utils/castling-to-string.util'
import { pieceToString } from '#variants/default/utils/piece-to-string.util'

export function positionToFen(position: ChessPosition): string {
	const pieces = piecesToString(position.pieces)
	const sideToMove = position.sideToMove === ChessColour.WHITE ? 'w' : 'b'
	const castling = castlingToString(position.history.castling)
	const enPassantTarget = position.history.enPassantTarget
		? squareToString(position.history.enPassantTarget)
		: '-'
	const { halfMoveClock, fullMoveNumber } = position.history

	return [pieces, sideToMove, castling, enPassantTarget, halfMoveClock, fullMoveNumber].join(' ')
}

function piecesToString(pieces: Record<ChessSquare, ChessPiece | undefined>): string {
	const rows: string[] = []
	let row = ''
	let emptyCount = 0

	for (let square = ChessSquare.A1; square <= ChessSquare.H8; square++) {
		const piece = pieces[square]
		if (!piece) {
			emptyCount += 1
		} else {
			emptyCount = 0
			row += pieceToString(piece)
		}

		if (square / 8 === 0) {
			if (!emptyCount) {
				row += emptyCount
			}
			rows.push(row)
			row = ''
			emptyCount = 0
		}
	}

	return rows.reverse().join('/')
}
