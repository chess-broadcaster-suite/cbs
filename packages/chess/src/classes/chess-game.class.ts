import { SomeChessGraph } from '#classes/chess-graph.class'
import { GameResult } from '#enums/game-result.enum'
import { ChessArbiterInterface } from '#interfaces/chess-arbiter.interface'
import { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import { ChessPlayer } from '#interfaces/chess-player.interface'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'

export class ChessGame<
	P extends ChessPositionInterface,
	D extends ChessMoveDescriptorInterface,
	A extends ChessArbiterInterface,
> extends SomeChessGraph<P, D> {
	protected arbiter: A
	protected root: P

	protected white: ChessPlayer
	protected black: ChessPlayer
	protected result: GameResult

	public constructor({
		arbiter,
		root,
		white,
		black,
		result,
	}: {
		arbiter: A
		root: P
		white: ChessPlayer
		black: ChessPlayer
		result: GameResult
	}) {
		super()
		this.white = white
		this.black = black
		this.result = result
		this.arbiter = arbiter
		this.root = root

		this.addVertex(root)
	}

	public
}
