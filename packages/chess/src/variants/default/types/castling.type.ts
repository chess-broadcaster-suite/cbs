import type { ChessSquare } from '#enums/chess-square.enum'

export type Castling = {
	blackK?:
		| ChessSquare.C8
		| ChessSquare.D8
		| ChessSquare.E8
		| ChessSquare.F8
		| ChessSquare.G8
		| ChessSquare.H8

	blackQ?:
		| ChessSquare.A8
		| ChessSquare.B8
		| ChessSquare.C8
		| ChessSquare.D8
		| ChessSquare.E8
		| ChessSquare.F8

	whiteK?:
		| ChessSquare.C1
		| ChessSquare.D1
		| ChessSquare.E1
		| ChessSquare.F1
		| ChessSquare.G1
		| ChessSquare.H1

	whiteQ?:
		| ChessSquare.A1
		| ChessSquare.B1
		| ChessSquare.C1
		| ChessSquare.D1
		| ChessSquare.E1
		| ChessSquare.F1
}
