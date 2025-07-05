import { ChessSquare } from '#enums/chess-square.enum'
import { ChessPiece } from '#variants/default/types/chess-piece.type'
import { parsePiece } from '#variants/default/utils/parse-piece.util'

export function parsePieces(subfen: string): Record<ChessSquare, ChessPiece | undefined> | null {
	const bits = subfen.split('/')
	if (bits.length !== 8) {
		return null
	}

	const result: Record<ChessSquare, ChessPiece | undefined> = {} as Record<ChessSquare, ChessPiece>
	for (let y = 0; y < 8; y++) {
		let pieceCount = 0
		const bit = bits[y]

		for (const ch of bit) {
			if (pieceCount > 8) {
				return null
			}
			switch (ch) {
				case 'K':
				case 'Q':
				case 'R':
				case 'B':
				case 'N':
				case 'P':
				case 'k':
				case 'q':
				case 'r':
				case 'b':
				case 'n':
				case 'p':
					result[(63 - y * 8 - pieceCount) as ChessSquare] = parsePiece(ch)!
					pieceCount += 1
					continue
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
					const numb = parseInt(ch)
					for (let i = 0; i < numb; i++) {
						result[(63 - y * 8 - pieceCount) as ChessSquare] = undefined
						pieceCount += 1
						continue
					}
					continue
				default:
					return null
			}
		}

		if (pieceCount !== 8) {
			return null
		}
	}

	return result
}
