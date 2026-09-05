import Image from "next/image";
import salaPlanejamento from "@/public/fotos/sala-planejamento.png";

/**
 * A seção que dá rosto à clínica — mas não a uma dentista específica.
 *
 * Havia aqui um cartão com nome, cargo e CRO da responsável técnica. A clínica
 * pediu a remoção: são várias dentistas atendendo, e destacar uma cria a
 * expectativa de "quero ser atendida por ela", que gera atrito quando a agenda
 * encaixa outra profissional.
 *
 * A identificação da responsável técnica continua no rodapé (Rodape.tsx),
 * discreta — isso não é escolha de marketing, é exigência do Código de Ética
 * Odontológica (Resolução CFO-196/2019) para qualquer peça publicitária da
 * clínica. Ver [[sencis-identificacao-responsavel-tecnica]] na memória.
 */
export function Clinica() {
  return (
    <section id="clinica" className="bg-nude py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-[var(--radius-photo)] bg-white shadow-foto">
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
          </div>
        </div>
      </div>
    </section>
  );
}
