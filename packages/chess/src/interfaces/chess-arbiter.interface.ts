import type { ChessMoveInterface } from '#interfaces/chess-move.interface'
import type { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import type { ChessPositionInterface } from '#interfaces/chess-position.interface'

export interface ChessArbiterInterface<
	P extends ChessPositionInterface,
	M extends ChessMoveInterface,
> {
	describeMove(move: M, originPosition: P): ChessMoveDescriptorInterface<M> | null
	describePosition(position: P): string
	findAMove(originPosition: P, targetPosition: P): M | null
	getLegalMoves(position: P): Array<M>
	isLegalMove(move: M, position: P): boolean
	isLegalPosition(position: P): boolean
	isIdenticalPosition(position: P, anotherPosition: P): boolean
	makeAMove(move: ChessMoveInterface, position: P): P | null
	reconstruct(description: string): P | null
}
