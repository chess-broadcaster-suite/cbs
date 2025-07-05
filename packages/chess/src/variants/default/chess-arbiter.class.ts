import { ChessArbiterInterface } from '#interfaces/chess-arbiter.interface'
import { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import { ChessMove } from '#variants/default/types/chess-move.type'
import { ChessPosition } from '#variants/default/types/chess-position.type'
import { describeLegalMove } from '#variants/default/utils/describe-legal-move.util'
import { findAMove } from '#variants/default/utils/find-a-move.util'
import { getLegalMoves } from '#variants/default/utils/get-legal.moves'
import { isIdenticalPosition } from '#variants/default/utils/is-identical-position.util'
import { isLegalMove } from '#variants/default/utils/is-legal-move.util'
import { isLegalPosition } from '#variants/default/utils/is-legal-position.util'
import { makeALegalMove } from '#variants/default/utils/make-a-legal-move.util'
import { parsePosition } from '#variants/default/utils/parse-position.util'
import { positionToFen } from '#variants/default/utils/position-to-fen.util'

class ChessArbiter implements ChessArbiterInterface<ChessPosition, ChessMove> {
	public isIdenticalPosition(position: ChessPosition, anotherPosition: ChessPosition): boolean {
		return isIdenticalPosition(position, anotherPosition)
	}
	public findAMove(originPosition: ChessPosition, targetPosition: ChessPosition): ChessMove | null {
		return findAMove(originPosition, targetPosition)
	}
	public describeMove(
		move: ChessMove,
		originPosition: ChessPosition,
	): ChessMoveDescriptorInterface<ChessMove> | null {
		if (!isLegalMove(move, originPosition)) {
			return null
		}

		return describeLegalMove(move, originPosition)
	}

	public describePosition(position: ChessPosition): string {
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
