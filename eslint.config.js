import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nodePlugin from "eslint-plugin-n";

export default [
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "public/**",
      "coverage/**",
      "*.min.js",
    ],
  },

  // Base configuration for all files
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: "@babel/eslint-parser",
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },

  // Frontend/Preact specific configuration
  {
    files: [
      "src/**/*.{js,jsx}",
      "client/**/*.{js,jsx}",
      "components/**/*.{js,jsx}",
    ],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        fetch: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        pragma: "h", // Preact uses 'h' instead of 'React.createElement'
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Not needed in Preact
      "react/prop-types": "warn",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "no-console": "off", // Allow console in frontend for debugging
    },
  },

  // Backend/Express specific configuration
  {
    files: [
      "server/**/*.js",
      "routes/**/*.js",
      "middleware/**/*.js",
      "app.js",
      "server.js",
      "index.js",
    ],
    languageOptions: {
      globals: {
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
    plugins: {
      n: nodePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...nodePlugin.configs.recommended.rules,
      "n/no-unsupported-features/es-syntax": "off",
      "n/no-missing-import": "off",
      "n/prefer-global/process": "error",
      "n/prefer-global/buffer": "error",
      "no-console": "off", // Allow console in backend
    },
  },

  // Configuration files
  {
    files: [
      "*.config.js",
      "*.config.mjs",
      "webpack.config.js",
      "vite.config.js",
    ],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },

  // Apply Prettier config last to override conflicts
  prettier,
];
