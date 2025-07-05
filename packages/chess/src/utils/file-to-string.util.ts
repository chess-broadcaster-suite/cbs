import { ChessFile } from '#enums/chess-file.enum'

export function fileToString(file: ChessFile): string {
	switch (file) {
		case ChessFile.A:
			return 'a'
		case ChessFile.B:
			return 'b'
		case ChessFile.C:
			return 'c'
		case ChessFile.D:
			return 'd'
		case ChessFile.E:
			return 'e'
		case ChessFile.F:
			return 'f'
		case ChessFile.G:
			return 'g'
		default:
			return 'h'
	}
}
