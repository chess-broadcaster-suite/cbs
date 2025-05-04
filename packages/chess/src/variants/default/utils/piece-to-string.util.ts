import { ChessColour } from '#enums/chess-colour.enum'
import { ChessPieceType } from '#variants/default/enums/chess-piece-type.enum'
import { ChessPiece } from '#variants/default/types/chess-piece.type'

export function pieceToString(piece: ChessPiece): string {
	switch (piece.type) {
		case ChessPieceType.KING:
			return piece.colour === ChessColour.WHITE ? 'K' : 'k'
		case ChessPieceType.QUEEN:
			return piece.colour === ChessColour.WHITE ? 'Q' : 'q'
		case ChessPieceType.ROOK:
			return piece.colour === ChessColour.WHITE ? 'R' : 'r'
		case ChessPieceType.BISHOP:
			return piece.colour === ChessColour.WHITE ? 'B' : 'b'
		case ChessPieceType.KNIGHT:
			return piece.colour === ChessColour.WHITE ? 'N' : 'n'
		default:
			return piece.colour === ChessColour.WHITE ? 'P' : 'p'
	}
}
