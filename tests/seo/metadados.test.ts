import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { clinica } from "@/lib/clinica";

// As fontes são transformadas pelo compilador do Next; fora dele, basta um
// objeto com a variável CSS.
vi.mock("next/font/google", () => ({
  Jost: () => ({ variable: "fonte-jost" }),
  Instrument_Sans: () => ({ variable: "fonte-instrument" }),
}));

const { metadata, viewport } = await import("@/app/layout");
const { default: sitemap } = await import("@/app/sitemap");
const { default: robots } = await import("@/app/robots");
const { default: nextConfig } = await import("@/next.config");

const titulo = (metadata.title as { default: string }).default;
const descricao = metadata.description as string;

describe("título da página na busca", () => {
  it("começa pelo termo que a pessoa digita, não pela marca", () => {
    expect(titulo).toMatch(/^Dentista em Goiânia/);
  });

  it("cita o bairro e a marca", () => {
    expect(titulo).toContain("Parque Amazônia");
    expect(titulo).toContain("Sencis");
  });

  it("cabe no resultado do Google sem ser cortado (até 60 caracteres)", () => {
    expect(titulo.length, titulo).toBeLessThanOrEqual(60);
  });
});

describe("descrição na busca", () => {
  it("cabe no resultado sem ser cortada (até 155 caracteres)", () => {
    expect(descricao.length, descricao).toBeLessThanOrEqual(155);
  });

  it("é longa o bastante para o Google não trocar por outro trecho (120+)", () => {
    expect(descricao.length, descricao).toBeGreaterThanOrEqual(120);
  });

  it("menciona dentista, a cidade e o telefone", () => {
    expect(descricao.toLowerCase()).toContain("dentista");
    expect(descricao).toContain("Goiânia");
    expect(descricao).toContain(clinica.telefone.formatado);
  });
});

describe("indexação", () => {
  it("usa o domínio próprio como base e canonical", () => {
    expect(metadata.metadataBase?.toString()).toBe(`${clinica.siteUrl}/`);
    expect(metadata.alternates?.canonical).toBe("/");
  });

  it("permite indexar e seguir links", () => {
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it("declara o idioma do Open Graph e a imagem de compartilhamento existe", () => {
    expect(metadata.openGraph).toMatchObject({ locale: "pt_BR" });
    const imagens = (metadata.openGraph as any).images as { url: string }[];
    for (const img of imagens) {
      expect(existsSync(join(process.cwd(), "public", img.url)), img.url).toBe(
        true,
      );
    }
  });

  it("nunca trava o zoom no celular", () => {
    // O site antigo usava maximum-scale=1, o que reprova em acessibilidade.
    expect(viewport.maximumScale ?? 5).toBeGreaterThanOrEqual(2);
  });
});

describe("sitemap.xml", () => {
  const entradas = sitemap();

  it("aponta a página principal no domínio próprio", () => {
    expect(entradas[0].url).toBe(clinica.siteUrl);
  });

  it("lista as fotos da clínica para a busca de imagens, e todas existem", () => {
    const imagens = entradas[0].images ?? [];
    expect(imagens.length).toBeGreaterThanOrEqual(5);
    for (const url of imagens) {
      expect(url.startsWith(`${clinica.siteUrl}/`), url).toBe(true);
      const arquivo = join(
        process.cwd(),
        "public",
        decodeURIComponent(new URL(url).pathname),
      );
      expect(existsSync(arquivo), url).toBe(true);
    }
  });
});

describe("robots.txt", () => {
  const r = robots();

  it("libera o site e bloqueia só a API", () => {
    expect(r.rules).toEqual([
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ]);
  });

  it("aponta o sitemap do domínio próprio", () => {
    expect(r.sitemap).toBe(`${clinica.siteUrl}/sitemap.xml`);
  });
});

describe("domínio duplicado", () => {
  it("redireciona permanentemente projeto-sencis.vercel.app para o domínio próprio", async () => {
    // Sem isto o Google encontra duas cópias idênticas do site e divide a
    // relevância entre elas.
    const regras = (await nextConfig.redirects?.()) ?? [];
    const regra = regras.find((r: any) =>
      r.has?.some(
        (h: any) =>
          h.type === "host" && h.value === "projeto-sencis.vercel.app",
      ),
    );

    expect(regra).toBeDefined();
    expect(regra!.permanent).toBe(true);
    expect(regra!.source).toBe("/:path*");
    expect(regra!.destination).toBe(`${clinica.siteUrl}/:path*`);
  });
});
