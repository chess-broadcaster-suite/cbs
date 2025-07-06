import type { ChessPosition } from '#variants/fischer/types/chess-position.type'

import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { copyPosition } from '#variants/fischer/utils/copy-position.util'

describe(copyPosition, () => {
	it('creates a deep copy of the original position', () => {
		const position: ChessPosition = {
			pieces: {
				'0': { type: ChessPieceType.ROOK, colour: ChessColour.WHITE },
				'1': { type: ChessPieceType.KNIGHT, colour: ChessColour.WHITE },
				'2': { type: ChessPieceType.BISHOP, colour: ChessColour.WHITE },
				'3': { type: ChessPieceType.QUEEN, colour: ChessColour.WHITE },
				'4': { type: ChessPieceType.KING, colour: ChessColour.WHITE },
				'5': { type: ChessPieceType.BISHOP, colour: ChessColour.WHITE },
				'6': { type: ChessPieceType.KNIGHT, colour: ChessColour.WHITE },
				'7': { type: ChessPieceType.ROOK, colour: ChessColour.WHITE },
				'8': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
				'9': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
				'10': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
				'11': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
				'12': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
				'13': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
				'14': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
				'15': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
				'48': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
				'49': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
				'50': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
				'51': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
				'52': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
				'53': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
				'54': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
				'55': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
				'56': { type: ChessPieceType.ROOK, colour: ChessColour.BLACK },
				'57': { type: ChessPieceType.KNIGHT, colour: ChessColour.BLACK },
				'58': { type: ChessPieceType.BISHOP, colour: ChessColour.BLACK },
				'59': { type: ChessPieceType.QUEEN, colour: ChessColour.BLACK },
				'60': { type: ChessPieceType.KING, colour: ChessColour.BLACK },
				'61': { type: ChessPieceType.BISHOP, colour: ChessColour.BLACK },
				'62': { type: ChessPieceType.KNIGHT, colour: ChessColour.BLACK },
				'63': { type: ChessPieceType.ROOK, colour: ChessColour.BLACK },
			},
			sideToMove: ChessColour.WHITE,
			history: {
				castling: {
					whiteK: ChessSquare.H1,
					whiteQ: ChessSquare.A1,
					blackK: ChessSquare.H8,
					blackQ: ChessSquare.A8,
				},
				fullMoveNumber: 1,
				halfMoveClock: 0,
			},
			whiteKing: ChessSquare.E1,
			blackKing: ChessSquare.E8,
		}
		const copy = copyPosition(position)

		expect(position).not.toBe(copy)
		expect(position.pieces).not.toBe(copy.pieces)
		expect(position.pieces).toMatchObject(copy.pieces)
		expect(position.sideToMove).toBe(copy.sideToMove)
		expect(position.whiteKing).toBe(copy.whiteKing)
		expect(position.blackKing).toBe(copy.blackKing)

		expect(position.history).not.toBe(copy.history)
		expect(position.history.castling).not.toBe(copy.history.castling)
		expect(position.history.castling).toMatchObject(copy.history.castling)
		expect(position.history.halfMoveClock).toBe(copy.history.halfMoveClock)
		expect(position.history.fullMoveNumber).toBe(copy.history.fullMoveNumber)
	})
})
