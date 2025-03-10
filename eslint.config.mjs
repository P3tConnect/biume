/* eslint-disable simple-import-sort/imports */
import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"
import simpleImportSort from "eslint-plugin-simple-import-sort"
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
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Supprime automatiquement les imports inutilisés
      "unused-imports/no-unused-imports": "error",

      // Désactivation des règles pour les variables non utilisées
      "unused-imports/no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Autres règles
      "max-params": ["error", 4],
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "off",
      "no-process-env": "error",
    },
  },
]

export default config
