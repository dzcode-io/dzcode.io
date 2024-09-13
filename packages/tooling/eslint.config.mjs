import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { includeIgnoreFile, fixupPluginRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import reactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, "../../.gitignore");

export default [
  includeIgnoreFile(gitignorePath),
  { linterOptions: { reportUnusedDisableDirectives: "error" } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: { "react-hooks": fixupPluginRules(reactHooks) },
    rules: { ...reactHooks.configs.recommended.rules },
  },
  {
    rules: {
      "react/prop-types": "off",
    },
  },
];
