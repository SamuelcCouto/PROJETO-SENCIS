import { FormAgendamento } from "./FormAgendamento";
import { clinica } from "@/lib/clinica";
import { IconeTelefone } from "./icones";

/**
 * A única faixa escura da página. O contraste marca onde a leitura vira ação —
 * e devolve ao site o azul-marinho que está nas almofadas da recepção.
 */
export function Agendar() {
  return (
    <section id="agendar" className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[2.25rem] leading-[1.08] text-white sm:text-[2.75rem]">
              Vamos marcar sua avaliação
            </h2>
            <p className="mt-5 max-w-[42ch] text-sand/80">
              Preencha e a recepção retorna com os horários livres. Leva menos
              de um minuto e você não precisa saber o nome do procedimento.
            </p>

            <a
              href={`tel:${clinica.telefone.e164}`}
              className="mt-8 inline-flex items-center gap-3 text-sand transition-colors hover:text-brass-lit"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20">
                <IconeTelefone className="h-4.5 w-4.5" />
              </span>
              <span>
                <span className="block text-sm text-sand/60">
                  Com dor? Prefira ligar
                </span>
                <span className="font-display text-xl text-white">
                  {clinica.telefone.formatado}
                </span>
              </span>
            </a>
          </div>

          <FormAgendamento />
        </div>
      </div>
    </section>
  );
}
