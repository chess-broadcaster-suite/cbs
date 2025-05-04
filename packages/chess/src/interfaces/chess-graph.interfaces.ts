import { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'

export interface ChessGraphVertex<P extends ChessPositionInterface> {
	id: string
	position: P
}
export interface ChessGraphEdge<D extends ChessMoveDescriptorInterface> {
	descriptor?: D
	id: string
	weight: number
}
