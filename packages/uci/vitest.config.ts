import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true, // optional — allows using `describe`, `it`, `expect` globally
		environment: 'node',
		include: ['src/**/*.spec.ts'],
	},
})
