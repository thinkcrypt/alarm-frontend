import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules: {
			// TypeScript rules
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-unused-expressions': 'off', // disable unused expressions warning

			// React rules
			'react/no-unescaped-entities': 'off', // allow unescaped quotes in JSX

			// Optional: you can relax other rules if needed
			'no-console': 'off',
			'react/no-unescaped-entities': 'off',
			'@next/next/no-page-custom-font': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
];

export default eslintConfig;
