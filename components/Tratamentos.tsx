import { tratamentos } from "@/lib/tratamentos";
import { whatsappSobre } from "@/lib/clinica";

/**
 * Os tratamentos vêm como lista separada por filete, não como grade de cards.
 * São seis itens comparáveis entre si — o filete diz "mesma natureza, leia em
 * sequência". Seis cards com a mesma sombra e o mesmo raio diriam só que o
 * layout tinha seis lugares para preencher.
 */
export function Tratamentos() {
  return (
    <section id="tratamentos" className="border-t border-linha py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-display text-[2.25rem] leading-[1.08] text-ink sm:text-[2.75rem]">
              O que a gente resolve
            </h2>
            <p className="mt-5 max-w-[46ch] text-texto">
              Odontologia integrada quer dizer que o mesmo lugar acompanha você
              da limpeza de rotina ao implante, sem te mandar para quatro
              endereços diferentes.
            </p>
            <p className="mt-4 max-w-[46ch] text-texto">
              Não sabe em qual destes o seu caso se encaixa? É exatamente para
              isso que serve a avaliação.
            </p>
          </div>

          <ul className="lista-filete">
            {tratamentos.map((t) => (
              <li key={t.id} className="py-8 first:pt-0">
                <h3 className="font-display text-2xl text-ink sm:text-[1.75rem]">
                  {t.nome}
                </h3>
                <p className="mt-1.5 text-azul">{t.resolve}</p>
                <p className="mt-3 max-w-[62ch] text-texto">{t.descricao}</p>

                <p className="mt-3 max-w-[62ch] text-[0.8125rem] leading-relaxed text-texto-claro/80">
                  Também procurado como {t.tambemChamado.join(", ")}.
                </p>

                <a
                  href={whatsappSobre(t.nome.toLowerCase())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block border-b border-linha pb-0.5 text-sm text-texto transition-colors hover:border-azul hover:text-ink"
                >
                  Perguntar sobre {t.nome.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
