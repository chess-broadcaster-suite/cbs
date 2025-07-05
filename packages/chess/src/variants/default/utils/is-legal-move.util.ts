import type { ChessMove } from '#variants/default/types/chess-move.type'
import type { ChessPosition } from '#variants/default/types/chess-position.type'

import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { squareToCoordinates } from '#utils/square-to-coordinates.util'
import { ChessPieceType } from '#variants/default/enums/chess-piece-type.enum'
import { squareUnderAttack } from '#variants/default/utils/square-under-attack.util'

export function isLegalMove(move: ChessMove, position: ChessPosition): boolean {
	const { pieces, sideToMove } = position
	const { castling, enPassantTarget } = position.history
	const king = sideToMove === ChessColour.WHITE ? position.whiteKing : position.blackKing
	const opponentColour = sideToMove === ChessColour.WHITE ? ChessColour.BLACK : ChessColour.WHITE

	const { originSquare, targetSquare } = move
	const { file: originFile, rank: originRank } = squareToCoordinates(originSquare)
	const { file: targetFile, rank: targetRank } = squareToCoordinates(targetSquare)
	const movingPiece = pieces[originSquare]
	const targetPiece = pieces[targetSquare]

	if (
		movingPiece === undefined ||
		movingPiece.colour !== sideToMove ||
		originSquare === targetSquare
	) {
		return false
	}

	if (movingPiece.type === ChessPieceType.KING) {
		if (targetPiece?.colour !== sideToMove) {
			if (Math.abs(targetRank - originRank) !== 1 || Math.abs(targetFile - originFile) !== 1) {
				return false
			}
			if (squareUnderAttack(king, pieces, opponentColour)) {
				return false
			}

			pieces[originSquare] = undefined
			pieces[targetSquare] = movingPiece
			const pass = squareUnderAttack(king, pieces, opponentColour)
			pieces[targetSquare] = targetPiece
			pieces[originSquare] = movingPiece
			return pass
		}

		if (targetPiece?.type !== ChessPieceType.ROOK) {
			return false
		}

		if (sideToMove === ChessColour.WHITE) {
			if (originRank !== 0 || targetRank !== 0) {
				return false
			}

			if (targetSquare === castling.whiteK) {
				if (originFile > targetFile) {
					return false
				}
				for (
					let squareToCheck = (originSquare + 1) as ChessSquare;
					squareToCheck <= ChessSquare.G1;
					squareToCheck++
				) {
					if (pieces[squareToCheck] !== undefined && squareToCheck !== targetSquare) {
						return false
					}
					if (squareUnderAttack(squareToCheck, pieces, opponentColour)) {
						return false
					}
				}
				if (originSquare === ChessSquare.G1) {
					if (position.pieces[ChessSquare.F1] !== undefined) {
						return false
					}
				}

				return true
			}

			if (targetSquare === castling.whiteQ) {
				if (originFile < targetFile) {
					return false
				}
				for (
					let squareToCheck = (originSquare - 1) as ChessSquare;
					squareToCheck <= ChessSquare.C1;
					squareToCheck--
				) {
					if (pieces[squareToCheck] !== undefined && squareToCheck !== targetSquare) {
						return false
					}
					if (squareUnderAttack(squareToCheck, pieces, opponentColour)) {
						return false
					}
				}

				switch (targetSquare) {
					case ChessSquare.A1:
						if (position.pieces[ChessSquare.B1] !== undefined) {
							return false
						}
						break
					case ChessSquare.B1:
						const piece = position.pieces[ChessSquare.A1]
						if (
							piece?.colour === ChessColour.BLACK &&
							(piece.type === ChessPieceType.QUEEN || piece.type === ChessPieceType.ROOK)
						) {
							return false
						}
						break
					default:
						for (const square of [ChessSquare.B1, ChessSquare.A1]) {
							const piece = position.pieces[square]
							if (piece === undefined) {
								continue
							}
							if (
								piece.colour === ChessColour.BLACK &&
								(piece.type === ChessPieceType.QUEEN || piece.type === ChessPieceType.ROOK)
							) {
								return false
							}
							break
						}
						break
				}

				for (
					let squareToCheck = (originSquare + 1) as ChessSquare;
					squareToCheck <= ChessSquare.D1;
					squareToCheck++
				) {
					if (pieces[squareToCheck] !== undefined) {
						return false
					}
				}
				return true
			}

			return false
		}

		if (originRank !== 7 || targetRank !== 7) {
			return false
		}

		if (targetSquare === castling.blackK) {
			if (originFile > targetFile) {
				return false
			}
			for (
				let squareToCheck = (originSquare + 1) as ChessSquare;
				squareToCheck <= ChessSquare.G8;
				squareToCheck++
			) {
				if (pieces[squareToCheck] !== undefined && squareToCheck !== targetSquare) {
					return false
				}
				if (squareUnderAttack(squareToCheck, pieces, opponentColour)) {
					return false
				}
			}
			if (originSquare === ChessSquare.G8) {
				if (position.pieces[ChessSquare.F8] !== undefined) {
					return false
				}
			}

			return true
		}

		if (targetSquare === castling.blackQ) {
			if (originFile < targetFile) {
				return false
			}
			for (
				let squareToCheck = (originSquare - 1) as ChessSquare;
				squareToCheck <= ChessSquare.C1;
				squareToCheck--
			) {
				if (pieces[squareToCheck] !== undefined && squareToCheck !== targetSquare) {
					return false
				}
				if (squareUnderAttack(squareToCheck, pieces, opponentColour)) {
					return false
				}
			}

			switch (targetSquare) {
				case ChessSquare.A8:
					if (position.pieces[ChessSquare.B8] !== undefined) {
						return false
					}
					break
				case ChessSquare.B8:
					const piece = position.pieces[ChessSquare.A8]
					if (
						piece?.colour === ChessColour.WHITE &&
						(piece.type === ChessPieceType.QUEEN || piece.type === ChessPieceType.ROOK)
					) {
						return false
					}
					break
				default:
					for (const square of [ChessSquare.B8, ChessSquare.A8]) {
						const piece = position.pieces[square]
						if (piece === undefined) {
							continue
						}
						if (
							piece.colour === ChessColour.WHITE &&
							(piece.type === ChessPieceType.QUEEN || piece.type === ChessPieceType.ROOK)
						) {
							return false
						}
						break
					}
					break
			}

			for (
				let squareToCheck = (originSquare + 1) as ChessSquare;
				squareToCheck <= ChessSquare.D8;
				squareToCheck++
			) {
				if (pieces[squareToCheck] !== undefined) {
					return false
				}
			}
			return true
		}

		return false
	}

	if (targetPiece?.colour === sideToMove) {
		return false
	}

	if (movingPiece.type === ChessPieceType.KNIGHT) {
		pieces[originSquare] = undefined
		pieces[targetSquare] = movingPiece
		const pass = squareUnderAttack(king, pieces, opponentColour)
		pieces[targetSquare] = targetPiece
		pieces[originSquare] = movingPiece

		return pass
	}

	if (movingPiece.type === ChessPieceType.PAWN) {
		if (originFile === targetFile) {
			if (targetPiece !== undefined) {
				return false
			}

			if (sideToMove === ChessColour.WHITE) {
				switch (targetRank - originRank) {
					case 2:
						if (
							originRank !== 1 ||
							pieces[((targetRank - 1) * 8 + targetFile) as ChessSquare] !== undefined
						) {
							return false
						}
						break
					case 1:
						break
					default:
						return false
				}
			} else {
				switch (originRank - targetRank) {
					case 2:
						if (
							originRank !== 6 ||
							pieces[((targetRank + 1) * 8 + targetFile) as ChessSquare] !== undefined
						) {
							return false
						}
						break
					case 1:
						break
					default:
						return false
				}
			}

			pieces[originSquare] = undefined
			pieces[targetSquare] = movingPiece
			const pass = squareUnderAttack(king, pieces, opponentColour)
			pieces[targetSquare] = targetPiece
			pieces[originSquare] = movingPiece

			return pass
		}

		if (sideToMove === ChessColour.WHITE) {
			if (targetRank - originRank !== 1 || Math.abs(targetFile - originFile) !== 1) {
				return false
			}
		} else if (originRank - targetRank !== 1 || Math.abs(targetFile - originFile) !== 1) {
			return false
		}

		if (targetSquare === enPassantTarget) {
			if (targetPiece !== undefined) {
				return false
			}
			const enPassantedSquare = (originRank * 8 + targetFile) as ChessSquare
			const enPassantedPiece = position.pieces[enPassantedSquare]
			if (
				enPassantedPiece?.colour !== opponentColour ||
				enPassantedPiece?.type !== ChessPieceType.PAWN
			) {
				return false
			}

			pieces[originSquare] = undefined
			pieces[targetSquare] = movingPiece
			pieces[enPassantedSquare] = undefined
			const pass = squareUnderAttack(king, pieces, opponentColour)
			pieces[enPassantedSquare] = enPassantedPiece
			pieces[targetSquare] = targetPiece
			pieces[originSquare] = movingPiece
			return pass
		}

		if (targetPiece?.colour !== opponentColour) {
			return false
		}

		pieces[originSquare] = undefined
		pieces[targetSquare] = movingPiece
		const pass = squareUnderAttack(king, pieces, opponentColour)
		pieces[targetSquare] = targetPiece
		pieces[originSquare] = movingPiece
		return pass
	}

	if (originFile === targetFile) {
		if (movingPiece.type === ChessPieceType.BISHOP) {
			return false
		}

		const increment = originRank > targetRank ? -1 : 1
		for (let yy = originRank + increment; yy !== targetRank; yy += increment) {
			if (pieces[(yy * 8 + targetFile) as ChessSquare] !== undefined) {
				return false
			}
		}
	} else if (originRank === targetRank) {
		if (movingPiece.type === ChessPieceType.BISHOP) {
			return false
		}

		const increment = originFile > targetFile ? -1 : 1
		for (let xx = originFile + increment; xx !== targetFile; xx += increment) {
			if (pieces[(targetRank * 8 + xx) as ChessSquare] !== undefined) {
				return false
			}
		}
	} else {
		if (movingPiece.type === ChessPieceType.ROOK) {
			return false
		}
		if (Math.abs(targetRank - originRank) !== Math.abs(targetFile - originFile)) {
			return false
		}

		const incrementX = originFile > targetFile ? -1 : 1
		const incrementY = originRank > targetRank ? -1 : 1
		for (
			let xx = originFile + incrementX, yy = originRank + incrementY;
			yy !== targetRank;
			xx += incrementX, yy += incrementY
		) {
			if (pieces[(yy * 8 + xx) as ChessSquare] !== undefined) {
				return false
			}
		}
	}

	pieces[originSquare] = undefined
	pieces[targetSquare] = movingPiece
	const pass = squareUnderAttack(king, pieces, opponentColour)
	pieces[targetSquare] = targetPiece
	pieces[originSquare] = movingPiece

	return pass
}
