// @ts-check
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Base strict TypeScript rules
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Explicit types on exported function boundaries
      '@typescript-eslint/explicit-module-boundary-types': 'warn',

      // No any — ever
      '@typescript-eslint/no-explicit-any': 'error',

      // Unused vars are bugs, not style
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // No floating promises — must be awaited or void-cast intentionally
      '@typescript-eslint/no-floating-promises': 'error',

      // No console in committed code — use a logger
      'no-console': 'warn',

      // Prevent barrel re-export abuse — each import must be resolvable
      'no-restricted-imports': ['error', {
        patterns: [
          {
            // Never import from inside a feature — only from its index
            group: ['*/features/*/*', '!*/features/*/index'],
            message: 'Import from the feature public API (index.ts), not internals.',
          },
        ],
      }],
    },
  },

  // Files to ignore
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.ts'],
  },
)
