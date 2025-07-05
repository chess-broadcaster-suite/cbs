import type { ChessColour } from '#enums/chess-colour.enum'
import type { ChessSquare } from '#enums/chess-square.enum'
import type { ChessPieceInterface } from '#interfaces/chess-piece.interface'

export interface ChessPositionInterface {
	history?: unknown
	pieces: Record<ChessSquare, ChessPieceInterface | undefined>
	sideToMove: ChessColour
}
