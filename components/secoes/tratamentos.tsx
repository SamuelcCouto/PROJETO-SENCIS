"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FioCamada } from "@/components/fio-camada";
import { whatsappSobre } from "@/lib/clinica";
import { tratamentos, type Midia } from "@/lib/conteudo";
import { COM_MOVIMENTO, gsap, useGSAP } from "@/lib/motion";
import { N_LOGO, N_VIEWBOX } from "@/lib/traco";

const GRAFITE = "#3A3A3A";
const NUDE_TEXTO = "#715C45";
const PASSO = 1;
const PAUSA = 0.3;

/** Opacidade de cada nome pela distância até o eixo: o ativo inteiro, os vizinhos apagando. */
const opacidadePorDistancia = (d: number) => [1, 0.55, 0.22][Math.abs(d)] ?? 0;

/**
 * Tratamentos: a lista passa pelo eixo.
 *
 * Desktop com movimento: a seção fica fixada e os nomes sobem juntos; o que
 * chega ao eixo (o fio da página, que dobra ali) fica em grafite e assenta
 * com a correção suave (10 px que se
 * desfazem). Ao lado, no mesmo eixo, o detalhe e a mídia do item trocam.
 * A rolagem para em cada tratamento (snap).
 *
 * Só os títulos (h3) se movem. `ol` e `li` nunca recebem transform, para o
 * detalhe e a mídia, posicionados em relação ao palco, não andarem junto.
 *
 * Celular ou movimento reduzido: lista comum, cada item com a própria mídia.
 */
