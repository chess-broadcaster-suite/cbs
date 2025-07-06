import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { parsePosition } from '#variants/fischer/utils/parse-position.util'

describe(parsePosition, () => {
	it('parses FEN into a chess position representation', () => {
		expect(parsePosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')).toMatchObject(
			{
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
			},
		)
	})

	it('supports fischer random', () => {
		expect(
			parsePosition('bq1krb2/p4ppQ/1p1p1pn1/2r5/1pP5/4PN2/P2PBPPP/2RKR2N w ECe - 2 9'),
		).toMatchObject({
			pieces: {
				'2': {
					type: ChessPieceType.ROOK,
					colour: ChessColour.WHITE,
				},
				'3': {
					type: ChessPieceType.KING,
					colour: ChessColour.WHITE,
				},
				'4': {
					type: ChessPieceType.ROOK,
					colour: ChessColour.WHITE,
				},
				'7': {
					type: ChessPieceType.KNIGHT,
					colour: ChessColour.WHITE,
				},
				'8': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.WHITE,
				},
				'11': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.WHITE,
				},
				'12': {
					type: ChessPieceType.BISHOP,
					colour: ChessColour.WHITE,
				},
				'13': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.WHITE,
				},
				'14': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.WHITE,
				},
				'15': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.WHITE,
				},
				'20': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.WHITE,
				},
				'21': {
					type: ChessPieceType.KNIGHT,
					colour: ChessColour.WHITE,
				},
				'25': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.BLACK,
				},
				'26': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.WHITE,
				},
				'34': {
					type: ChessPieceType.ROOK,
					colour: ChessColour.BLACK,
				},
				'41': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.BLACK,
				},
				'43': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.BLACK,
				},
				'45': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.BLACK,
				},
				'46': {
					type: ChessPieceType.KNIGHT,
					colour: ChessColour.BLACK,
				},
				'48': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.BLACK,
				},
				'53': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.BLACK,
				},
				'54': {
					type: ChessPieceType.PAWN,
					colour: ChessColour.BLACK,
				},
				'55': {
					type: ChessPieceType.QUEEN,
					colour: ChessColour.WHITE,
				},
				'56': {
					type: ChessPieceType.BISHOP,
					colour: ChessColour.BLACK,
				},
				'57': {
					type: ChessPieceType.QUEEN,
					colour: ChessColour.BLACK,
				},
				'59': {
					type: ChessPieceType.KING,
					colour: ChessColour.BLACK,
				},
				'60': {
					type: ChessPieceType.ROOK,
					colour: ChessColour.BLACK,
				},
				'61': {
					type: ChessPieceType.BISHOP,
					colour: ChessColour.BLACK,
				},
			},
			sideToMove: ChessColour.WHITE,
			history: {
				castling: {
					whiteK: ChessSquare.E1,
					whiteQ: ChessSquare.C1,
					blackK: ChessSquare.E8,
				},
				fullMoveNumber: 9,
				halfMoveClock: 2,
			},
			whiteKing: ChessSquare.D1,
			blackKing: ChessSquare.D8,
		})
	})

	it('infers missing trailing subfen bits', () => {
		expect(parsePosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq')).toMatchObject({
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
		})
	})

	it('returns null on invalid/illegal position', () => {
		expect(parsePosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/KNBQKBNR w KQkq - 0 1')).toBe(null)
		expect(parsePosition('bq1krb2/p4ppQ/1p1p1pn1/2r5/1pP5/4PN2/P2PBPPP/2RKR2N w ECf - 2 9')).toBe(
			null,
		)
	})
})
