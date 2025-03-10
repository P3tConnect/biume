/* eslint-disable simple-import-sort/imports */
import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"
import unusedImports from "eslint-plugin-unused-imports"

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
    },
    rules: {
      // Rules from eslint-plugin-unused-imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { ignoreRestSiblings: true }],

      // Rules from eslint-plugin-simple-import-sort
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
      "no-process-env": "error",
    },
  },
]

export default config
