module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react/prop-types": "off",
    "react/no-unused-vars": off,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    plugins: ["import"],
    rules: {
      "import/no-unresolved": "error",
      "import/no-named-as-default": "warn",
    },
  },
};
