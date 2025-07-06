import type { ChessSquare } from '#enums/chess-square.enum'
import type { ChessMoveInterface } from '#interfaces/chess-move.interface'
import type { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'

export type ChessMove = ChessMoveInterface & {
	originSquare: ChessSquare
	promotedPieceType?: ChessPieceType
	targetSquare: ChessSquare
}
