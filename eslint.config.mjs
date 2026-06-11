import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import eslintConfigPrettier from "eslint-config-prettier"

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    ignores: [
      "node_modules/**",
      "vendor/**",
      "public/**",
      "resources/js/components/**",
      "resources/js/actions/**",
      "resources/js/routes/**",
      "resources/js/wayfinder/**"
    ]
  },
  {
    files: ["./resources/js/**/*.vue", "./resources/js/**/*.ts"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        KeyboardEvent: "readonly",
        confirm: "readonly"
      },
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
        sourceType: "module",
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  },
  eslintConfigPrettier
)
