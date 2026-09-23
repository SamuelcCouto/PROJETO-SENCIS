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

const VAZIOS = new Set(
  "area base br col embed hr img input link meta source track wbr".split(" "),
);

/** As tags de abertura que envolvem a posição dada, da raiz para dentro. */
function ancestrais(html: string, posicao: number) {
  const antes = html
    .slice(0, posicao)
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, "");
  const pilha: string[] = [];
  for (const m of antes.matchAll(/<(\/?)([a-z][\w-]*)\b[^>]*?(\/?)>/gi)) {
    const [tag, fecha, nome, autoFecha] = m;
    if (VAZIOS.has(nome.toLowerCase()) || autoFecha) continue;
    if (fecha) pilha.pop();
    else pilha.push(tag);
  }
  return pilha;
}

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

    describe("o que o Google mede", () => {
      // A imagem de destaque da primeira tela (o LCP) é a foto da recepção.
      const destaques = [...html.matchAll(/<img\b[^>]*>/g)].filter((m) =>
        /\bfetchpriority="high"/i.test(m[0]),
      );

      it("marca uma única imagem de destaque, sem lazy", () => {
        // Com mais de uma, as duas disputam a banda que só uma deveria ter.
        expect(destaques).toHaveLength(1);
        expect(destaques[0][0]).toContain("recepcao-poltronas");
        expect(destaques[0][0]).not.toMatch(/\bloading="lazy"/);
      });

      it("os vídeos não baixam o pôster na abertura", () => {
        // Pôster no HTML é baixado na hora, mesmo com preload="none". Os quatro
        // somavam ~120 KB disputando banda com a foto do topo, e tirá-los
        // derrubou o LCP de laboratório de 3,8 s para 3,1 s. O VideoAmbiente
        // só atribui o pôster perto da tela.
        const comPoster = (html.match(/<video\b[^>]*>/g) ?? []).filter((v) =>
          /\bposter=/.test(v),
        );
        expect(comPoster).toEqual([]);
      });

      it("a imagem de destaque não começa invisível", () => {
        // Dentro de um .anim-rise ela nasce com opacity 0, e o Google só conta
        // a imagem quando ela aparece.
        const img = destaques[0];
        const animados = ancestrais(html, img.index!)
          .concat(img![0])
          .filter((tag) => /\banim-(rise|bloom)\b/.test(tag));
        expect(animados).toEqual([]);
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
