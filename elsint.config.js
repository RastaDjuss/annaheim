import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

// Determine the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FlatCompat instance for backward compatibility
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("next/core-web-vitals"), // Import the Next.js ESLint config
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"], // Applicable file patterns
    rules: {
      "no-unused-vars": "warn", // Warn instead of error for unused variables
      "react/react-in-jsx-scope": "off", // Disable React in scope rule
    },
  },
  {
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
];