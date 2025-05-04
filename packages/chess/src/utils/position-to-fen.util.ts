import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { squareToCoordinates } from '#utils/square-to-coordinates.util'
import { StandardChessPosition } from '#variants/default/interfaces/standard-chess-position.interface'
import { castlingToString } from '#variants/default/utils/castling-to-string.util'
import { pieceToString } from '#variants/default/utils/piece-to-string.util'

export function positionToFen(position: StandardChessPosition): string {
	const { castling, enPassantTarget, fullMoveNumber, halfMoveClock } = position.history

	let pieceFen = ''
	for (let y = 0; y < 8; y++) {
		let emptySquareCount = 0
		for (let x = 0; x < 8; x++) {
			const idx = y * 8 + x
			const piece = position.pieces[idx as ChessSquare]

			if (piece === undefined) {
				emptySquareCount += 1
			} else {
				if (emptySquareCount !== 0) {
					pieceFen += emptySquareCount
					emptySquareCount = 0
				}
				pieceFen += pieceToString(piece)
			}

			if (emptySquareCount !== 0) {
				pieceFen += emptySquareCount
			}
			if (y !== 7) {
				pieceFen += '/'
			}
		}
	}

	const sideToMoveFen = position.sideToMove === ChessColour.WHITE ? 'w' : 'b'
	const castlingFen = `${castlingToString(castling)}`
	const enPassantFen = enPassantTarget ? squareToCoordinates(enPassantTarget) : '-'

	return [pieceFen, sideToMoveFen, castlingFen, enPassantFen, halfMoveClock, fullMoveNumber].join(
		' ',
	)
}
