import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { squareToCoordinates } from '#utils/square-to-coordinates.util'
import { ChessPieceType } from '#variants/default/enums/chess-piece-type.enum'
import { ChessPiece } from '#variants/default/types/chess-piece.type'

export function squareUnderAttack(
	square: ChessSquare,
	pieces: Record<ChessSquare, ChessPiece | undefined>,
	sideToAttack: ChessColour,
): boolean {
	const { file, rank } = squareToCoordinates(square)

	if (file > 0) {
		for (let xx = file - 1; xx >= 0; xx--) {
			const piece = pieces[(rank * 8 + xx) as ChessSquare]
			if (piece === undefined) {
				continue
			}
			if (piece.colour === sideToAttack) {
				break
			}
			switch (piece.type) {
				case ChessPieceType.KING:
					if (xx === file - 1) {
						return true
					}
					break
				case ChessPieceType.QUEEN:
				case ChessPieceType.ROOK:
					return true
				default:
					break
			}
			break
		}
	}
	if (file < 7) {
		for (let xx = file + 1; xx <= 7; xx++) {
			const piece = pieces[(rank * 8 + xx) as ChessSquare]
			if (piece === undefined) {
				continue
			}
			if (piece.colour === sideToAttack) {
				break
			}
			switch (piece.type) {
				case ChessPieceType.KING:
					if (xx === file + 1) {
						return true
					}
					break
				case ChessPieceType.QUEEN:
				case ChessPieceType.ROOK:
					return true
				default:
					break
			}
			break
		}
	}

	if (rank > 0) {
		for (let yy = rank - 1; yy >= 0; yy--) {
			const piece = pieces[(yy * 8 + file) as ChessSquare]
			if (piece === undefined) {
				continue
			}
			if (piece.colour === sideToAttack) {
				break
			}
			switch (piece.type) {
				case ChessPieceType.KING:
					if (yy === rank - 1) {
						return true
					}
					break
				case ChessPieceType.QUEEN:
				case ChessPieceType.ROOK:
					return true
				default:
					break
			}
			break
		}
	}

	if (rank < 7) {
		for (let yy = rank + 1; yy <= 7; yy++) {
			const piece = pieces[(yy * 8 + file) as ChessSquare]
			if (piece === undefined) {
				continue
			}
			if (piece.colour === sideToAttack) {
				break
			}
			switch (piece.type) {
				case ChessPieceType.KING:
					if (yy === rank + 1) {
						return true
					}
					break
				case ChessPieceType.QUEEN:
				case ChessPieceType.ROOK:
					return true
				default:
					break
			}
			break
		}
	}

	if (file > 0 && rank > 0) {
		for (let xx = file - 1, yy = rank - 1; xx >= 0 && yy >= 0; xx--, yy--) {
			const piece = pieces[(yy * 8 + file) as ChessSquare]
			if (piece === undefined) {
				continue
			}
			if (piece.colour === sideToAttack) {
				break
			}
			switch (piece.type) {
				case ChessPieceType.KING:
					if (yy === rank - 1) {
						return true
					}
					break
				case ChessPieceType.QUEEN:
				case ChessPieceType.BISHOP:
					return true
				case ChessPieceType.PAWN:
					if (yy === rank - 1 && sideToAttack === ChessColour.WHITE) {
						return true
					}
					break
				default:
					break
			}
			break
		}
	}

	if (file < 7 && rank > 0) {
		for (let xx = file + 1, yy = rank - 1; xx <= 7 && yy >= 0; xx++, yy--) {
			const piece = pieces[(yy * 8 + file) as ChessSquare]
			if (piece === undefined) {
				continue
			}
			if (piece.colour === sideToAttack) {
				break
			}
			switch (piece.type) {
				case ChessPieceType.KING:
					if (yy === rank - 1) {
						return true
					}
					break
				case ChessPieceType.QUEEN:
				case ChessPieceType.BISHOP:
					return true
				case ChessPieceType.PAWN:
					if (yy === rank - 1 && sideToAttack === ChessColour.WHITE) {
						return true
					}
					break
				default:
					break
			}
			break
		}
	}

	if (file > 0 && rank < 7) {
		for (let xx = file - 1, yy = rank + 1; xx >= 0 && yy <= 7; xx--, yy++) {
			const piece = pieces[(yy * 8 + file) as ChessSquare]
			if (piece === undefined) {
				continue
			}
			if (piece.colour === sideToAttack) {
				break
			}
			switch (piece.type) {
				case ChessPieceType.KING:
					if (yy === rank + 1) {
						return true
					}
					break
				case ChessPieceType.QUEEN:
				case ChessPieceType.BISHOP:
					return true
				case ChessPieceType.PAWN:
					if (yy === rank + 1 && sideToAttack === ChessColour.BLACK) {
						return true
					}
					break
				default:
					break
			}
		}
	}

	if (file < 7 && rank < 7) {
		for (let xx = file + 1, yy = rank + 1; xx <= 7 && yy <= 7; xx++, yy++) {
			const piece = pieces[(yy * 8 + file) as ChessSquare]
			if (piece === undefined) {
				continue
			}
			if (piece.colour === sideToAttack) {
				break
			}
			switch (piece.type) {
				case ChessPieceType.KING:
					if (yy === rank + 1) {
						return true
					}
					break
				case ChessPieceType.QUEEN:
				case ChessPieceType.BISHOP:
					return true
				case ChessPieceType.PAWN:
					if (yy === rank + 1 && sideToAttack === ChessColour.BLACK) {
						return true
					}
					break
				default:
					break
			}
		}
	}

	if (rank > 1 && file > 0) {
		const piece = pieces[((rank - 2) * 8 + file - 1) as ChessSquare]
		if (piece?.colour === sideToAttack && piece?.type === ChessPieceType.KNIGHT) {
			return true
		}
	}
	if (rank > 1 && file < 7) {
		const piece = pieces[((rank - 2) * 8 + file + 1) as ChessSquare]
		if (piece?.colour === sideToAttack && piece?.type === ChessPieceType.KNIGHT) {
			return true
		}
	}
	if (rank < 6 && file > 0) {
		const piece = pieces[((rank + 2) * 8 + file - 1) as ChessSquare]
		if (piece?.colour === sideToAttack && piece?.type === ChessPieceType.KNIGHT) {
			return true
		}
	}
	if (rank < 6 && file < 7) {
		const piece = pieces[((rank + 2) * 8 + file + 1) as ChessSquare]
		if (piece?.colour === sideToAttack && piece?.type === ChessPieceType.KNIGHT) {
			return true
		}
	}

	if (file > 1 && rank > 0) {
		const piece = pieces[((rank - 1) * 8 + file - 2) as ChessSquare]
		if (piece?.colour === sideToAttack && piece?.type === ChessPieceType.KNIGHT) {
			return true
		}
	}
	if (file > 1 && rank < 7) {
		const piece = pieces[((rank + 1) * 8 + file - 2) as ChessSquare]
		if (piece?.colour === sideToAttack && piece?.type === ChessPieceType.KNIGHT) {
			return true
		}
	}
	if (file < 6 && rank > 0) {
		const piece = pieces[((rank - 1) * 8 + file + 2) as ChessSquare]
		if (piece?.colour === sideToAttack && piece?.type === ChessPieceType.KNIGHT) {
			return true
		}
	}
	if (file < 6 && rank < 7) {
		const piece = pieces[((rank + 1) * 8 + file + 2) as ChessSquare]
		if (piece?.colour === sideToAttack && piece?.type === ChessPieceType.KNIGHT) {
			return true
		}
	}

	return false
}
