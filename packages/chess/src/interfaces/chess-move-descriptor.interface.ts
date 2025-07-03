import { ChessMoveInterface } from '#interfaces/chess-move.interface'

export interface ChessMoveDescriptorInterface<M extends ChessMoveInterface> {
	move: M
	san: string
	uci: string
}
