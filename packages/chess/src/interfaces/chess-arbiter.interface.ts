import { ChessMoveInterface } from '#interfaces/chess-move.interface'
import { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'

export interface ChessArbiterInterface {
	describeMove(
		origin: ChessPositionInterface,
		target: ChessPositionInterface,
	): ChessMoveDescriptorInterface | undefined
	describePosition(position: ChessPositionInterface): string
	getLegalMoves(position: ChessPositionInterface): Array<ChessMoveInterface>
	isLegalMove(move: ChessMoveInterface, position: ChessPositionInterface): boolean
	isLegalPosition(position: ChessPositionInterface): boolean
	makeAMove(
		move: ChessMoveInterface,
		position: ChessPositionInterface,
	): ChessPositionInterface | null
	reconstruct(description: string): ChessPositionInterface | null
}
