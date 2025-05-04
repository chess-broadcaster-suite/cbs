import { ChessFile } from '#enums/chess-file.enum'

export function parseFile(string: string): ChessFile | null {
	if (string.length < 1) {
		return null
	}

	switch (string[0].toUpperCase()) {
		case 'A':
			return ChessFile.A
		case 'B':
			return ChessFile.B
		case 'C':
			return ChessFile.C
		case 'D':
			return ChessFile.D
		case 'E':
			return ChessFile.E
		case 'F':
			return ChessFile.F
		case 'G':
			return ChessFile.G
		case 'H':
			return ChessFile.H
		default:
			return null
	}
}
