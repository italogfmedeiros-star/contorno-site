import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // marketing/ é ferramenta de bastidor: um script Node em CommonJS que roda
  // pelo `node`, fora do build do Next. As regras do app não se aplicam a ele.
  { ignores: [".next/**", "node_modules/**", "marketing/**"] },
  ...tseslint.configs.recommended,
  nextPlugin.configs["core-web-vitals"]
);
