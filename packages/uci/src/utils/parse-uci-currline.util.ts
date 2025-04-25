import { UCICurrline } from '#types/uci.types'

/**
 * Parse UCICurrline with optional cpunr parameter
 *
 * @param raw uci line substring
 * @returns UCICurrline object
 */
export function parseUCICurrline(raw: string): UCICurrline {
	const bits = raw.split(/\s+/)

	if (bits.length === 0) {
		return {
			moves: [],
		}
	}
	const cpunr = parseInt(bits[0])
	if (isNaN(cpunr)) {
		return {
			moves: bits,
		}
	}

	return {
		cpunr,
		moves: bits.slice(1),
	}
}
