import { baseConfig } from '@chess-broadcaster-suite/config-eslint/base'

/** @type {import("eslint".Linter.Config)} */
export default [
	...baseConfig,
	{
		files: ['src/index.ts', 'src/variants/fischer/index.ts'],
		rules: {
			'@typescript-eslint/no-restricted-imports': 'off',
		},
	},
]
