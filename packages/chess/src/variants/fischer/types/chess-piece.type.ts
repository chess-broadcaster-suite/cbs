import type { ChessPieceInterface } from '#interfaces/chess-piece.interface'
import type { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'

export type ChessPiece = ChessPieceInterface & {
	type: ChessPieceType
}
