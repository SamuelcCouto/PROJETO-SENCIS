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

const VAZIOS = new Set("area base br col embed hr img input link meta source track wbr".split(" "));

/** As tags de abertura que envolvem a posição dada, da raiz para dentro. */
function ancestrais(html: string, posicao: number) {
  const antes = html.slice(0, posicao).replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, "");
  const pilha: string[] = [];
  for (const m of antes.matchAll(/<(\/?)([a-z][\w-]*)\b[^>]*?(\/?)>/gi)) {
    const [tag, fecha, nome, autoFecha] = m;
    if (VAZIOS.has(nome.toLowerCase()) || autoFecha) continue;
    if (fecha) pilha.pop();
    else pilha.push(tag);
  }
  return pilha;
}

describe.skipIf(!temBuild)("HTML pré-renderizado (rode npm run test:seo)", () => {
  const html = temBuild ? readFileSync(ARQUIVO, "utf-8") : "";
  const decodificar = (s: string) =>
    s
      .replace(/&amp;/g, "&")
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&quot;/g, '"');
  // Texto visível: sem scripts, estilos nem tags.
  const texto = decodificar(
    html
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  );

  describe("estrutura", () => {
    it("declara o idioma pt-BR", () => {
      expect(html).toMatch(/<html[^>]*\blang="pt-BR"/);
    });

    it("tem exatamente um h1, com o título pedido pela clínica", () => {
      const h1 = html.match(/<h1[\s>][\s\S]*?<\/h1>/g) ?? [];
      expect(h1).toHaveLength(1);
      const textoH1 = (h1[0] ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      expect(textoH1).toBe(clinica.slogan);
    });

    it("organiza o conteúdo em seções com h2", () => {
      expect((html.match(/<h2[\s>]/g) ?? []).length).toBeGreaterThanOrEqual(6);
    });
  });

  describe("cabeçalho", () => {
    it("tem título e descrição", () => {
      expect(html).toMatch(/<title>[^<]*Dentista[^<]*<\/title>/);
      expect(html).toMatch(/<meta name="description" content="[^"]{120,}"/);
    });

    it("aponta o canonical para o domínio próprio", () => {
      expect(html).toContain(`<link rel="canonical" href="${clinica.siteUrl}"`);
    });

    it("não bloqueia a indexação", () => {
      expect(html).not.toMatch(/<meta name="robots" content="[^"]*noindex/);
    });

    it("entrega um JSON-LD válido com o tipo Dentist", () => {
      const blocos = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      expect(blocos.length).toBeGreaterThan(0);
      const tipos = blocos.flatMap((b) => [JSON.parse(b[1])].flat()).map((x: any) => x["@type"]);
      expect(tipos).toContain("Dentist");
    });
  });

  describe("o que o Google mede", () => {
    it("usa a palavra que as pessoas buscam", () => {
      // Título e schema não bastam: o texto da página conta.
      const vezes = texto.match(/\bdentistas?\b/gi) ?? [];
      expect(vezes.length).toBeGreaterThanOrEqual(4);
    });

    // A imagem de destaque da primeira tela (o LCP) é a foto da conversa.
    const destaques = [...html.matchAll(/<img\b[^>]*>/g)].filter((m) => /\bfetchpriority="high"/i.test(m[0]));

    it("marca uma única imagem de destaque, sem lazy", () => {
      // Com mais de uma, as duas disputam a banda que só uma deveria ter.
      expect(destaques).toHaveLength(1);
      expect(destaques[0][0]).toContain("planejamento");
      expect(destaques[0][0]).not.toMatch(/\bloading="lazy"/);
    });

    it("a imagem de destaque não começa invisível", () => {
      // Os atributos abaixo são escondidos pelo CSS até a animação de entrada.
      // O Google só conta a imagem quando ela aparece.
      const img = destaques[0];
      const escondidos = ancestrais(html, img.index!)
        .concat(img[0])
        .filter((tag) => /\sdata-(linha|apoio|foto)(?![\w-])/.test(tag));
      expect(escondidos).toEqual([]);
    });

    it("os vídeos não baixam o pôster na abertura", () => {
      // Pôster no HTML é baixado na hora, mesmo com preload="none", e disputa
      // banda com a foto do topo. Os tratamentos só o atribuem perto da tela.
      const comPoster = (html.match(/<video\b[^>]*>/g) ?? []).filter((v) => /\sposter=/.test(v));
      expect(comPoster).toEqual([]);
    });
  });

  describe("NAP visível na página", () => {
    // Endereço e telefone precisam estar em texto, não só no schema: é a
    // coincidência entre os dois que o Google usa para confiar no endereço.
    it("mostra o telefone", () => {
      expect(texto).toContain(clinica.telefone.formatado);
    });

    it("mostra o endereço com CEP, bairro e cidade", () => {
      expect(texto).toContain(clinica.endereco.logradouro);
      expect(texto).toContain(clinica.endereco.cep);
      expect(texto).toContain(clinica.endereco.bairro);
      expect(texto).toContain(clinica.endereco.cidade);
    });
  });

  describe("pedidos da clínica", () => {
    it("mostra a limpeza de pele junto com botox e harmonização", () => {
      expect(texto).toContain("Limpeza de pele");
      expect(texto).toContain("Botox");
      expect(texto).toContain("Harmonização facial");
    });

    it("não destaca nenhuma dentista: o nome da responsável técnica aparece uma vez, no rodapé", () => {
      const vezes = texto.split(clinica.responsavel.nome).length - 1;
      expect(vezes).toBe(1);
      // Fora dos scripts: o JSON-LD do topo também cita o nome.
      const semScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, (m) => " ".repeat(m.length));
      const posicao = semScripts.indexOf(clinica.responsavel.nome);
      expect(ancestrais(html, posicao).some((t) => /^<footer\b/.test(t))).toBe(true);
    });
  });

  describe("imagens e vídeos", () => {
    it("toda imagem tem texto alternativo, salvo as decorativas escondidas do leitor de tela", () => {
      const imgs = [...html.matchAll(/<img\b[^>]*>/g)];
      expect(imgs.length).toBeGreaterThan(0);
      const semAlt = imgs.filter((m) => {
        if (/\balt="[^"]+"/.test(m[0])) return false;
        return !ancestrais(html, m.index!).some((t) => /\baria-hidden="true"/.test(t));
      });
      expect(semAlt.map((m) => m[0])).toEqual([]);
    });

    it("todo vídeo tem descrição acessível ou é decorativo (com legenda ao lado)", () => {
      const videos = html.match(/<video\b[^>]*>/g) ?? [];
      const semRotulo = videos.filter((v) => !/\baria-label="[^"]+"/.test(v) && !/\baria-hidden="true"/.test(v));
      expect(semRotulo).toEqual([]);
    });
  });

  describe("links", () => {
    it("toda âncora interna leva a uma seção que existe", () => {
      const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
      const ancoras = [...html.matchAll(/\bhref="#([^"]+)"/g)].map((m) => m[1]);
      expect(ancoras.length).toBeGreaterThan(0);
      const quebradas = [...new Set(ancoras)].filter((a) => !ids.has(decodificar(a)));
      expect(quebradas).toEqual([]);
    });

    it("links externos que abrem nova aba usam rel=noopener", () => {
      const inseguros = (html.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? []).filter(
        (a) => !/\brel="[^"]*noopener/.test(a),
      );
      expect(inseguros).toEqual([]);
    });

    it("os links de WhatsApp levam ao número da clínica", () => {
      const whats = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)].map((m) => m[1]);
      expect(whats.length).toBeGreaterThan(0);
      for (const u of whats) expect(u).toContain(`wa.me/${clinica.whatsapp.numero}`);
    });
  });
});
