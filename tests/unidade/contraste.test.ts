import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Contraste mínimo de leitura (WCAG AA: 4,5:1 para texto comum).
 *
 * As cores saem do próprio globals.css, não de uma cópia: se alguém clarear um
 * token, o teste falha antes de o Lighthouse reclamar em produção. Foi assim
 * que o texto sobre o nude ficou em 4,1:1 e a linha "Também procurado como"
 * em 2,5:1 sem ninguém notar.
 */
const raiz = process.cwd();
const css = readFileSync(join(raiz, "app/globals.css"), "utf-8");

const tokensEm = (bloco: string) =>
  Object.fromEntries(
    [...bloco.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [
      m[1],
      m[2],
    ]),
  );

const tema = tokensEm(css.match(/@theme\s*\{([\s\S]*?)\n\}/)![1]);
const noNude = {
  ...tema,
  ...tokensEm(css.match(/\.bg-nude\s*\{([\s\S]*?)\}/)?.[1] ?? ""),
};

type Rgb = [number, number, number];
const rgb = (hex: string): Rgb =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
const sobre = (frente: Rgb, fundo: Rgb, alfa: number): Rgb =>
  frente.map((v, i) => fundo[i] + (v - fundo[i]) * alfa) as Rgb;
const luminancia = (c: Rgb) => {
  const [r, g, b] = c.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contraste = (a: Rgb, b: Rgb) => {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
};

const MINIMO = 4.5;

describe("contraste dos tokens", () => {
  it.each([
    ["texto", "areia", tema],
    ["azul", "areia", tema],
    ["ink", "areia", tema],
    ["texto", "nude", noNude],
    ["azul-fundo", "nude", noNude],
    ["ink", "nude", noNude],
  ])("%s sobre %s passa de 4,5:1", (frente, fundo, tokens) => {
    expect(tokens[frente], `token ${frente}`).toBeDefined();
    expect(tokens[fundo], `token ${fundo}`).toBeDefined();
    expect(
      contraste(rgb(tokens[frente]), rgb(tokens[fundo])),
    ).toBeGreaterThanOrEqual(MINIMO);
  });

  it("o nude escurece o texto corrido", () => {
    // Sem o override de .bg-nude, o texto padrão fica em 4,1:1 ali.
    expect(noNude.texto).not.toBe(tema.texto);
  });
});

describe("texto translúcido nas faixas escuras", () => {
  // Agendar (com o formulário) e o rodapé são as faixas bg-ink. Ali o texto é
  // nude com transparência, e cada grau de transparência é um contraste novo.
  const arquivos = [
    "components/Agendar.tsx",
    "components/FormAgendamento.tsx",
    "components/Rodape.tsx",
  ];
  const usos = arquivos.flatMap((arquivo) =>
    [
      ...readFileSync(join(raiz, arquivo), "utf-8").matchAll(
        /\btext-nude\/(\d+)\b/g,
      ),
    ].map((m) => [arquivo, Number(m[1])] as const),
  );

  it("encontra os usos", () => {
    expect(usos.length).toBeGreaterThan(0);
  });

  it.each(usos)("%s: text-nude/%i passa de 4,5:1", (_arquivo, alfa) => {
    const ink = rgb(tema.ink);
    const cor = sobre(rgb(tema.nude), ink, alfa / 100);
    expect(contraste(cor, ink)).toBeGreaterThanOrEqual(MINIMO);
  });
});
