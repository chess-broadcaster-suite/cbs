import { ChessSquare } from '#enums/chess-square.enum'
import { fileToString } from '#utils/file-to-string.util'
import { rankToString } from '#utils/rank-to-string.util'
import { squareToCoordinates } from '#utils/square-to-coordinates.util'

export function squareToString(square: ChessSquare): string {
	const coordinates = squareToCoordinates(square)

	return fileToString(coordinates.file) + rankToString(coordinates.rank)
}
