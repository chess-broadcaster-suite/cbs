import { buildGoString } from '#utils/build-go-string.util'

test('infinite', () => {
	expect(
		buildGoString({
			infinite: true,
		}),
	).toEqual('go infinite')
})

test('depth', () => {
	expect(
		buildGoString({
			depth: 20,
		}),
	).toEqual('go depth 20')
})

test('nodes', () => {
	expect(
		buildGoString({
			nodes: 5000,
		}),
	).toEqual('go nodes 5000')
})

test('movetime', () => {
	expect(
		buildGoString({
			movetime: 10000,
		}),
	).toEqual('go movetime 10000')
})

test('various parameters', () => {
	expect(
		buildGoString({
			binc: 20000,
			btime: 6000,
			depth: 24,
			infinite: true,
			mate: 10,
			movestogo: 10,
			movetime: 10000,
			nodes: 7000,
			ponder: true,
			searchmoves: ['e2e4', 'g1f3'],
			winc: 30000,
			wtime: 5000,
		}),
	).toEqual(
		'go searchmoves e2e4 g1f3 ponder wtime 5000 btime 6000 winc 30000 binc 20000 movestogo 10 mate 10 depth 24 nodes 7000 movetime 10000 infinite',
	)
})
