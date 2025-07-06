import { ChessColour } from '#enums/chess-colour.enum'
import { ChessSquare } from '#enums/chess-square.enum'
import { findPiece } from '#utils/find-piece.util'

describe(findPiece, () => {
	it('gets the first index as a chess square given a record of chess pieces', () => {
		expect(
			findPiece(
				{
					type: 0,
					colour: ChessColour.WHITE,
				},
				{
					'10': {
						type: 0,
						colour: ChessColour.WHITE,
					},
				},
			),
		).toBe(ChessSquare.C2)
	})

	it('respects type and colour', () => {
		expect(
			findPiece(
				{
					type: 2,
					colour: ChessColour.BLACK,
				},
				{
					'10': {
						type: 0,
						colour: ChessColour.WHITE,
					},
					'12': {
						type: 2,
						colour: ChessColour.WHITE,
					},
					'21': {
						type: 4,
						colour: ChessColour.BLACK,
					},
					'25': {
						type: 2,
						colour: ChessColour.BLACK,
					},
				},
			),
		).toBe(ChessSquare.B4)
	})

	it('returns undefined in case of no match', () => {
		expect(findPiece({ type: 5, colour: ChessColour.WHITE }, {})).toBe(undefined)
	})

	it('returns the first index in order of chess squares in case of multiple matches', () => {
		expect(
			findPiece(
				{ type: 4, colour: ChessColour.BLACK },
				{
					'30': { type: 4, colour: ChessColour.BLACK },
					'4': { type: 4, colour: ChessColour.BLACK },
				},
			),
		).toBe(ChessSquare.E1)
	})
})
