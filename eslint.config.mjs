// @ts-check

import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import * as mdx from "eslint-plugin-mdx";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
    ignores: ["dist/**", ".astro/**", "node_modules/**", "src/paraglide/**"],
  },
  {
    files: ["src/**/*.{js,ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-constant-condition": "off",
      "no-useless-escape": "off",
      "prefer-const": "off",
    },
  },
  ...eslintPluginAstro.configs["flat/recommended"],
  {
    files: ["src/**/*.astro"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-constant-condition": "off",
      "no-useless-escape": "off",
      "prefer-const": "off",
    },
  },
  {
    ...mdx.flat,
    files: ["src/**/*.mdx"],
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
  },
]);
