import type { ChessSquare } from '#enums/chess-square.enum'
import type { Castling } from '#variants/fischer/types/castling.type'

export type PositionHistory = {
	castling: Castling
	enPassantTarget?: ChessSquare
	fullMoveNumber: number
	halfMoveClock: number
}
