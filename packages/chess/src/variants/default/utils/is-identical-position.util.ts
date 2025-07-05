import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPosition } from '#variants/default/types/chess-position.type'

export function isIdenticalPosition(
	position: ChessPosition,
	anotherPosition: ChessPosition,
): boolean {
	if (position.sideToMove !== anotherPosition.sideToMove) {
		return false
	}
	if (position.whiteKing !== anotherPosition.whiteKing) {
		return false
	}
	if (position.blackKing !== anotherPosition.blackKing) {
		return false
	}

	const history = position.history
	const anotherHistory = anotherPosition.history
	if (
		history.halfMoveClock !== anotherHistory.halfMoveClock ||
		history.fullMoveNumber !== anotherHistory.fullMoveNumber ||
		history.enPassantTarget !== anotherHistory.enPassantTarget
	) {
		return false
	}

	const castling = history.castling
	const anotherCastling = anotherHistory.castling
	if (
		castling.whiteK !== anotherCastling.whiteK ||
		castling.whiteQ !== anotherCastling.whiteQ ||
		castling.blackK !== anotherCastling.blackK ||
		castling.blackQ !== anotherCastling.blackQ
	) {
		return false
	}

	for (let square = ChessSquare.A1; square <= ChessSquare.H8; square++) {
		if (position.pieces[square] !== anotherPosition.pieces[square]) {
			return false
		}
	}

	return true
}
