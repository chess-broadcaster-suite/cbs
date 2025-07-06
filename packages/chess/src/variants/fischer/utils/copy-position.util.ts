import type { ChessPosition } from '#variants/fischer/types/chess-position.type'
import type { PositionHistory } from '#variants/fischer/types/position-history.type'

export function copyPosition(position: ChessPosition): ChessPosition {
	return {
		...position,
		history: copyHistory(position.history),
		pieces: { ...position.pieces },
	}
}

function copyHistory(history: PositionHistory): PositionHistory {
	return {
		...history,
		castling: { ...history.castling },
	}
}
