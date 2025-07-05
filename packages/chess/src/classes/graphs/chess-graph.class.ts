import type { ChessGraphAdjacencyItem, ChessGraphNode } from '#interfaces/chess-graph.interfaces'
import type { ChessMoveInterface } from '#interfaces/chess-move.interface'
import type { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import type { ChessPositionInterface } from '#interfaces/chess-position.interface'

import { ChessError } from '#classes/chess-error.class'
import { OPERATION_CREATES_GRAPH_CYCLE } from '#structs/message'
import { randomUUID } from 'crypto'

// an acyclic graph
export abstract class ChessGraph<P extends ChessPositionInterface, M extends ChessMoveInterface> {
	protected adjacencyMap: Map<ChessGraphNode<P>, Set<ChessGraphAdjacencyItem<P, M>>>

	public constructor() {
		this.adjacencyMap = new Map()
	}

	public addNode(position: P): ChessGraphNode<P> {
		const node: ChessGraphNode<P> = { id: randomUUID(), position }
		this.adjacencyMap.set(node, new Set())

		return node
	}

	public addEdge({
		descriptor,
		origin,
		target,
		weight,
	}: {
		descriptor: ChessMoveDescriptorInterface<M> | null
		origin: ChessGraphNode<P>
		target: ChessGraphNode<P>
		weight: number
	}): boolean {
		if (!this.canAddEdge({ origin, target })) {
			throw new ChessError(OPERATION_CREATES_GRAPH_CYCLE)
		}

		let children = this.adjacencyMap.get(origin)
		if (!children) {
			children = new Set()
		}
		children.add({
			descriptor,
			node: target,
			weight,
		})
		this.adjacencyMap.set(origin, children)

		return true
	}

	public isChildOf({
		child,
		parent,
	}: {
		child: ChessGraphNode<P>
		parent: ChessGraphNode<P>
	}): boolean {
		if (!this.adjacencyMap.has(child) || !this.adjacencyMap.has(parent) || child === parent) {
			return false
		}

		const stack: Array<ChessGraphNode<P>> = [parent]
		const discovered: Set<ChessGraphNode<P>> = new Set()
		while (stack.length > 0) {
			const nodeToProcess = stack.pop()!
			if (!discovered.has(nodeToProcess)) {
				for (const nodeToAdd of this.adjacencyMap
					.get(nodeToProcess)!
					.values()
					.map((el) => el.node)) {
					if (nodeToAdd === child) {
						return true
					}
					stack.push(nodeToAdd)
				}
				discovered.add(nodeToProcess)
			}
		}

		return false
	}

	protected canAddEdge({
		origin,
		target,
	}: {
		origin: ChessGraphNode<P>
		target: ChessGraphNode<P>
	}): boolean {
		return (
			origin !== target &&
			!this.isChildOf({
				child: origin,
				parent: target,
			})
		)
	}
}
