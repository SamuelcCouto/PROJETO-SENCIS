import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Contraste mínimo de leitura (WCAG AA: 4,5:1 para texto comum).
 *
 * As cores saem do próprio globals.css, não de uma cópia: se alguém clarear um
 * token, o teste falha antes de o Lighthouse reclamar em produção. A lista de
 * pares é a dos pares que a página usa para texto (design-plan.md, "Paleta").
 */
const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf-8");
const tema = Object.fromEntries(
  [...css.match(/@theme\s*\{([\s\S]*?)\n\}/)![1].matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [
    m[1],
    m[2],
  ]),
);

type Rgb = [number, number, number];
const rgb = (hex: string): Rgb => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
const luminancia = (c: Rgb) => {
  const [r, g, b] = c.map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contraste = (a: string, b: string) => {
  const [claro, escuro] = [luminancia(rgb(a)), luminancia(rgb(b))].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
};

describe("contraste dos pares de texto", () => {
  it.each([
    // [texto, fundo, onde aparece]
    ["grafite", "papel", "texto corrido"],
    ["grafite", "creme", "tratamentos e cuidados com o rosto"],
    ["nude-texto", "papel", "texto secundário"],
    ["nude-texto", "creme", "nomes fora do eixo e legendas nos tratamentos"],
    ["azul", "papel", "links"],
    ["azul-profundo", "creme", "links nos tratamentos"],
    ["azul-profundo", "nude", "links sobre nude"],
    ["papel", "azul", "botão de agendar"],
    ["azul-profundo", "papel", "botão claro na visita"],
    ["papel", "grafite", "clínica e rodapé"],
    ["creme", "grafite", "parágrafos da clínica e do rodapé"],
    ["nude", "grafite", "legendas da galeria"],
    ["azul-claro", "grafite", "links sobre grafite"],
    ["creme", "azul", "horário e avisos na visita"],
  ])("%s sobre %s passa de 4,5:1 (%s)", (frente, fundo) => {
    expect(tema[frente], `token ${frente}`).toBeDefined();
    expect(tema[fundo], `token ${fundo}`).toBeDefined();
    expect(contraste(tema[frente], tema[fundo])).toBeGreaterThanOrEqual(4.5);
  });
});
