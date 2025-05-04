import { ChessPieceInterface } from '#interfaces/chess-piece.interface'
import { ChessPieceType } from '#variants/default/enums/chess-piece-type.enum'

export type ChessPiece = ChessPieceInterface & {
	type: ChessPieceType
}
