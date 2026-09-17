import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { clinica } from "@/lib/clinica";
import { faq } from "@/lib/faq";
import { servicosComplementares } from "@/lib/esteticaFacial";
import { tratamentos } from "@/lib/tratamentos";
import { schemaClinica, schemaFaq, schemaSite } from "@/lib/schema";

/**
 * O JSON-LD é o que diz ao Google, sem ambiguidade, que este endereço é um
 * consultório odontológico em Goiânia. Nenhum visitante vê esse bloco — então
 * nenhum visitante vai reclamar quando ele quebrar. Estes testes reclamam.
 */

const clinicaLd = schemaClinica() as Record<string, any>;
const faqLd = schemaFaq() as Record<string, any>;
const siteLd = schemaSite() as Record<string, any>;

describe("NAP — nome, endereço e telefone batem com lib/clinica.ts", () => {
  it("declara o tipo Dentist", () => {
    expect(clinicaLd["@type"]).toBe("Dentist");
  });

  it("usa o mesmo nome e telefone da página", () => {
    expect(clinicaLd.name).toBe(clinica.nome);
    expect(clinicaLd.telephone).toBe(clinica.telefone.e164);
    expect(clinicaLd.telephone).toMatch(/^\+55\d{10,11}$/);
  });

  it("usa o mesmo endereço e as mesmas coordenadas", () => {
    expect(clinicaLd.address).toMatchObject({
      "@type": "PostalAddress",
      addressLocality: clinica.endereco.cidade,
      addressRegion: clinica.endereco.estado,
      postalCode: clinica.endereco.cep,
      addressCountry: "BR",
    });
    expect(clinicaLd.address.streetAddress).toContain(
      clinica.endereco.logradouro,
    );
    expect(clinicaLd.geo).toMatchObject({
      latitude: clinica.geo.latitude,
      longitude: clinica.geo.longitude,
    });
  });
});

describe("horário — o do schema é o mesmo que aparece na página", () => {
  const dias: Record<string, string[]> = {
    "segunda a sexta": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    sábado: ["Saturday"],
    domingo: ["Sunday"],
  };

  it("cada faixa exibida em Localizacao tem uma entrada equivalente no JSON-LD", () => {
    const esperado = clinica.horarios.flatMap((h) =>
      h.faixas
        .filter((f) => f !== "Fechado")
        .map((f) => {
          const [opens, closes] = f.split("–").map((x) => x.trim());
          return { dayOfWeek: dias[h.dias.toLowerCase()], opens, closes };
        }),
    );

    const noSchema = clinicaLd.openingHoursSpecification.map((s: any) => ({
      dayOfWeek: s.dayOfWeek,
      opens: s.opens,
      closes: s.closes,
    }));

    expect(noSchema).toEqual(esperado);
  });
});

describe("serviços", () => {
  const catalogo = clinicaLd.hasOfferCatalog?.itemListElement ?? [];
  const nomes = catalogo.map((o: any) => o.itemOffered?.name);

  it("lista os serviços em hasOfferCatalog, a propriedade válida para Dentist", () => {
    // availableService só existe para MedicalClinic, Hospital e Physician.
    expect(clinicaLd.availableService).toBeUndefined();
    expect(clinicaLd.hasOfferCatalog?.["@type"]).toBe("OfferCatalog");
  });

  it("inclui os seis tratamentos odontológicos", () => {
    for (const t of tratamentos) expect(nomes, t.nome).toContain(t.nome);
  });

  it("inclui só os serviços estéticos dentro do escopo legal de dentista", () => {
    for (const s of servicosComplementares) {
      if (s.escopoDentista) expect(nomes, s.nome).toContain(s.nome);
      else expect(nomes, s.nome).not.toContain(s.nome);
    }
  });
});

