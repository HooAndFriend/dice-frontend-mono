/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["plugin:storybook/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
};
