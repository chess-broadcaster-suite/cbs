import type { ChessTitle } from '#enums/chess-title.enum'

export interface ChessPlayer {
	fideId?: number
	name: string
	rating?: number
	title?: ChessTitle
}
