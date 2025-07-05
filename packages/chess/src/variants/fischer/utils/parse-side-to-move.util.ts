import { ChessColour } from '#enums/chess-colour.enum'

export function parseSideToMove(subfen: string): ChessColour | null {
	const trimmed = subfen.trim()

	switch (trimmed[0]?.toLowerCase()) {
		case 'w':
			return ChessColour.WHITE
		case 'b':
			return ChessColour.BLACK
		default:
			return null
	}
}
