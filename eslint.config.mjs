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
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'cmdk',
              message: 'Use the Command primitives from @/components/ui instead.',
            },
            {
              name: 'input-otp',
              message: 'Use the Input OTP primitives from @/components/ui instead.',
            },
            {
              name: 'react-day-picker',
              message: 'Use the Calendar primitive from @/components/ui instead.',
            },
            {
              name: 'sonner',
              message: 'Use the toast from @/components/ui instead.',
            },
            {
              name: 'toast',
              message: 'Use the toast from @/components/ui instead.',
            },
          ],
          patterns: [
            {
              group: ['@base-ui/react', '@base-ui/react/*'],
              message: 'Wrap Base UI through src/components/ui and import from @/components/ui.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.tsx'],
    ignores: ['src/components/ui/**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXOpeningElement[name.name='button']",
          message: 'Use Button from @/components/ui instead of native <button>.',
        },
        {
          selector: "JSXOpeningElement[name.name='input']",
          message:
            'Use Input or another form primitive from @/components/ui instead of native <input>.',
        },
        {
          selector: "JSXOpeningElement[name.name='select']",
          message:
            'Use Select from @/components/ui or NativeSelect from @/components/shared instead of native <select>.',
        },
        {
          selector: "JSXOpeningElement[name.name='textarea']",
          message: 'Use Textarea from @/components/ui instead of native <textarea>.',
        },
        {
          selector: "JSXOpeningElement[name.name='label']",
          message: 'Use Label from @/components/ui instead of native <label>.',
        },
        {
          selector: 'JSXOpeningElement[name.name=/^(table|thead|tbody|tfoot|tr|th|td|caption)$/]',
          message: 'Use Table primitives from @/components/ui instead of native table elements.',
        },
        {
          selector: "JSXOpeningElement[name.name='dialog']",
          message: 'Use Dialog or AlertDialog from @/components/ui instead of native <dialog>.',
        },
        {
          selector: "JSXOpeningElement[name.name='progress']",
          message: 'Use Progress from @/components/ui instead of native <progress>.',
        },
      ],
    },
  },
]);

export default eslintConfig;
