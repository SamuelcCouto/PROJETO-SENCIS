"use client";

import Image from "next/image";
import { useRef } from "react";
import { FioCamada } from "@/components/fio-camada";
import { clinica, linkTelefone, linkWhatsapp } from "@/lib/clinica";
import { COM_MOVIMENTO, gsap, useGSAP } from "@/lib/motion";

/**
 * Abertura. A única animação que roda sozinha no site: o fio nasce como o
 * braço do N e se desenha (FioDaPagina), a foto aparece inteira e a frase
 * assenta linha a linha, com um desvio de menos de 1° que se corrige
 * (power2.out, sem passar do ponto).
 *
 * Os elementos começam escondidos pelo CSS, com a rede de segurança que os
 * mostra depois de 4 s se o JS falhar. O useGSAP cancela essa rede antes de
 * animar, para ela não brigar com a opacidade que o GSAP controla.
 */
export function Abertura() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const q = gsap.utils.selector(raiz);
        gsap.set(q("[data-linha], [data-apoio], [data-foto]"), { animation: "none" });

        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .fromTo(q("[data-foto]"), { opacity: 0 }, { opacity: 1, duration: 0.9 }, 0.5)
          .fromTo(q("[data-foto-in]"), { scale: 1.05 }, { scale: 1, duration: 1.2 }, 0.5)
          .fromTo(
            q("[data-linha]"),
            { opacity: 0, y: 22, rotation: 0.8 },
            { opacity: 1, y: 0, rotation: 0, duration: 0.9, stagger: 0.09 },
            0.2,
          )
          .fromTo(q("[data-apoio]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.75);
      });
    },
    { scope: raiz },
  );

  return (
    <section id="topo" className="abertura" ref={raiz} data-fio="abertura" aria-labelledby="abertura-titulo">
      <FioCamada />
      <div className="abertura__texto">
        <h1 id="abertura-titulo" className="abertura__titulo">
          <span className="abertura__linha" data-linha>
            Cuidar de um
          </span>{" "}
          <span className="abertura__linha" data-linha>
            sorriso é olhar
          </span>{" "}
          <span className="abertura__linha" data-linha>
            para além dele.
          </span>
        </h1>
        <p className="abertura__lead" data-apoio>
          Odontologia integrada no Parque Amazônia, em Goiânia. A primeira consulta começa pela conversa, e o plano
          sai por escrito, em ordem de urgência.
        </p>
        <div className="abertura__acoes" data-apoio>
          <a className="botao botao--cheio" href={linkWhatsapp} target="_blank" rel="noopener noreferrer">
            Agendar avaliação
          </a>
          <a className="botao botao--contorno" href={linkTelefone}>
            Ligar {clinica.telefone.formatado}
          </a>
        </div>
        <p className="abertura__nota" data-apoio>
          <a href={clinica.avaliacoes.link} target="_blank" rel="noopener noreferrer">
            {clinica.avaliacoes.nota} no Google, {clinica.avaliacoes.total} avaliações
          </a>
        </p>
      </div>

      <div className="abertura__foto" data-foto>
        <div className="abertura__foto-in" data-foto-in>
          <Image
            src="/fotos/planejamento.jpg"
            alt="A dentista conversa com uma paciente à mesa do consultório, com o notebook aberto entre as duas"
            fill
            preload
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 34vw, 92vw"
          />
        </div>
      </div>
    </section>
  );
}
