import { ChessSquare } from '#enums/chess-square.enum'
import { ChessMoveInterface } from '#interfaces/chess-move.interface'
import { ChessPieceType } from '#variants/default/enums/chess-piece-type.enum'

export type ChessMove = ChessMoveInterface & {
	originSquare: ChessSquare
	promotedPieceType?: ChessPieceType
	targetSquare: ChessSquare
}
