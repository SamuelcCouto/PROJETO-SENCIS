import { servicosComplementares } from "@/lib/esteticaFacial";
import { whatsappSobre } from "@/lib/clinica";

/**
 * Uma faixa curta, não uma seção-herói.
 *
 * A clínica pediu para incluir, mas foi explícita que não é o foco — então o
 * peso visual precisa mostrar isso: fundo diferente do que vem antes e
 * depois (para marcar "isto é um parênteses"), título menor, sem a
 * tipografia grande de destaque que Tratamentos usa para os nomes.
 */
export function EsteticaFacial() {
  return (
    <section id="estetica-facial" className="bg-nude py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="text-xl font-medium text-ink sm:text-2xl">
              Também no consultório
            </h2>
            <p className="mt-3 max-w-[38ch] text-sm text-texto">
              A Sencis é uma clínica odontológica antes de tudo. Mas o cuidado
              com o rosto não para na boca, e alguns tratamentos abaixo cabem na
              mesma visita.
            </p>
          </div>

          <ul className="grid gap-6 sm:grid-cols-3">
            {servicosComplementares.map((s) => (
              <li key={s.id}>
                <h3 className="font-medium text-ink">{s.nome}</h3>
                <p className="mt-1.5 text-sm text-texto">{s.descricao}</p>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={whatsappSobre("estética facial")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block border-b border-linha pb-0.5 text-sm text-texto transition-colors hover:border-azul hover:text-ink"
        >
          Perguntar sobre estética facial
        </a>
      </div>
    </section>
  );
}
