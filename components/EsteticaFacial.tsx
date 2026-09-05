import Image, { type StaticImageData } from "next/image";
import { servicosComplementares } from "@/lib/esteticaFacial";
import { whatsappSobre } from "@/lib/clinica";
import { IconeWhatsapp } from "./icones";
import botoxAntesDepois from "@/public/fotos/botox-testa-antes-depois.jpg";
import harmonizacaoFacialPerfil from "@/public/fotos/harmonizacao-facial-perfil.jpg";

/**
 * As fotos, uma por item, e só para os dois com registro de resultado.
 *
 * Ficam aqui, não em lib/esteticaFacial.ts: lib/ é dado puro, sem depender do
 * tipo de imagem do Next — mesma separação que Estrutura.tsx já usa. Limpeza
 * de pele não tem foto porque não veio nenhuma da clínica para esse item; um
 * espaço em branco ali é melhor que preencher com banco de imagens.
 */
const fotos: Partial<Record<string, { src: StaticImageData; alt: string }>> = {
  botox: {
    src: botoxAntesDepois,
    alt: "Testa antes e depois da aplicação de botox, com as rugas de expressão suavizadas",
  },
  "harmonizacao-facial": {
    src: harmonizacaoFacialPerfil,
    alt: "Paciente de perfil após harmonização facial",
  },
};

/**
 * Uma faixa curta, não uma seção-herói.
 *
 * A clínica pediu para incluir, mas foi explícita que não é o foco — então o
 * peso visual precisa mostrar isso: fundo diferente do que vem antes e
 * depois (para marcar "isto é um parênteses"), título menor, sem a
 * tipografia grande de destaque que Tratamentos usa para os nomes, e as fotos
 * pequenas — miniatura ao lado do texto, não uma foto de largura total como
 * as da Estrutura.
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

          <ul className="grid gap-8 sm:grid-cols-3">
            {servicosComplementares.map((s) => {
              const foto = fotos[s.id];
              return (
                <li key={s.id}>
                  {foto && (
                    <div className="mb-3 aspect-[4/5] w-24 overflow-hidden rounded-[var(--radius-card)] bg-white sm:w-full">
                      <Image
                        src={foto.src}
                        alt={foto.alt}
                        placeholder="blur"
                        sizes="(max-width: 640px) 96px, 220px"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-medium text-ink">{s.nome}</h3>
                  <p className="mt-1.5 text-sm text-texto">{s.descricao}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <a
          href={whatsappSobre("estética facial")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-azul/45 px-5 py-2.5 text-sm font-medium text-azul transition-colors hover:bg-azul hover:text-white"
        >
          <IconeWhatsapp className="h-4 w-4" />
          Perguntar sobre estética facial
        </a>
      </div>
    </section>
  );
}
