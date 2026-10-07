"use client";

import Image from "next/image";
import { useRef } from "react";
import { FioCamada } from "@/components/fio-camada";
import { primeiraConsulta } from "@/lib/conteudo";
import { COM_MOVIMENTO, gsap, ScrollTrigger, useGSAP } from "@/lib/motion";

/**
 * A primeira consulta, em editorial com coluna sticky (CSS, sem pin).
 * Quando um passo chega ao meio da tela, a foto dele entra com a correção
 * suave: sai de 10 px e 0,8° de desvio e assenta. A troca responde à rolagem
 * da pessoa; não há animação de entrada solta em cada bloco.
 *
 * No celular a coluna sticky some e cada passo mostra a própria foto.
 */
export function PrimeiraConsulta() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${COM_MOVIMENTO} and (min-width: 1024px)`, () => {
        const q = gsap.utils.selector(raiz);
        const fotos = q("[data-foto-passo]");
        let atual = 0;
        gsap.set(fotos, { opacity: (i: number) => (i === 0 ? 1 : 0) });

        const ativar = (i: number) => {
          if (i === atual) return;
          atual = i;
          gsap.to(fotos, { opacity: (j: number) => (j === i ? 1 : 0), duration: 0.6, ease: "power2.out", overwrite: "auto" });
          gsap.fromTo(fotos[i], { x: 10, rotation: 0.8 }, { x: 0, rotation: 0, duration: 0.9, ease: "power2.out" });
        };

        q("[data-passo]").forEach((passo, i) => {
          ScrollTrigger.create({
            trigger: passo,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (self.isActive) ativar(i);
            },
          });
        });
      });
    },
    { scope: raiz },
  );

  return (
    <section className="consulta" ref={raiz} data-fio="consulta" aria-labelledby="consulta-titulo">
      <FioCamada />
      <div className="consulta__coluna">
        <h2 id="consulta-titulo" className="titulo-secao">
          Como a primeira consulta acontece
        </h2>
        <div className="consulta__fotos" aria-hidden="true">
          {primeiraConsulta.map((p) => (
            <div className="consulta__foto" data-foto-passo key={p.titulo}>
              <Image src={p.foto.src} alt="" fill sizes="42vw" />
            </div>
          ))}
        </div>
      </div>
      <ol className="consulta__passos">
        {primeiraConsulta.map((p, i) => (
          <li className="consulta__passo" data-passo key={p.titulo}>
            <div className="consulta__foto-celular">
              <Image src={p.foto.src} alt={p.foto.alt} width={p.foto.largura} height={p.foto.altura} sizes="92vw" />
            </div>
            <span className="consulta__numero" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="consulta__titulo">{p.titulo}</h3>
            <p className="consulta__texto">{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
