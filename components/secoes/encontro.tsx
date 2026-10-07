"use client";

import { useRef } from "react";
import { FioCamada } from "@/components/fio-camada";
import { Marca } from "@/components/marca";
import { encontro } from "@/lib/conteudo";
import { useCenaFixada } from "@/lib/use-cena-fixada";

const NUDE = "#D2BAA0";
const GRAFITE = "#3A3A3A";

/**
 * O encontro: o gesto-assinatura da Sencis, e o único momento fixado longo.
 *
 * As três palavras chegam fora de lugar (deslocadas para os lados, até 1° de
 * giro) e a rolagem as traz para o eixo, sem quique. O alinhamento é do CSS:
 * cada linha é uma grade cuja primeira coluna termina no eixo, então o "s"
 * das letras em comum cai sempre no mesmo lugar, em qualquer largura.
 * Depois o que não é comum apaga para nude, as palavras saem e sobra o nome,
 * com o N desenhado como o traço do letreiro.
 *
 * No desktop, o eixo é o próprio fio da página, que chega desenhado quando a
 * seção fixa. No celular e com movimento reduzido, o eixo é um filete próprio.
 *
 * O estado que o CSS mostra sem JS (e com movimento reduzido) é o do meio:
 * palavras alinhadas, definições à vista, frase de fecho.
 */
export function Encontro() {
  const secao = useRef<HTMLElement>(null);

  useCenaFixada(
    secao,
    (tl, q) => {
      const linhas = q("[data-linha]");
      const desvio = [-0.09, 0.11, -0.06];
      const giro = [1.2, -1, 0.6];

      tl.fromTo(q("[data-eixo]"), { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: "sine.inOut" }, 0.05);
      linhas.forEach((linha, i) => {
        tl.fromTo(
          linha,
          { x: () => window.innerWidth * desvio[i], rotation: giro[i] },
          { x: 0, rotation: 0, duration: 0.35, ease: "power2.out" },
          0,
        );
      });

      tl.fromTo(q("[data-diverge]"), { color: GRAFITE }, { color: NUDE, duration: 0.14 }, 0.36)
        .fromTo(q("[data-def]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.12, stagger: 0.03, ease: "power2.out" }, 0.4)
        .to({}, { duration: 0.1 })
        .to(linhas, { opacity: 0, duration: 0.12 }, 0.64)
        .to(q("[data-def]"), { opacity: 0, duration: 0.1 }, 0.64)
        .fromTo(q("[data-nome]"), { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.7)
        .fromTo(q("[data-nome] [data-n]"), { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.16, ease: "sine.inOut" }, 0.7)
        .fromTo(q("[data-fecho]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.86)
        .to({}, { duration: 0.08 });
    },
    { duracao: () => (window.innerWidth < 768 ? "+=120%" : "+=180%") },
  );

  return (
    <div>
      <section className="encontro" ref={secao} data-fio="encontro" aria-labelledby="encontro-titulo">
        <FioCamada />
        <h2 id="encontro-titulo" className="sr-only">
          {encontro.frase}
        </h2>
        <div className="encontro__palco">
          <span className="encontro__eixo" data-eixo aria-hidden="true" />
          <dl className="encontro__palavras">
            {encontro.palavras.map((p) => (
              <div className="encontro__linha" data-linha key={p.comum + p.fim}>
                <dt className="encontro__palavra" lang={p.comum === "sen" ? "en" : "pt-BR"}>
                  <span className="encontro__pre" data-diverge>
                    {p.pre}
                  </span>
                  <span className="encontro__resto">
                    <span className="encontro__comum">{p.comum}</span>
                    <span data-diverge>{p.fim}</span>
                  </span>
                </dt>
                <dd className="encontro__def" data-def>
                  {p.definicao}
                </dd>
              </div>
            ))}
          </dl>
          <div className="encontro__nome" data-nome aria-hidden="true">
            <Marca />
          </div>
        </div>
        <p className="encontro__fecho" data-fecho>
          {encontro.fecho}
        </p>
      </section>
    </div>
  );
}
