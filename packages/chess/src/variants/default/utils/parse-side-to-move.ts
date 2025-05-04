import { ChessColour } from '#enums/chess-colour.enum'

export function parseSideToMove(subfen: string): ChessColour | null {
	if (subfen.length < 1) {
		return null
	}
	switch (subfen[0]) {
		case 'w':
			return ChessColour.WHITE
		case 'b':
			return ChessColour.BLACK
		default:
			return null
	}
}
