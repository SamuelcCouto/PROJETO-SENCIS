import Image from "next/image";
import { clinica, linkWhatsapp } from "@/lib/clinica";
import { IconeEstrela, IconeWhatsapp, IconeAcessivel } from "./icones";
import recepcaoPoltronas from "@/public/fotos/recepcao-poltronas.png";

/**
 * O hero abre com a coisa mais característica desta clínica: o dente
 * retroiluminado da parede da recepção. O brilho quente atrás da foto é o mesmo
 * gesto, estendido para a página — e é o único momento de cor forte do site.
 */
export function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* No mobile o brilho precisa ficar do tamanho de um canto quente. Um
          círculo maior que a largura da tela deixa de ser luz e vira um fundo
          colorido inteiro. */}
      <div
        aria-hidden
        className="glow anim-bloom pointer-events-none absolute -top-20 right-[-42%] h-[22rem] w-[22rem] opacity-75 sm:-top-32 sm:right-[-14%] sm:h-[40rem] sm:w-[40rem] sm:opacity-100 lg:right-[-4%] lg:h-[52rem] lg:w-[52rem]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div className="anim-rise">
          <h1 className="font-display text-[2.375rem] leading-[1.04] text-ink sm:text-[3.5rem] sm:leading-[1.02] lg:text-[4.25rem]">
            Odontologia que começa pelo ouvido.
          </h1>

          <p className="mt-6 max-w-[54ch] text-clay sm:mt-7 sm:text-lg">
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
              className="inline-flex items-center justify-center rounded-full border border-sand-deep px-7 py-4 font-medium text-ink transition-colors hover:bg-sand"
            >
              Ver tratamentos
            </a>
          </div>

          <p className="mt-8 text-sm text-clay">
            {clinica.endereco.logradouro} · {clinica.endereco.bairro} ·{" "}
            {clinica.endereco.cidade}/{clinica.endereco.estado}
          </p>
        </div>

        <div className="anim-rise relative [animation-delay:180ms]">
          <div className="relative overflow-hidden rounded-[var(--radius-photo)] bg-sand shadow-[0_30px_70px_-30px_rgba(27,34,51,0.35)]">
            <Image
              src={recepcaoPoltronas}
              alt="Recepção da Sencis: poltronas claras, almofadas azul-marinho e um dente retroiluminado desenhado na parede"
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="h-[22rem] w-full object-cover sm:h-[28rem] lg:h-[32rem]"
            />
          </div>

          <figure className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[var(--radius-card)] border border-sand-deep bg-white px-5 py-4 lg:absolute lg:-bottom-8 lg:-left-8 lg:mt-0 lg:flex-col lg:items-start lg:gap-2 lg:px-6 lg:shadow-[0_18px_40px_-24px_rgba(27,34,51,0.4)]">
            <div className="flex items-center gap-2">
              <span className="flex gap-0.5 text-brass-mid" aria-hidden>
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
            <figcaption className="text-sm text-clay">
              {clinica.avaliacoes.total} avaliações no{" "}
              {clinica.avaliacoes.fonte}
            </figcaption>
            <p className="flex items-center gap-1.5 text-sm text-clay lg:mt-1">
              <IconeAcessivel className="h-4 w-4 text-brass-mid" />
              Entrada acessível
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}
