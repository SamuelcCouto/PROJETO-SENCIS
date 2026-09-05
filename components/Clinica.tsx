import Image from "next/image";
import { clinica } from "@/lib/clinica";
import salaPlanejamento from "@/public/fotos/sala-planejamento.png";

/**
 * A seção que dá rosto e responsável técnico à clínica.
 *
 * Em conteúdo de saúde, o Google pesa autoria identificada (E-E-A-T) — e o
 * paciente também. Uma clínica nova sem nenhuma pessoa no site é indistinguível
 * de uma página genérica, tanto para o algoritmo quanto para quem está com medo
 * de dentista.
 */
export function Clinica() {
  return (
    <section id="clinica" className="bg-nude py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-[var(--radius-photo)] bg-white shadow-[0_30px_70px_-36px_rgba(27,34,51,0.45)]">
              <Image
                src={salaPlanejamento}
                alt="Sala de planejamento da Sencis, onde o caso é conversado antes de qualquer procedimento"
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-[20rem] w-full object-cover sm:h-[26rem]"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-display text-[2.25rem] leading-[1.08] text-ink sm:text-[2.75rem]">
              Uma clínica construída sala por sala
            </h2>

            <div className="mt-6 max-w-[58ch] space-y-4 text-texto">
              <p>
                A Sencis é nova, e isso não é um detalhe que a gente esconde:
                foi aberta do zero, por quem quis montar o consultório que
                gostaria de ter encontrado como paciente.
              </p>
              <p>
                O nome vem de <em>senso</em> — aquele que sente, que percebe,
                que compreende — e carrega um eco de <em>essência</em>, o que
                permanece quando se tira o resto. Não é enfeite de marca: é o
                critério com que a clínica foi montada.
              </p>
              <p>
                Daí vem o resto. A recepção tem café, poltrona e luz baixa
                porque a espera também faz parte do atendimento. A primeira
                consulta é longa porque escutar leva tempo. E o orçamento sai
                por escrito, em ordem de urgência, porque ninguém decide bem sob
                pressão.
              </p>
            </div>

            <figure className="mt-9 rounded-[var(--radius-card)] border border-linha bg-white p-6">
              <figcaption className="font-display text-xl text-ink">
                {clinica.responsavel.nome}
              </figcaption>
              <p className="mt-1 text-sm text-texto">
                {clinica.responsavel.cargo}
              </p>
              <p className="mt-3 border-t border-linha pt-3 text-sm text-texto-claro">
                {clinica.responsavel.cro} · Clínica {clinica.croClinica}
              </p>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
