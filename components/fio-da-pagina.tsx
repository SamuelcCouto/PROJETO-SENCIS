"use client";

import { ROTAS, type Modo } from "@/lib/fio";
import { COM_MOVIMENTO, gsap, ScrollTrigger, useGSAP } from "@/lib/motion";

/** Seções fixadas: o fio delas termina de se desenhar quando o pin começa. */
const FIXADAS = new Set(["encontro", "tratamentos"]);

/**
 * Desenha o fio da página (lib/fio.ts) e amarra cada trecho à rolagem.
 *
 * Vai depois do <main> na página: assim os ScrollTriggers do fio nascem
 * depois dos pins das seções e já contam com o espaço que eles acrescentam.
 * As rotas são refeitas a cada refresh do ScrollTrigger (fontes, redimensionar)
 * e quando alguma seção muda de altura (uma pergunta aberta, uma foto que
 * carregou).
 *
 * Os caminhos têm pathLength 1000 e o traço é desenhado de 1000 a 0. O GSAP
 * arredonda px para inteiro: com pathLength 1, o fio só ligava e desligava.
 */
export function FioDaPagina() {
  useGSAP(() => {
    const secoes = Array.from(document.querySelectorAll<HTMLElement>("[data-fio]"));
    if (!secoes.length) return;
    const completo = window.matchMedia(`${COM_MOVIMENTO} and (min-width: 1024px)`);
    const larga = window.matchMedia("(min-width: 1024px)");

    // Duas fases: primeiro mede todas as seções, depois escreve todos os
    // desenhos. Medir e escrever alternados forçava um recálculo de layout por
    // seção (o Lighthouse acusava ~2,7 s de "Style & Layout" no celular).
    const construir = () => {
      const modo: Modo = completo.matches ? "completo" : "costura";
      const movimento = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desenhos: { svg: SVGSVGElement; w: number; h: number; d: string }[] = [];
      let entrada: number | null = null;
      for (const secao of secoes) {
        const rota = ROTAS[secao.dataset.fio ?? ""];
        const svg = secao.querySelector<SVGSVGElement>(":scope > .fio");
        const w = secao.offsetWidth;
        const h = secao.offsetHeight;
        if (!rota || !svg || !w || !h) continue;
        const { d, saida } = rota({ secao, w, h, entrada, modo, larga: larga.matches, movimento });
        desenhos.push({ svg, w, h, d });
        entrada = saida;
      }
      for (const { svg, w, h, d } of desenhos) {
        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
        svg.querySelectorAll("path").forEach((p) => p.setAttribute("d", d));
      }
    };

    construir();
    ScrollTrigger.addEventListener("refreshInit", construir);

    const mm = gsap.matchMedia();
    mm.add(COM_MOVIMENTO, () => {
      secoes.forEach((secao) => {
        const nome = secao.dataset.fio ?? "";
        const caminhos = secao.querySelectorAll(":scope > .fio path");
        if (nome === "abertura") {
          gsap.fromTo(caminhos, { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 1.2, ease: "sine.inOut" });
          return;
        }
        const ultimo = nome === "rodape";
        gsap.fromTo(
          caminhos,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: secao,
              start: ultimo ? "top bottom" : "top 85%",
              end: FIXADAS.has(nome) ? "top top" : ultimo ? "bottom bottom" : "bottom 85%",
              scrub: 0.8,
            },
          },
        );
      });
    });

    // O mármore do fundo deriva mais devagar que o conteúdo, inclusive
    // enquanto uma seção está fixada: o fundo continua vivo durante o pin.
    // Só transform na camada .veios: animar uma variável CSS na seção obrigava
    // o navegador a recalcular o estilo de tudo dentro dela a cada quadro.
    mm.add(COM_MOVIMENTO, () => {
      secoes.forEach((secao) => {
        const veios = secao.querySelector(":scope > .veios");
        if (!veios) return;
        gsap.fromTo(
          veios,
          { y: -90 },
          {
            y: 90,
            ease: "none",
            scrollTrigger: { trigger: secao, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // Seção que muda de altura muda o caminho e a posição dos gatilhos de baixo.
    let espera = 0;
    let primeira = true;
    const observador = new ResizeObserver(() => {
      if (primeira) {
        primeira = false;
        return;
      }
      window.clearTimeout(espera);
      espera = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    });
    secoes.forEach((s) => observador.observe(s));

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", construir);
      observador.disconnect();
      window.clearTimeout(espera);
    };
  });

  return null;
}
