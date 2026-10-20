import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored react-bits components.
    "src/components/WarpText.jsx",
    "src/components/GlowCursor.jsx",
    "src/components/CircularText.jsx",
    "src/components/ScrollReveal.jsx",
    "src/components/FlowingMenu.jsx",
  ]),
]);

export default eslintConfig;
