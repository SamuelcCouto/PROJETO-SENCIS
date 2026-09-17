import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { clinica } from "@/lib/clinica";

/**
 * Testa a página como o Google a recebe: o HTML que o `next build` gera.
 *
 * Precisa de build. Sem ele a suíte se pula sozinha, para `npm test` continuar
 * rápido no dia a dia. `npm run test:seo` faz o build e roda tudo.
 */
const ARQUIVO = join(process.cwd(), ".next/server/app/index.html");
const temBuild = existsSync(ARQUIVO);

describe.skipIf(!temBuild)(
  "HTML pré-renderizado (rode npm run test:seo)",
  () => {
    const html = temBuild ? readFileSync(ARQUIVO, "utf-8") : "";
    // Texto visível: sem scripts, estilos nem tags.
    const texto = html
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ");

    const decodificar = (s: string) =>
      s
        .replace(/&amp;/g, "&")
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&quot;/g, '"');

    describe("estrutura", () => {
      it("declara o idioma pt-BR", () => {
        expect(html).toMatch(/<html[^>]*\blang="pt-BR"/);
      });

      it("tem exatamente um h1", () => {
        expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
      });

      it("organiza o conteúdo em seções com h2", () => {
        expect((html.match(/<h2[\s>]/g) ?? []).length).toBeGreaterThanOrEqual(
          6,
        );
      });
    });

    describe("cabeçalho", () => {
      it("tem título e descrição", () => {
        expect(html).toMatch(/<title>[^<]*Dentista[^<]*<\/title>/);
        expect(html).toMatch(/<meta name="description" content="[^"]{120,}"/);
      });

      it("aponta o canonical para o domínio próprio", () => {
        expect(html).toContain(
          `<link rel="canonical" href="${clinica.siteUrl}"`,
        );
      });

      it("não bloqueia a indexação", () => {
        expect(html).not.toMatch(/<meta name="robots" content="[^"]*noindex/);
      });

      it("entrega um JSON-LD válido com o tipo Dentist", () => {
        const blocos = [
          ...html.matchAll(
            /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
          ),
        ];
        expect(blocos.length).toBeGreaterThan(0);
        const tipos = blocos
          .flatMap((b) => [JSON.parse(b[1])].flat())
          .map((x: any) => x["@type"]);
        expect(tipos).toContain("Dentist");
      });
    });

    describe("NAP visível na página", () => {
      // O endereço e o telefone precisam estar em texto, não só no schema: é a
      // coincidência entre os dois que o Google usa para confiar no endereço.
      it("mostra o telefone", () => {
        expect(texto).toContain(clinica.telefone.formatado);
      });

      it("mostra o endereço com CEP", () => {
        expect(texto).toContain(clinica.endereco.logradouro);
        expect(texto).toContain(clinica.endereco.cep);
        expect(texto).toContain(clinica.endereco.bairro);
      });

      it("mostra a cidade", () => {
        expect(texto).toContain(clinica.endereco.cidade);
      });
    });

    describe("imagens e vídeos", () => {
      it("toda imagem tem texto alternativo", () => {
        const imgs = html.match(/<img\b[^>]*>/g) ?? [];
        expect(imgs.length).toBeGreaterThan(0);
        const semAlt = imgs.filter((i) => !/\balt="[^"]+"/.test(i));
        expect(semAlt).toEqual([]);
      });

      it("todo vídeo tem descrição acessível", () => {
        const videos = html.match(/<video\b[^>]*>/g) ?? [];
        const semRotulo = videos.filter((v) => !/\baria-label="[^"]+"/.test(v));
        expect(semRotulo).toEqual([]);
      });
    });

    describe("links", () => {
      it("toda âncora interna leva a uma seção que existe", () => {
        const ids = new Set(
          [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]),
        );
        const ancoras = [...html.matchAll(/\bhref="#([^"]+)"/g)].map(
          (m) => m[1],
        );
        expect(ancoras.length).toBeGreaterThan(0);
        const quebradas = [...new Set(ancoras)].filter(
          (a) => !ids.has(decodificar(a)),
        );
        expect(quebradas).toEqual([]);
      });

      it("links externos que abrem nova aba usam rel=noopener", () => {
        const inseguros = (
          html.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? []
        ).filter((a) => !/\brel="[^"]*noopener/.test(a));
        expect(inseguros).toEqual([]);
      });

      it("os links de WhatsApp levam ao número da clínica", () => {
        const whats = [
          ...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g),
        ].map((m) => m[1]);
        expect(whats.length).toBeGreaterThan(0);
        for (const u of whats)
          expect(u).toContain(`wa.me/${clinica.whatsapp.numero}`);
      });
    });
  },
);
