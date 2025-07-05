import type { ChessSquare } from '#enums/chess-square.enum'

export interface ChessMoveInterface {
	originSquare?: ChessSquare
	targetSquare?: ChessSquare
}
