import { FlatCompat } from "@eslint/eslintrc"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import unusedImports from "eslint-plugin-unused-imports"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Rules from eslint-plugin-unused-imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { ignoreRestSiblings: true }],

      // Rules from eslint-plugin-simple-import-sort
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "max-params": ["error", 4],
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "off",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-process-env": "error",
    },
  },
]

export default config
