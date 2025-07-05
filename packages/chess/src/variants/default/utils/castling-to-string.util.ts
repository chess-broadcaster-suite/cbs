import type { Castling } from '#variants/default/types/castling.type'

import { fileToString } from '#utils/file-to-string.util'

export function castlingToString(castling: Castling): string {
	let result = ''

	if (castling.whiteK) {
		result += fileToString(castling.whiteK % 8).toUpperCase()
	}
	if (castling.whiteQ) {
		result += fileToString(castling.whiteQ % 8).toUpperCase()
	}
	if (castling.blackK) {
		result += fileToString(castling.blackK % 8)
	}
	if (castling.blackQ) {
		result += fileToString(castling.blackQ % 8)
	}

	return result.length > 0 ? result : '-'
}
