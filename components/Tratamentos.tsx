import Image from "next/image";
import { tratamentos } from "@/lib/tratamentos";
import { whatsappSobre } from "@/lib/clinica";
import { IconeWhatsapp } from "./icones";
import implantesLentesPorcelana from "@/public/fotos/implantes-lentes-porcelana.jpg";

/**
 * Os tratamentos vêm como lista separada por filete, não como grade de cards.
 * São seis itens comparáveis entre si — o filete diz "mesma natureza, leia em
 * sequência". Seis cards com a mesma sombra e o mesmo raio diriam só que o
 * layout tinha seis lugares para preencher.
 *
 * A foto de resultado fica na coluna fixa (título + intro), não presa a um dos
 * seis itens — anexá-la só a "Estética do sorriso" faria os outros cinco
 * parecerem menos comprovados. Como prova do conjunto, ela acompanha a rolagem
 * inteira da lista, e não favorece nenhum item sobre os outros.
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

            <figure className="mt-8 max-w-[22rem]">
              <div className="overflow-hidden rounded-[var(--radius-photo)] border border-linha shadow-foto">
                <Image
                  src={implantesLentesPorcelana}
                  alt="Close-up de dentes superiores restaurados com lentes de contato dental e implantes em porcelana"
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 352px"
                  className="h-auto w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-texto">
                Implantes e lentes em porcelana — um resultado real da clínica.
              </figcaption>
            </figure>
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
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-azul/45 px-4 py-2 text-sm font-medium text-azul transition-colors hover:bg-azul hover:text-white"
                >
                  <IconeWhatsapp className="h-3.5 w-3.5" />
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
