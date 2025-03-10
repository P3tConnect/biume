import { dirname } from "path"
import { fileURLToPath } from "url"
import unusedImports from "eslint-plugin-unused-imports"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = [
  // Configuration de base simplifiée
  {
    // Appliquer à tous les fichiers sauf components/ui
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["components/ui/**"], // IGNORER COMPLÈTEMENT LE DOSSIER components/ui
    plugins: {
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parser: { "@typescript-eslint/parser": [".ts", ".tsx"] },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // Supprimer automatiquement les imports inutilisés - SEULE règle active
      "unused-imports/no-unused-imports": "error",

      // Forcer les guillemets doubles
      quotes: ["error", "double"],

      // Désactiver TOUTES les autres règles
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off",
      "react/jsx-key": "off",
      "no-process-env": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-console": "off",
      "no-debugger": "off",
    },
  },
]

export default config
