import { ChessColour } from '#enums/chess-colour.enum'
import { ChessPieceType } from '#variants/fischer/enums/chess-piece-type.enum'
import { parsePieces } from '#variants/fischer/utils/parse-pieces.util'

describe(parsePieces, () => {
	it('parses subfen to pieces', () => {
		expect(parsePieces('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')).toMatchObject({
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
		})

		expect(parsePieces('r1b1nnk1/1p2qppp/p1p5/3p4/2PP4/1PQ1PB2/P2N3P/2K2R1R')).toMatchObject({
			'2': { type: ChessPieceType.KING, colour: ChessColour.WHITE },
			'5': { type: ChessPieceType.ROOK, colour: ChessColour.WHITE },
			'7': { type: ChessPieceType.ROOK, colour: ChessColour.WHITE },
			'8': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
			'11': { type: ChessPieceType.KNIGHT, colour: ChessColour.WHITE },
			'15': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
			'17': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
			'18': { type: ChessPieceType.QUEEN, colour: ChessColour.WHITE },
			'20': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
			'21': { type: ChessPieceType.BISHOP, colour: ChessColour.WHITE },
			'26': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
			'27': { type: ChessPieceType.PAWN, colour: ChessColour.WHITE },
			'35': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
			'40': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
			'42': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
			'49': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
			'52': { type: ChessPieceType.QUEEN, colour: ChessColour.BLACK },
			'53': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
			'54': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
			'55': { type: ChessPieceType.PAWN, colour: ChessColour.BLACK },
			'56': { type: ChessPieceType.ROOK, colour: ChessColour.BLACK },
			'58': { type: ChessPieceType.BISHOP, colour: ChessColour.BLACK },
			'60': { type: ChessPieceType.KNIGHT, colour: ChessColour.BLACK },
			'61': { type: ChessPieceType.KNIGHT, colour: ChessColour.BLACK },
			'62': { type: ChessPieceType.KING, colour: ChessColour.BLACK },
		})
	})

	it('returns null if there are not 8 lines of 8 pieces each', () => {
		expect(parsePieces('')).toBe(null)
		expect(parsePieces('r1bqk2r/1p1nppp/p1pb1n2/3p4/2PPp3/1PN1P3/PBQNBPPP/R3K2R')).toBe(null)
		expect(parsePieces('r1bqk2r/1p1n1ppp/p1pb1n2/3p4/2PPp3/1PN1P3/PBQNBPPP/R3K2R/KK')).toBe(null)
	})
})