export function Tratamentos() {
  const raiz = useRef<HTMLDivElement>(null);
  const secao = useRef<HTMLElement>(null);

  // Vídeos: o React não escreve `muted` no HTML do servidor, e sem ele o
  // Safari não toca sozinho. Fora do modo fixado, tocam quando aparecem.
  useEffect(() => {
    const videos = Array.from(secao.current?.querySelectorAll<HTMLVideoElement>("video") ?? []);
    videos.forEach((v) => (v.muted = true));
    const fixado = window.matchMedia(`${COM_MOVIMENTO} and (min-width: 1024px)`);
    const observador = new IntersectionObserver((entradas) => {
      if (fixado.matches) return;
      entradas.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
        else v.pause();
      });
    });
    videos.forEach((v) => observador.observe(v));
    return () => observador.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${COM_MOVIMENTO} and (min-width: 1024px)`, () => {
        const q = gsap.utils.selector(secao);
        const itens = q("[data-item]");
        const nomes = q("[data-nome]");
        const detalhes = q("[data-detalhe]");
        const midias = q("[data-midia]");
        const n = itens.length;
        const topo = (i: number) => (itens[i] as HTMLElement).offsetTop - (itens[0] as HTMLElement).offsetTop;
        const total = (n - 1) * PASSO + PAUSA;
        let ativo = -1;

        const tocar = (i: number) => {
          if (i === ativo) return;
          ativo = i;
          midias.forEach((m, j) => {
            const v = m.querySelector("video");
            if (!v) return;
            if (j === i) v.play().catch(() => {});
            else v.pause();
          });
        };

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: secao.current,
            start: "top top",
            end: () => `+=${(n - 1) * 55 + 20}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            snap: { snapTo: Array.from({ length: n }, (_, i) => (i * PASSO) / total).concat(1), duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" },
            onUpdate: (st) => tocar(Math.min(n - 1, Math.round((st.progress * total) / PASSO))),
            onLeave: () => midias.forEach((m) => m.querySelector("video")?.pause()),
            onLeaveBack: () => {
              midias.forEach((m) => m.querySelector("video")?.pause());
              ativo = -1;
            },
            onEnter: () => tocar(0),
            onEnterBack: () => tocar(n - 1),
          },
        });

        gsap.set(nomes, { y: 0, x: 0, opacity: (i: number) => opacidadePorDistancia(i), color: (i: number) => (i === 0 ? GRAFITE : NUDE_TEXTO) });
        gsap.set(detalhes, { opacity: (i: number) => (i === 0 ? 1 : 0), y: 0 });
        gsap.set(midias, { opacity: (i: number) => (i === 0 ? 1 : 0), scale: 1 });

        for (let k = 0; k < n - 1; k++) {
          const t = k * PASSO;
          const prox = k + 1;
          tl.to(nomes, { y: () => -topo(prox), duration: PASSO }, t)
            .to(nomes, { opacity: (i: number) => opacidadePorDistancia(i - prox), duration: PASSO * 0.6 }, t + PASSO * 0.2)
            .to(nomes[k], { color: NUDE_TEXTO, duration: PASSO * 0.4 }, t + PASSO * 0.2)
            .to(nomes[prox], { color: GRAFITE, duration: PASSO * 0.4 }, t + PASSO * 0.45)
            .fromTo(nomes[prox], { x: 10 }, { x: 0, duration: PASSO * 0.5, ease: "power2.out", immediateRender: false }, t + PASSO * 0.5)
            .to(detalhes[k], { opacity: 0, y: -8, duration: PASSO * 0.35 }, t + PASSO * 0.1)
            .fromTo(detalhes[prox], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: PASSO * 0.4, ease: "power2.out", immediateRender: false }, t + PASSO * 0.55)
            .to(midias[k], { opacity: 0, duration: PASSO * 0.4 }, t + PASSO * 0.25)
            .fromTo(midias[prox], { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: PASSO * 0.5, ease: "power2.out", immediateRender: false }, t + PASSO * 0.4);
        }
        tl.to({}, { duration: PAUSA });
      });
    },
    { scope: raiz },
  );

  return (
    <div ref={raiz}>
      <section id="tratamentos" className="trat" ref={secao} data-fio="tratamentos" aria-labelledby="trat-titulo">
        <FioCamada />
        <header className="trat__cabeca">
          <h2 id="trat-titulo" className="titulo-secao">
            Tratamentos
          </h2>
          <p>Escolha pelo que você sente. O nome técnico vem depois.</p>
        </header>
        <ol className="trat__lista">
          {tratamentos.map((t) => (
            <li className="trat__item" data-item key={t.id} id={`tratamento-${t.id}`}>
              <h3 className="trat__nome" data-nome>
                {t.nome}
              </h3>
              <div className="trat__detalhe" data-detalhe>
                <p className="trat__resolve">{t.resolve}</p>
                <p className="trat__descricao">{t.descricao}</p>
                <a className="link" href={whatsappSobre(t.assunto)} target="_blank" rel="noopener noreferrer">
                  Perguntar sobre {t.assunto} no WhatsApp
                </a>
              </div>
              <figure className="trat__midia" data-midia style={{ "--proporcao": proporcao(t.midia) } as React.CSSProperties}>
                <MidiaTratamento midia={t.midia} />
              </figure>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

/** Largura sobre altura: a moldura segue a mídia, e nada é cortado. Vídeos são 3:4. */
function proporcao(midia: Midia | null) {
  if (midia?.tipo === "foto") return midia.largura / midia.altura;
  return 0.75;
}

function MidiaTratamento({ midia }: { midia: Midia | null }) {
  if (!midia) {
    return (
      <div className="trat__sem-midia" aria-hidden="true">
        <svg viewBox={N_VIEWBOX} focusable="false">
          <path d={N_LOGO} />
        </svg>
      </div>
    );
  }
  if (midia.tipo === "video") {
    return (
      <>
        <div className="trat__quadro">
          <video src={midia.src} poster={midia.poster} muted loop playsInline preload="none" aria-hidden="true" />
        </div>
        <figcaption>{midia.legenda}</figcaption>
      </>
    );
  }
  return (
    <>
      <div className="trat__quadro">
        <Image src={midia.src} alt={midia.alt} fill sizes="(min-width: 1024px) 26vw, 80vw" />
      </div>
      <figcaption>{midia.legenda}</figcaption>
    </>
  );
}
