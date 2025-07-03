import { ChessGraph } from '#classes/graphs/chess-graph.class'
import { GameResult } from '#enums/game-result.enum'
import { ChessArbiterInterface } from '#interfaces/chess-arbiter.interface'
import { ChessGraphNode } from '#interfaces/chess-graph.interfaces'
import { ChessMoveInterface } from '#interfaces/chess-move.interface'
import { ChessPlayer } from '#interfaces/chess-player.interface'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'
import { randomUUID } from 'crypto'

// tree with a single root
export class ChessGame<
	P extends ChessPositionInterface,
	M extends ChessMoveInterface,
	A extends ChessArbiterInterface<P, M>,
> extends ChessGraph<P, M> {
	protected arbiter: A
	protected root: ChessGraphNode<P>

	protected white: ChessPlayer
	protected black: ChessPlayer
	protected result: GameResult

	public constructor({
		arbiter,
		black,
		result,
		rootPosition,
		white,
	}: {
		arbiter: A
		black: ChessPlayer
		result: GameResult
		rootPosition: P
		white: ChessPlayer
	}) {
		super()
		this.white = white
		this.black = black
		this.result = result
		this.arbiter = arbiter
		this.root = this.addNode(rootPosition)
	}

	public addMainline(parentNode: ChessGraphNode<P>, position: P): ChessGraphNode<P> {
		let children = this.adjacencyMap.get(parentNode)
		if (!children) {
			children = new Set()
			this.adjacencyMap.set(parentNode, children)
		}

		const node: ChessGraphNode<P> = {
			id: randomUUID(),
			position,
		}
		const descriptor = this.arbiter.describeMove(parentNode.position, position)
		const weight = 0

		children.values().forEach((child) => (child.weight += 1))
		children.add({
			node,
			descriptor,
			weight,
		})

		return node
	}

	public appendVariation(
		parentNode: ChessGraphNode<P>,
		position: P,
	): ChessGraphNode<P> | undefined {
		let children = this.adjacencyMap.get(parentNode)
		if (!children) {
			children = new Set()
			this.adjacencyMap.set(parentNode, children)
		}

		const node: ChessGraphNode<P> = {
			id: randomUUID(),
			position,
		}
		const descriptor = this.arbiter.describeMove(parentNode.position, position)
		const weight = children.size

		children.add({
			node,
			descriptor,
			weight,
		})

		return node
	}

	public promoteVariation(
		parentNode: ChessGraphNode<P>,
		promotedNode: ChessGraphNode<P>,
	): number | null {
		const children = this.adjacencyMap.get(parentNode)
		if (!children) {
			return null
		}

		const item = children.values().find((item) => item.node === promotedNode)
		if (!item) {
			return null
		}

		if (item.weight === 0) {
			return 0
		}

		children.values().forEach((value) => {
			if (value.weight === item.weight - 1) {
				value.weight += 1
			}
		})
		item.weight -= 1

		return item.weight
	}

	public demoteVariation(
		parentNode: ChessGraphNode<P>,
		demotedNode: ChessGraphNode<P>,
	): number | null {
		const children = this.adjacencyMap.get(parentNode)
		if (!children) {
			return null
		}

		const item = children.values().find((item) => item.node === demotedNode)
		if (!item) {
			return null
		}

		if (item.weight === children.size - 1) {
			return children.size - 1
		}

		children.values().forEach((value) => {
			if (value.weight === item.weight + 1) {
				value.weight -= 1
			}
		})
		item.weight += 1

		return item.weight
	}

	public makeMainline(
		parentNode: ChessGraphNode<P>,
		promotedNode: ChessGraphNode<P>,
	): number | null {
		const children = this.adjacencyMap.get(parentNode)
		if (!children) {
			return null
		}

		const item = children.values().find((item) => item.node === promotedNode)
		if (!item) {
			return null
		}

		if (item.weight === 0) {
			return 0
		}

		children.values().forEach((value) => {
			if (value.weight < item.weight) {
				value.weight += 1
			}
		})
		item.weight = 0

		return 0
	}

	public deleteVariation(parentNode: ChessGraphNode<P>, deletedNode: ChessGraphNode<P>): boolean {
		const children = this.adjacencyMap.get(parentNode)
		if (!children) {
			return false
		}

		const item = children.values().find((item) => item.node === deletedNode)
		if (!item) {
			return false
		}

		children.values().forEach((value) => {
			if (value.weight > item.weight) {
				value.weight -= 1
			}
		})
		children.delete(item)

		return true
	}

	protected canAddEdge({
		origin,
		target,
	}: {
		origin: ChessGraphNode<P>
		target: ChessGraphNode<P>
	}): boolean {
		if (!super.canAddEdge({ origin, target })) {
			return false
		}
		for (const items of this.adjacencyMap.values()) {
			if (items.values().find((item) => item.node === target)) {
				return false
			}
		}

		return true
	}
}
