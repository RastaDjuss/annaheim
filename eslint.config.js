import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    ...compat.config({
        parser: "@typescript-eslint/parser",
        plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            ecmaFeatures: {
                jsx: true,
            },
        },
        extends: [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:react/recommended",
            "plugin:react-hooks/recommended",
            "plugin:jsx-a11y/recommended",
            "next/core-web-vitals",
        ],
        rules: {
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/no-explicit-any": "off",
            "quotes": ["error", "double"],
            "indent": ["error", 2],
            "jsx-a11y/click-events-have-key-events": "off",
            "react-hooks/rules-of-hooks": "off",
            "react/react-in-jsx-scope": "off",
        },
        ignorePatterns: ["node_modules/", "dist/", ".next/"],
    }),
];