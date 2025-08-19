import js from '@eslint/js'
import react from 'eslint-plugin-react'

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'public/**',
      'coverage/**',
      '*.min.js',
    ],
  },

  // Base config for all files
  {
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['error'],
      'no-console': 'warn',
    },
  },

  // JSX files
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // Browser globals are auto-detected in modern environments
        h: 'readonly', // Preact's createElement
        Fragment: 'readonly', // Preact Fragment
      },
    },
    settings: {
      react: {
        pragma: 'h',
        version: 'detect',
      },
    },
    rules: {
      'no-console': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },

  // Build scripts and Node.js files
  {
    files: ['scripts/**/*.js', 'server.js', '*.config.js'],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // Console is expected in build scripts
    },
  },
]
