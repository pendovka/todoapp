/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  root: true,
  parserOptions: { project: ["tsconfig.json"] },
  settings: {
    react: {
      version: "detect",
    },
  },

  rules: {
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
  },
};
