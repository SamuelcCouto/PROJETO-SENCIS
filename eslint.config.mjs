import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// O Next 16 aposentou o `next lint`: o ESLint roda direto, com a configuração
// oficial do Next (regras de React, hooks, acessibilidade e Core Web Vitals).
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Os testes de SEO percorrem JSON arbitrário (o JSON-LD gerado e o grafo
    // do vocabulário schema.org): ali `any` é o tipo honesto. No código do
    // site a regra continua valendo.
    files: ["tests/**"],
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
