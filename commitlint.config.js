const config = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'scope-case': [2, 'always', 'kebab-case'],
		'body-max-line-length': [2, 'always', 'Infinity'],
	},
}

export default config
