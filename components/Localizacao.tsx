import {
  clinica,
  enderecoLinhaUnica,
  linkComoChegar,
  linkMapaEmbed,
} from "@/lib/clinica";
import {
  IconeLocal,
  IconeRelogio,
  IconeTelefone,
  IconeInstagram,
} from "./icones";

/**
 * Endereço, horário e mapa.
 *
 * O texto do endereço aqui é o mesmo do JSON-LD e o mesmo que deve estar no
 * Perfil da Empresa no Google — os três saem de lib/clinica.ts. Endereço escrito
 * de três jeitos diferentes em três lugares enfraquece a busca local.
 */
export function Localizacao() {
  return (
    <section id="localizacao" className="bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <h2 className="font-display text-[2.25rem] leading-[1.08] text-ink sm:text-[2.75rem]">
              Como chegar
            </h2>
            <p className="mt-5 max-w-[46ch] text-clay">
              Estamos na Av. Senador José Rodrigues de Morais Neto, no Parque
              Amazônia, a poucos minutos do Jardim Atlântico, da Vila Rosa e do
              Setor Pedro Ludovico.
            </p>

            <dl className="mt-10 space-y-7">
              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brass-mid/40 text-brass-mid">
                  <IconeLocal className="h-5 w-5" />
                </span>
                <div>
                  <dt className="font-medium text-ink">Endereço</dt>
                  <dd className="mt-1 max-w-[40ch] text-clay">
                    {enderecoLinhaUnica}
                  </dd>
                  <dd className="mt-2">
                    <a
                      href={linkComoChegar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-brass-mid pb-0.5 text-sm font-medium text-ink transition-colors hover:text-brass"
                    >
                      Traçar rota no Google Maps
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brass-mid/40 text-brass-mid">
                  <IconeRelogio className="h-5 w-5" />
                </span>
                <div>
                  <dt className="font-medium text-ink">Horário</dt>
                  <dd className="mt-1 space-y-0.5 text-clay">
                    {clinica.horarios.map((h) => (
                      <span key={h.dias} className="block">
                        {h.dias}: {h.faixas.join(" e ")}
                      </span>
                    ))}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brass-mid/40 text-brass-mid">
                  <IconeTelefone className="h-5 w-5" />
                </span>
                <div>
                  <dt className="font-medium text-ink">Telefone e WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${clinica.telefone.e164}`}
                      className="text-clay transition-colors hover:text-ink"
                    >
                      {clinica.telefone.formatado}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brass-mid/40 text-brass-mid">
                  <IconeInstagram className="h-5 w-5" />
                </span>
                <div>
                  <dt className="font-medium text-ink">Instagram</dt>
                  <dd className="mt-1">
                    <a
                      href={clinica.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-clay transition-colors hover:text-ink"
                    >
                      {clinica.social.instagramHandle}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-photo)] border border-sand-deep bg-white shadow-[0_30px_70px_-40px_rgba(27,34,51,0.45)]">
            <iframe
              src={linkMapaEmbed}
              title={`Mapa com a localização da ${clinica.nome} no Parque Amazônia, Goiânia`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[24rem] w-full border-0 sm:h-[32rem] lg:h-[34rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
