import { ChessMoveInterface } from '#interfaces/chess-move.interface'
import { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'

export interface ChessArbiterInterface<
	P extends ChessPositionInterface,
	M extends ChessMoveInterface,
> {
	describeMove(origin: P, target: P): ChessMoveDescriptorInterface<M> | null
	describePosition(position: P): string
	getLegalMoves(position: P): Array<M>
	isLegalMove(move: M, position: P): boolean
	isLegalPosition(position: P): boolean
	makeAMove(move: ChessMoveInterface, position: P): P | null
	reconstruct(description: string): P | null
}
