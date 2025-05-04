import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPieceInterface } from '#interfaces/chess-piece.interface'

export interface ChessPositionInterface {
	history?: unknown
	pieces: Record<ChessSquare, ChessPieceInterface | undefined>
	sideToMove: ChessColour
}
