import { buildPositionString } from '#utils/build-position-string.util'

test('starting position', () => {
	expect(
		buildPositionString({
			fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
		}),
	).toBe('position fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
})

test('another position', () => {
	expect(
		buildPositionString({
			fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
		}),
	).toBe('position fen rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2')
})

test('fen with moves', () => {
	expect(
		buildPositionString({
			fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
			moves: ['e2e4', 'e7e5'],
		}),
	).toBe('position fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 moves e2e4 e7e5')
})

test('startpos', () => {
	expect(
		buildPositionString({
			startpos: true,
		}),
	).toBe('position startpos')
})

test('startpos with moves', () => {
	expect(
		buildPositionString({
			moves: ['g1f3', 'a7a6'],
			startpos: true,
		}),
	).toBe('position startpos moves g1f3 a7a6')
})
