// @ts-check

import eslint from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  },
  /**
   * Javascript files.
   *
   * Ignore type-checking
   */
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },

  /**
   * Disable rules that could conflict with prettier.
   * This should be the last rule.
   */
  configPrettier,
);
