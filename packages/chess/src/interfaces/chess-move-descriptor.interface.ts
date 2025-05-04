import { ChessMoveInterface } from '#interfaces/chess-move.interface'

export interface ChessMoveDescriptorInterface {
	move: ChessMoveInterface
	san: string
	uci: string
}