describe("decisões deliberadas que não podem regredir", () => {
  it("não marca avaliação própria (self-serving review)", () => {
    expect(JSON.stringify([clinicaLd, faqLd, siteLd])).not.toContain(
      "aggregateRating",
    );
  });

  it("declara acessibilidade para cadeira de rodas", () => {
    const acessivel = (clinicaLd.amenityFeature ?? []).find((f: any) =>
      /cadeira de rodas/i.test(f.name),
    );
    expect(acessivel).toMatchObject({
      "@type": "LocationFeatureSpecification",
      value: true,
    });
  });

  it("aponta tudo para o domínio próprio em https", () => {
    expect(clinica.siteUrl).toBe("https://www.sencis.com.br");
    for (const ld of [clinicaLd, faqLd, siteLd]) {
      expect(ld["@id"]).toMatch(/^https:\/\/www\.sencis\.com\.br\/#/);
    }
    expect(siteLd.publisher["@id"]).toBe(clinicaLd["@id"]);
  });
});

describe("arquivos referenciados existem", () => {
  const publico = (url: string) =>
    join(process.cwd(), "public", decodeURIComponent(new URL(url).pathname));

  it("cada imagem do schema existe em public/", () => {
    // Renomear uma foto quebra isto em silêncio: a página continua bonita e o
    // Google passa a receber 404.
    for (const url of clinicaLd.image)
      expect(existsSync(publico(url)), url).toBe(true);
  });

  it("o logo existe em public/", () => {
    expect(existsSync(publico(clinicaLd.logo)), clinicaLd.logo).toBe(true);
  });
});

describe("FAQ", () => {
  it("tem uma pergunta no schema para cada pergunta da página", () => {
    expect(faqLd.mainEntity).toHaveLength(faq.length);
    for (const q of faqLd.mainEntity)
      expect(q.acceptedAnswer.text.length).toBeGreaterThan(20);
  });
});

describe("serialização", () => {
  it("não perde nenhum campo ao virar JSON", () => {
    // JSON.stringify descarta undefined sem avisar.
    for (const ld of [clinicaLd, faqLd, siteLd]) {
      expect(JSON.parse(JSON.stringify(ld))).toEqual(ld);
    }
  });
});

/**
 * Valida cada propriedade contra o vocabulário oficial do schema.org
 * (tests/fixtures/schemaorg-vocabulario.jsonld, CC BY-SA 3.0, schema.org).
 *
 * O Google ignora propriedades fora do domínio do tipo em vez de acusar erro,
 * então um erro de vocabulário nunca aparece como aviso em lugar nenhum — o
 * dado só deixa de ser lido. Foi assim que availableLanguage e availableService
 * passaram despercebidos até esta validação existir.
 */
describe("vocabulário do schema.org", () => {
  const vocab = JSON.parse(
    readFileSync(
      join(process.cwd(), "tests/fixtures/schemaorg-vocabulario.jsonld"),
      "utf-8",
    ),
  )["@graph"] as any[];

  const nome = (id: string) => id.split(":").pop()!;
  const lista = <T>(x: T | T[] | undefined): T[] =>
    x === undefined ? [] : Array.isArray(x) ? x : [x];

  const pais = new Map<string, string[]>();
  const dominios = new Map<string, Set<string>>();
  for (const n of vocab) {
    const tipos = lista<string>(n["@type"]);
    if (tipos.includes("rdfs:Class")) {
      pais.set(
        nome(n["@id"]),
        lista<any>(n["rdfs:subClassOf"]).map((s) => nome(s["@id"])),
      );
    }
    if (tipos.includes("rdf:Property")) {
      dominios.set(
        nome(n["@id"]),
        new Set(
          lista<any>(n["schema:domainIncludes"]).map((d) => nome(d["@id"])),
        ),
      );
    }
  }

  const linhagem = (tipo: string, acc = new Set<string>()): Set<string> => {
    if (acc.has(tipo)) return acc;
    acc.add(tipo);
    for (const p of pais.get(tipo) ?? []) linhagem(p, acc);
    return acc;
  };

  const problemas = (obj: unknown, caminho: string, saida: string[]) => {
    if (Array.isArray(obj))
      return obj.forEach((x, i) => problemas(x, `${caminho}[${i}]`, saida));
    if (!obj || typeof obj !== "object") return;
    const o = obj as Record<string, unknown>;
    const tipos = lista<string>(o["@type"] as any);
    const herda = new Set(tipos.flatMap((t) => [...linhagem(t)]));
    for (const t of tipos)
      if (!pais.has(t)) saida.push(`${caminho}: tipo desconhecido ${t}`);
    for (const [k, v] of Object.entries(o)) {
      if (k.startsWith("@")) continue;
      if (tipos.length) {
        const dom = dominios.get(k);
        if (!dom) saida.push(`${caminho}.${k}: não existe no schema.org`);
        else if (![...dom].some((d) => herda.has(d)))
          saida.push(`${caminho}.${k}: não vale para ${tipos}`);
      }
      problemas(v, `${caminho}.${k}`, saida);
    }
  };

  it.each([
    ["Dentist", clinicaLd],
    ["FAQPage", faqLd],
    ["WebSite", siteLd],
  ])("%s só usa propriedades válidas para o próprio tipo", (_, ld) => {
    const saida: string[] = [];
    problemas(ld, "$", saida);
    expect(saida).toEqual([]);
  });
});
