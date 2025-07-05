import type { ChessSquare } from '#enums/chess-square.enum'
import type { ChessPositionInterface } from '#interfaces/chess-position.interface'
import type { ChessPiece } from '#variants/fischer/types/chess-piece.type'
import type { PositionHistory } from '#variants/fischer/types/position-history.type'

export type ChessPosition = ChessPositionInterface & {
	blackKing: ChessSquare
	history: PositionHistory
	pieces: Record<ChessSquare, ChessPiece | undefined>
	whiteKing: ChessSquare
}
