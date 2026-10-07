"use client";

import Image from "next/image";
import { useRef } from "react";
import { FioCamada } from "@/components/fio-camada";
import { clinica } from "@/lib/clinica";
import { COM_MOVIMENTO, gsap, useGSAP } from "@/lib/motion";

const salas = [
  {
    src: "/fotos/consultorio-janela.png",
    alt: "Consultório com cadeira odontológica, bancada e uma janela ampla para a avenida",
    largura: 1600,
    altura: 1200,
    legenda: "O consultório, com luz natural",
    classe: "salas__foto--a",
  },
  {
    src: "/fotos/recepcao-poltronas.png",
    alt: "Recepção com poltrona, mesas de madeira em forma de seixo e a parede com luz indireta",
    largura: 1200,
    altura: 1600,
    legenda: "A recepção, com a parede de luz indireta",
    classe: "salas__foto--b",
  },
  {
    src: "/fotos/fachada.png",
    alt: "Fachada da clínica, com o letreiro dourado Sencis Odontologia sobre a entrada de vidro",
    largura: 1297,
    altura: 824,
    legenda: "A fachada, na Av. Sen. José Rodrigues de Morais Neto",
    classe: "salas__foto--c",
  },
  {
    src: "/fotos/corredor.png",
    alt: "Corredor claro que leva às salas de atendimento, com plantas e cadeiras de espera",
    largura: 1200,
    altura: 1600,
    legenda: "O corredor que leva às salas",
    classe: "salas__foto--d",
  },
  {
    src: "/fotos/recepcao-sofa.png",
    alt: "Recepção com sofá cinza, manta azul-marinho, mesas de madeira e a parede com luz indireta",
    largura: 1200,
    altura: 1600,
    legenda: "A espera, com sofá e manta",
    classe: "salas__foto--e",
  },
];

/**
 * A clínica: a luz por trás. A seção entra em grafite e o fio da página acende
 * em nude, com halo baixo, como a luz indireta da parede da recepção. A foto
 * do café aparece inteira ao lado. Sem pin: a cena acompanha a passagem.
 */
export function Clinica() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const q = gsap.utils.selector(raiz);
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: q(".clinica__foto")[0], start: "top 90%", end: "top 35%", scrub: 1 },
          })
          .fromTo(q("[data-foto]"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0)
          .fromTo(q("[data-foto-in]"), { scale: 1.06 }, { scale: 1, duration: 1, ease: "power2.out" }, 0);
      });
    },
    { scope: raiz },
  );

  return (
    <section id="clinica" className="clinica" ref={raiz} data-fio="clinica" aria-labelledby="clinica-titulo">
      <FioCamada />
      <div className="clinica__cena">
        <div className="clinica__texto">
          <h2 id="clinica-titulo" className="titulo-secao">
            Uma clínica pensada sala por sala
          </h2>
          <p>
            A recepção tem café, poltrona e luz baixa porque a espera também faz parte do atendimento. A primeira
            consulta é longa porque escutar leva tempo.
          </p>
          <p>Quer conhecer antes de marcar? Dá para passar aqui só para ver a clínica e conversar, sem compromisso.</p>
          <a className="link link--claro" href={clinica.avaliacoes.link} target="_blank" rel="noopener noreferrer">
            {clinica.avaliacoes.nota} no Google, {clinica.avaliacoes.total} avaliações
          </a>
        </div>

        <div className="clinica__foto" data-foto>
          <div className="clinica__foto-in" data-foto-in>
            <Image
              src="/fotos/recepcao-cafe.png"
              alt="Bule e xícara de porcelana branca com biscoitos, servidos numa bandeja na recepção"
              width={1600}
              height={1200}
              sizes="(min-width: 1024px) 44vw, 92vw"
            />
          </div>
        </div>
      </div>

      <div className="salas">
        {salas.map((s) => (
          <figure className={`salas__foto ${s.classe}`} key={s.src}>
            <Image src={s.src} alt={s.alt} width={s.largura} height={s.altura} sizes="(min-width: 1024px) 50vw, 92vw" />
            <figcaption>{s.legenda}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
