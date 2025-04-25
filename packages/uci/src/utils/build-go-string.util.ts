import { GoUCIParams } from '#types/uci.types'

/**
 * Builds go UCI command
 *
 * @param params.binc black increment in ms
 * @param params.btime remaining black time in ms
 * @param params.depth target depth
 * @param params.infinite allow infinite search
 * @param params.mate search for mate in N
 * @param params.movestogo moves remaining till time control
 * @param params.movetime search for N ms
 * @param params.nodes search for N nodes
 * @param params.ponder allow ponder mode
 * @param params.searchmoves consider following UCI moves
 * @param params.winc white increment in ms
 * @param params.wtime remaining white time in ms
 * @returns go string
 */
export function buildGoString({
	binc,
	btime,
	depth,
	infinite,
	mate,
	movestogo,
	movetime,
	nodes,
	ponder,
	searchmoves,
	winc,
	wtime,
}: Omit<GoUCIParams, 'callback' | 'sync'>): string {
	let result = `go`

	if (searchmoves !== undefined && searchmoves.length > 0) {
		result += ` searchmoves`
		for (const searchmove of searchmoves) {
			result += ` ${searchmove}`
		}
	}
	if (ponder !== undefined) {
		result += ' ponder'
	}
	if (wtime !== undefined) {
		result += ` wtime ${wtime}`
	}
	if (btime !== undefined) {
		result += ` btime ${btime}`
	}
	if (winc !== undefined) {
		result += ` winc ${winc}`
	}
	if (binc !== undefined) {
		result += ` binc ${binc}`
	}
	if (movestogo !== undefined) {
		result += ` movestogo ${movestogo}`
	}
	if (mate !== undefined) {
		result += ` mate ${mate}`
	}
	if (depth !== undefined) {
		result += ` depth ${depth}`
	}
	if (nodes !== undefined) {
		result += ` nodes ${nodes}`
	}
	if (movetime !== undefined) {
		result += ` movetime ${movetime}`
	}
	if (infinite) {
		result += ` infinite`
	}

	return result
}
