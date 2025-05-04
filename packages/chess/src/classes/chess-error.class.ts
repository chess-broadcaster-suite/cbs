export class ChessError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options)
		this.name = 'ChessError'
	}
}
