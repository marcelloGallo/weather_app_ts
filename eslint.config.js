import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",
      "no-unused-vars": "off",
      "no-undef": ["error", { typeof: false }],
    },
  },
  {
    files: ["backend/**/*.{js,jsx}"], // Target backend files
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node, // Include Node.js globals like __dirname
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {},
    rules: {
      ...js.configs.recommended.rules, // Apply standard JavaScript rules
      "no-unused-vars": "warn", // Warn for unused variables
      "no-undef": "error", // Disallow undefined variables
      "consistent-return": "warn", // Enforce consistent return statements
    },
  },
];
