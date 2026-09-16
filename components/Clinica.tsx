import Image from "next/image";
import planejamento from "@/public/fotos/planejamento.jpg";

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
 *
 * A origem do nome é citação do documento "Essência Sencis" que a clínica
 * enviou — três palavras, não duas. Não reescrever de cabeça.
 */
export function Clinica() {
  return (
    <section id="clinica" className="bg-nude py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="order-2 lg:order-1">
            <figure>
              <div className="aspect-square overflow-hidden rounded-[var(--radius-photo)] bg-white shadow-foto">
                <Image
                  src={planejamento}
                  alt="Dentista mostrando as radiografias na tela do computador para a paciente sentada à mesa, durante o planejamento do tratamento"
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 max-w-[44ch] text-sm text-texto">
                O planejamento é feito com você na sala, olhando para as mesmas
                imagens.
              </figcaption>
            </figure>
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
                O nome nasce do encontro entre três palavras: <em>essência</em>,
                o que nos torna únicos; <em>essencial</em>, o que realmente
                importa; e <em>sense</em> — sentir, perceber e compreender. Não
                é enfeite de marca: é o critério com que a clínica foi montada.
              </p>
              <p>
                Daí vem o resto. A recepção tem café, poltrona e luz baixa
                porque a espera também faz parte do atendimento. A primeira
                consulta é longa porque escutar leva tempo. E o orçamento sai
                por escrito, em ordem de urgência, porque ninguém decide bem sob
                pressão.
              </p>
            </div>

            {/* Do documento de essência da marca, palavra por palavra. */}
            <p className="font-display mt-8 max-w-[32ch] border-l-2 border-azul pl-5 text-xl text-ink">
              O tratamento não começa com uma decisão. Começa com escuta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
