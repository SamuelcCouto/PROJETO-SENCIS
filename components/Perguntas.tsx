import { faq } from "@/lib/faq";
import { linkWhatsapp } from "@/lib/clinica";
import { IconeMais, IconeWhatsapp } from "./icones";

/**
 * Acordeão em <details>/<summary> nativo: abre sem JavaScript, é navegável por
 * teclado de graça e o conteúdo fechado continua no HTML — que é o que o Google
 * precisa ler para casar com o schema FAQPage.
 */
export function Perguntas() {
  return (
    <section id="perguntas" className="border-t border-linha py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-display text-[2.25rem] leading-[1.08] text-ink sm:text-[2.75rem]">
              Antes de marcar
            </h2>
            <p className="mt-5 max-w-[42ch] text-texto">
              As perguntas que mais chegam no WhatsApp, respondidas aqui para
              você não precisar perguntar.
            </p>
            <a
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-azul/45 px-5 py-2.5 text-sm font-medium text-azul transition-colors hover:bg-azul hover:text-white"
            >
              <IconeWhatsapp className="h-4 w-4" />
              Ficou outra dúvida? Pergunte
            </a>
          </div>

          <div className="lista-filete">
            {faq.map((item) => (
              <details key={item.pergunta} className="group py-5">
                <summary className="flex items-start justify-between gap-6 text-lg font-medium text-ink">
                  <span className="max-w-[46ch]">{item.pergunta}</span>
                  <IconeMais className="faq-sinal mt-1 h-5 w-5 shrink-0 text-azul transition-transform duration-300" />
                </summary>
                <p className="mt-3 max-w-[62ch] pr-10 text-texto">
                  {item.resposta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
