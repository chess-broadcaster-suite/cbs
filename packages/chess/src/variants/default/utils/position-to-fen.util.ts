import type { ChessPosition } from '#variants/default/types/chess-position.type'

export function positionToFen(position: ChessPosition): string {
	const pieces = position.pieces
}

function piecesToString(pieces: Record<ChessSquare, ChessPiece | undefined>): string {
	let result = ""
	let emptyCount = 0


}
