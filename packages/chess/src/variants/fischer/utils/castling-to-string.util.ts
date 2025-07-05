import type { Castling } from '#variants/fischer/types/castling.type'

import { fileToString } from '#utils/file-to-string.util'

export function castlingToString(castling: Castling): string {
	let result = ''

	if (castling.whiteK !== undefined) {
		result += fileToString(castling.whiteK % 8).toUpperCase()
	}
	if (castling.whiteQ !== undefined) {
		result += fileToString(castling.whiteQ % 8).toUpperCase()
	}
	if (castling.blackK !== undefined) {
		result += fileToString(castling.blackK % 8)
	}
	if (castling.blackQ !== undefined) {
		result += fileToString(castling.blackQ % 8)
	}

	return result.length > 0 ? result : '-'
}
