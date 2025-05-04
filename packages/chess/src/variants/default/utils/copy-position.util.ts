import { ChessPosition } from '#variants/default/types/chess-position.type'
import { PositionHistory } from '#variants/default/types/position-history.type'

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
