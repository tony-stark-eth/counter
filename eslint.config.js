import eslint from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...svelte.configs['flat/recommended'],
    stylistic.configs.customize({
        indent: 4,
        quotes: 'single',
        semi: true,
        jsx: true,
    }),
    {
        ignores: [
            'node_modules',
            'dist',
            'tsconfig.tsbuildinfo',
        ],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
            },
        },
    },
    {
        ignores: ['build/', '.svelte-kit/', 'dist/', 'android'],
    },
);
