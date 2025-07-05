import type { ChessSquare } from '#enums/chess-square.enum'
import type { ChessPositionInterface } from '#interfaces/chess-position.interface'
import type { ChessPiece } from '#variants/default/types/chess-piece.type'
import type { PositionHistory } from '#variants/default/types/position-history.type'

export type ChessPosition = ChessPositionInterface & {
	blackKing: ChessSquare
	history: PositionHistory
	pieces: Record<ChessSquare, ChessPiece | undefined>
	whiteKing: ChessSquare
}
