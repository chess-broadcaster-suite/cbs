import eslintConfigPrettier from 'eslint-config-prettier'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'
import sort from 'eslint-plugin-sort'

/** @type {import("eslint").Linter.Config[]} */
export const baseConfig = [
	...tseslint.configs.recommended,
	eslintConfigPrettier,
	{
		plugins: {
			turbo: turboPlugin,
		},
	},
	{
		ignores: ['.*.js', 'node_modules/**', 'dist/**'],
	},
	{
		rules: {
			'no-restricted-imports': 'off',
			'@typescript-eslint/no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['./*'],
							message: 'Use a "#*" subpath import',
						},
					],
				},
			],
		},
	},
  sort.configs["flat/recommended"],
	{
		rules: {
			'sort/destructuring-properties': ['error', { caseSensitive: true, natural: true }],
			'sort/exports': [
				'error',
				{
					groups: [],
					typeOrder: 'first',
					caseSensitive: true,
					natural: true,
				},
			],
			'sort/export-members': ['error', { caseSensitive: true, natural: true }],
			'sort/imports': [
				'error',
				{
					groups: [
						{ type: 'side-effect', order: 10 },
						{ type: 'type', order: 20 },
						{ type: 'other', order: 30 },
					],
					separator: '\n',
					typeOrder: 'first',
					caseSensitive: true,
					natural: true,
				},
			],
			'sort/import-members': ['error', { caseSensitive: true, natural: true }],
			'sort/object-properties': ['error', { caseSensitive: true, natural: true }],
			'sort/type-properties': ['error', { caseSensitive: true, natural: true }],
			'sort/string-enums': ['error', { caseSensitive: true, natural: true }],
			'sort/string-unions': ['error', { caseSensitive: true, natural: true }],
		},
	},
]
