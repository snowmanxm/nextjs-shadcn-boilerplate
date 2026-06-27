import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'coverage/**',
    'node_modules/**',
    'next-env.d.ts',
  ]),
  {
    ignores: ['node_modules/**', '**/*.test.ts', '**/*.d.ts'],
    rules: {
      // Convert specific warnings to errors
      'no-warning-comments': ['warn', { terms: ['fixme', 'todo'], location: 'start' }],

      // Allow console statements
      'no-console': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@next/next/no-img-element': 'off',

      // Disable no-html-link-for-pages rule since we're using app directory
      '@next/next/no-html-link-for-pages': 'off',

      // Additional rules
      'import/no-extraneous-dependencies': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]);

export default eslintConfig;
