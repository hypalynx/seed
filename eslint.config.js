import js from '@eslint/js'

export default [
  // Global ignores
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'public/**', 'coverage/**', '*.min.js'],
  },

  // Base configuration for all files
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },

  // Frontend specific (JSX files)
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        h: 'readonly', // Preact's createElement
        Fragment: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Backend specific
  {
    files: ['server.js', 'src/server.js'],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // Allow console in backend
    },
  },
]
