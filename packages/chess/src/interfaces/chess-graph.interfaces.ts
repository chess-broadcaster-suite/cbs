import { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'

export interface ChessGraphNode<P extends ChessPositionInterface> {
	id: string
	position: P
}

export interface ChessGraphAdjacencyItem<
	P extends ChessPositionInterface,
	D extends ChessMoveDescriptorInterface,
> {
	descriptor?: D
	node: ChessGraphNode<P>
	weight: number
}
