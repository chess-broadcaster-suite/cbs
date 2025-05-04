import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'
import { ChessPiece } from '#variants/default/types/chess-piece.type'
import { PositionHistory } from '#variants/default/types/position-history.type'

export type ChessPosition = ChessPositionInterface & {
	blackKing: ChessSquare
	history: PositionHistory
	pieces: Record<ChessSquare, ChessPiece | undefined>
	whiteKing: ChessSquare
}
