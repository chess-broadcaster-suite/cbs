import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'node',
		globals: true, // optional — allows using `describe`, `it`, `expect` globally
		include: ['src/**/*.spec.ts'],
		passWithNoTests: true
	},
})
