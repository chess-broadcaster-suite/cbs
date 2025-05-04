import { ChessMoveInterface } from '#interfaces/chess-move.interface'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'

export interface ChessArbiterInterface {
	describe(position: ChessPositionInterface): string
	getLegalMoves(position: ChessPositionInterface): Array<ChessMoveInterface>
	isLegalMove(move: ChessMoveInterface, position: ChessPositionInterface): boolean
	isLegalPosition(position: ChessPositionInterface): boolean
	makeAMove(
		move: ChessMoveInterface,
		position: ChessPositionInterface,
	): ChessPositionInterface | null
	reconstruct(description: string): ChessPositionInterface | null
}
