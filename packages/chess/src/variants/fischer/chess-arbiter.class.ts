import type { ChessArbiterInterface } from '#interfaces/chess-arbiter.interface'
import type { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import type { ChessMove } from '#variants/fischer/types/chess-move.type'
import type { ChessPosition } from '#variants/fischer/types/chess-position.type'

import { describeLegalMove } from '#variants/fischer/utils/describe-legal-move.util'
import { findAMove } from '#variants/fischer/utils/find-a-move.util'
import { getLegalMoves } from '#variants/fischer/utils/get-legal.moves'
import { isIdenticalPosition } from '#variants/fischer/utils/is-identical-position.util'
import { isLegalMove } from '#variants/fischer/utils/is-legal-move.util'
import { isLegalPosition } from '#variants/fischer/utils/is-legal-position.util'
import { makeALegalMove } from '#variants/fischer/utils/make-a-legal-move.util'
import { parsePosition } from '#variants/fischer/utils/parse-position.util'
import { positionToFen } from '#variants/fischer/utils/position-to-fen.util'

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
