import { ChessArbiterInterface } from '#interfaces/chess-arbiter.interface'
import { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import { positionToFen } from '#utils/position-to-fen.util'
import { ChessMove } from '#variants/default/types/chess-move.type'
import { ChessPosition } from '#variants/default/types/chess-position.type'
import { getLegalMoves } from '#variants/default/utils/get-legal.moves'
import { isLegalMove } from '#variants/default/utils/is-legal-move.util'
import { isLegalPosition } from '#variants/default/utils/is-legal-position.util'
import { makeALegalMove } from '#variants/default/utils/make-a-legal-move.util'
import { parsePosition } from '#variants/default/utils/parse-position.util'

class ChessArbiter implements ChessArbiterInterface<ChessPosition, ChessMove> {
	public describeMove(
		origin: ChessPosition,
		target: ChessPosition,
	): ChessMoveDescriptorInterface<ChessMove> | null {
		throw new Error('Method not implemented.')
	}

	public describePosition(position: ChessPosition): string {
		throw new Error('Method not implemented.')
	}

	public describe(position: ChessPosition): string {
		return positionToFen(position)
	}

	public isLegalMove(move: ChessMove, position: ChessPosition): boolean {
		return isLegalMove(move, position)
	}

	public isLegalPosition(position: ChessPosition): boolean {
		return isLegalPosition(position)
	}

	public getLegalMoves(position: ChessPosition): Array<ChessMove> {
		return getLegalMoves(position)
	}

	public makeAMove(move: ChessMove, position: ChessPosition): ChessPosition | null {
		if (!isLegalMove(move, position)) {
			return null
		}

		return makeALegalMove(move, position)
	}

	public reconstruct(description: string): ChessPosition | null {
		return parsePosition(description)
	}
}

const arbiter = new ChessArbiter()
export { arbiter as ChessArbiter }
