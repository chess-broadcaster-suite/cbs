import { ChessSquare } from '#enums/chess-square.enum'
import { Castling } from '#variants/default/types/castling.type'

export type PositionHistory = {
	castling: Castling
	enPassantTarget?: ChessSquare
	fullMoveNumber: number
	halfMoveClock: number
}
