module.exports = {
  extends: [
    "next/core-web-vitals",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "unused-imports", "simple-import-sort"],
  parserOptions: {
    extraFileExtensions: [".json"],
    projectService: true,
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    "unused-imports/no-unused-imports": "error",
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "max-params": ["error", 4],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off",
    "no-console": ["error", { allow: ["warn", "error"] }],
  },
  overrides: [
    {
      files: ["**/*.js", "**/*.ts", "**/*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["server-only", "client-only"],
              ["^react$", "^next"],
              ["^[a-z]"],
              ["^@"],
              ["^~"],
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              ["^.+\\.s?css$"],
              ["^\\u0000"],
            ],
          },
        ],
      },
    },
  ],
  ignorePatterns: [
    "node_modules",
    "dist",
    "build",
    ".next",
    "**/.eslintrc.js",
    "**/.eslintrc.cjs",
    "**/postcss.config.js",
    "**/tailwind.config.js",
    "**/prettier.config.js",
    "**/prettier.config.cjs",
  ],
};
