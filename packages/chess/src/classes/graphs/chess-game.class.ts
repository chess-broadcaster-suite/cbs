import { ChessGraph } from '#classes/graphs/chess-graph.class'
import { GameResult } from '#enums/game-result.enum'
import { ChessArbiterInterface } from '#interfaces/chess-arbiter.interface'
import { ChessGraphNode } from '#interfaces/chess-graph.interfaces'
import { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import { ChessPlayer } from '#interfaces/chess-player.interface'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'
import { ChessPosition } from '#variants/default/types/chess-position.type'

export class ChessGame<
	P extends ChessPositionInterface,
	D extends ChessMoveDescriptorInterface,
	A extends ChessArbiterInterface,
> extends ChessGraph<P, D> {
	protected arbiter: A
	protected root: P

	protected white: ChessPlayer
	protected black: ChessPlayer
	protected result: GameResult

	public constructor({
		arbiter,
		black,
		result,
		root,
		white,
	}: {
		arbiter: A
		black: ChessPlayer
		result: GameResult
		root: P
		white: ChessPlayer
	}) {
		super()
		this.white = white
		this.black = black
		this.result = result
		this.arbiter = arbiter
		this.root = root

		this.addNode(root)
	}

	protected canAddEdge({ origin, target, }: { origin: ChessGraphNode<P>; target: ChessGraphNode<P> }): boolean {
		return super.canAddEdge({origin, target}) && !this.isChildOf({parent: origin, child: target})
	}

	public appendVariation(parentNode: ChessGraphNode<P>, position: ChessPosition): ChessGraphNode<P> | undefined {
		let children = this.adjacencyMap.get(parentNode)
		if (!children) {
			children = new Set()
			this.adjacencyMap.set(parentNode, children)
		}

		children.add({
			node:
		})
	}

	public addMainline(parentNode: ChessGraphNode<P>, position: ChessPosition): ChessGraphNode<P> {
		const children = this.adjacencyMap.get(parentNode)

	}

	public promoteVariation(
		node: ChessGraphNode<P>,
		oldVariationIndex: number,
		newVariationIndex: number,
	): void {}

	public makeMainline(node: ChessGraphNode<P>, variationIndex: number): void {}

	public deleteVariation(node: ChessGraphNode<P>, variationIndex: number): boolean {}

	public deleteMainline(node: ChessGraphNode<P>): void {}
}
