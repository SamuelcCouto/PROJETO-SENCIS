import Image from "next/image";
import { clinica, linkWhatsapp } from "@/lib/clinica";
import { IconeEstrela, IconeWhatsapp, IconeAcessivel } from "./icones";
import recepcaoPoltronas from "@/public/fotos/recepcao-poltronas.png";

/**
 * O hero abre com a recepção — o lugar onde a espera já é parte do atendimento.
 * Atrás da foto fica o único momento de cor forte da página: o azul petróleo
 * envolvendo o bege, que é a cartela da marca dita em luz.
 */
export function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* No mobile precisa ficar do tamanho de um canto quente: um círculo
          maior que a largura da tela deixa de ser luz e vira fundo colorido. */}
      <div
        aria-hidden
        className="transicao anim-bloom pointer-events-none absolute -top-20 right-[-42%] h-[22rem] w-[22rem] opacity-75 sm:-top-28 sm:right-[-10%] sm:h-[38rem] sm:w-[38rem] sm:opacity-100 lg:-top-24 lg:right-[2%] lg:h-[46rem] lg:w-[46rem]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div className="anim-rise">
          <h1 className="font-display text-[2.375rem] leading-[1.04] text-ink sm:text-[3.5rem] sm:leading-[1.02] lg:text-[4.25rem]">
            {clinica.slogan}.
          </h1>

          <p className="mt-6 max-w-[54ch] text-texto sm:mt-7 sm:text-lg">
            A Sencis é uma clínica odontológica no Parque Amazônia, em Goiânia,
            onde o plano de tratamento nasce de uma conversa — e não de um
            orçamento pronto antes de você abrir a boca.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 font-medium text-white transition-colors hover:bg-ink-soft"
            >
              <IconeWhatsapp className="h-5 w-5" />
              Agendar avaliação
            </a>
            <a
              href="#tratamentos"
              className="inline-flex items-center justify-center rounded-full border border-linha px-7 py-4 font-medium text-ink transition-colors hover:bg-nude"
            >
              Ver tratamentos
            </a>
          </div>

          <p className="mt-8 text-sm text-texto">
            {clinica.endereco.logradouro} · {clinica.endereco.bairro} ·{" "}
            {clinica.endereco.cidade}/{clinica.endereco.estado}
          </p>
        </div>

        <div className="anim-rise relative [animation-delay:180ms]">
          <div className="relative overflow-hidden rounded-[var(--radius-photo)] bg-nude shadow-foto">
            <Image
              src={recepcaoPoltronas}
              alt="Recepção da Sencis, com poltronas claras, almofadas escuras e iluminação indireta na parede"
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="h-[22rem] w-full object-cover sm:h-[28rem] lg:h-[32rem]"
            />
          </div>

          <figure className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[var(--radius-card)] border border-linha bg-white px-5 py-4 lg:absolute lg:-bottom-8 lg:-left-8 lg:mt-0 lg:flex-col lg:items-start lg:gap-2 lg:px-6 lg:shadow-cartao">
            <div className="flex items-center gap-2">
              <span className="flex gap-0.5 text-azul" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <IconeEstrela key={i} className="h-3.5 w-3.5" />
                ))}
              </span>
              <span className="font-display text-xl text-ink">
                {clinica.avaliacoes.nota.toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                })}
              </span>
            </div>
            <figcaption className="text-sm text-texto">
              {clinica.avaliacoes.total} avaliações no{" "}
              {clinica.avaliacoes.fonte}
            </figcaption>
            <p className="flex items-center gap-1.5 text-sm text-texto lg:mt-1">
              <IconeAcessivel className="h-4 w-4 text-azul" />
              Entrada acessível
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}
