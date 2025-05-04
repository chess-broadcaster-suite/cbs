import { ChessGraphEdge, ChessGraphVertex } from '#interfaces/chess-graph.interfaces'
import { ChessMoveDescriptorInterface } from '#interfaces/chess-move-descriptor.interface'
import { ChessPositionInterface } from '#interfaces/chess-position.interface'
import { randomUUID } from 'crypto'

// an acyclic digraph
export abstract class SomeChessGraph<
	P extends ChessPositionInterface,
	D extends ChessMoveDescriptorInterface,
> {
	protected adjacencyList: Map<ChessGraphVertex<P>, Set<ChessGraphVertex<P>>>
	protected edges: Map<string, ChessGraphEdge<D>>

	public constructor() {
		this.adjacencyList = new Map()
		this.edges = new Map()
	}

	public addVertex(position: P) {
		const vertex: ChessGraphVertex<P> = { id: randomUUID(), position }
		this.adjacencyList.set(vertex, new Set())
	}

	public isChildOf({
		child,
		parent,
	}: {
		child: ChessGraphVertex<P>
		parent: ChessGraphVertex<P>
	}): boolean {
		if (!this.adjacencyList.has(child) || !this.adjacencyList.has(parent) || child === parent) {
			return false
		}

		const stack: Array<ChessGraphVertex<P>> = [parent]
		const discovered: Set<ChessGraphVertex<P>> = new Set()
		while (stack.length > 0) {
			const vertexToProcess = stack.pop()!
			if (!discovered.has(vertexToProcess)) {
				for (const vertexToAdd of this.adjacencyList.get(vertexToProcess)!) {
					if (vertexToAdd === child) {
						return true
					}
					stack.push(vertexToAdd)
				}
				discovered.add(vertexToProcess)
			}
		}

		return false
	}

	public hasEdge({
		origin,
		target,
	}: {
		origin: ChessGraphVertex<P>
		target: ChessGraphVertex<P>
	}): boolean {
		return this.edges.has(`${origin.id}_${target.id}`)
	}

	protected canAddEdge({
		origin,
		target,
	}: {
		origin: ChessGraphVertex<P>
		target: ChessGraphVertex<P>
	}): boolean {
		return (
			origin !== target &&
			!this.isChildOf({
				child: origin,
				parent: target,
			}) &&
			!this.hasEdge({ origin, target })
		)
	}

	public addEdge({
		descriptor,
		origin,
		target,
		weight,
	}: {
		descriptor?: D
		origin: ChessGraphVertex<P>
		target: ChessGraphVertex<P>
		weight: number
	}) {
		if (!this.canAddEdge({ origin, target })) {
			throw new Error()
		}

		this.adjacencyList.get(origin)!.add(target)
		const edgeId = `${origin.id}_${target.id}`
		const edge: ChessGraphEdge<D> = { descriptor, id: edgeId, weight }
		this.edges.set(edgeId, edge)
	}
}
