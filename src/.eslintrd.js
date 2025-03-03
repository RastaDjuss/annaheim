module.exports = {
  root: true, // Ensure it uses this config file as the root
  extends: ["next/core-web-vitals", "eslint:recommended"], // Use Next.js recommended ESLint configuration
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"], // Define applicable file patterns
      rules: {
        "no-unused-vars": "warn", // Example custom rule
        "react/react-in-jsx-scope": "off", // Disable this rule for React projects
      },
    },
  ],
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: true, // Use this instead of the deprecated option
  },
};