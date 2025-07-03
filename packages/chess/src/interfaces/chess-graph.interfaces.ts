import { ChessMoveInterface } from '#interfaces/chess-move.interface'
import { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'

export interface ChessGraphNode<P extends ChessPositionInterface> {
	id: string
	position: P
}

export interface ChessGraphAdjacencyItem<
	P extends ChessPositionInterface,
	M extends ChessMoveInterface,
> {
	descriptor: ChessMoveDescriptorInterface<M> | null
	node: ChessGraphNode<P>
	weight: number
}
