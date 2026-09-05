import Image, { type StaticImageData } from "next/image";
import { linkWhatsapp } from "@/lib/clinica";
import fachada from "@/public/fotos/sencisfaxada.png";
import espera2 from "@/public/fotos/sencisespera2.png";
import mordomias from "@/public/fotos/sencisesperamordomias.png";
import corredor from "@/public/fotos/sencisestrutura.png";
import consultorio from "@/public/fotos/sencissaladeatendimento.png";
import consultorio2 from "@/public/fotos/sencissaladeatendimento2.png";

/**
 * O passeio pela clínica.
 *
 * O recorte de cada foto segue a orientação do arquivo original: as horizontais
 * ficam em 3:2 e as verticais em 3:4. Forçar uma fachada horizontal dentro de
 * uma moldura vertical cortava o letreiro no meio — justamente a imagem que a
 * pessoa usa para reconhecer o lugar da calçada.
 */
type Ambiente = {
  foto: StaticImageData;
  alt: string;
  titulo: string;
  /** A legenda diz para que serve o espaço, não só como ele se chama. */
  nota: string;
  colunas: string;
  proporcao: string;
};

const ambientes: Ambiente[] = [
  {
    foto: fachada,
    alt: "Fachada da Sencis Odontologia com letreiro dourado iluminado sobre a entrada",
    titulo: "A entrada, na avenida",
    nota: "Térrea, sem degrau na porta, com vaga na via em frente.",
    colunas: "sm:col-span-3",
    proporcao: "aspect-[3/2]",
  },
  {
    foto: consultorio,
    alt: "Consultório da Sencis com a cadeira odontológica voltada para uma janela do chão ao teto",
    titulo: "Consultório com luz natural",
    nota: "A cadeira fica de frente para a janela. Você olha para fora, não para o refletor.",
    colunas: "sm:col-span-3",
    proporcao: "aspect-[3/2]",
  },
  {
    foto: espera2,
    alt: "Recepção da Sencis com sofá, poltrona e iluminação indireta",
    titulo: "Recepção",
    nota: "Espaço para acompanhante, sem a fila de cadeiras encostadas na parede.",
    colunas: "sm:col-span-2",
    proporcao: "aspect-[3/4]",
  },
  {
    foto: consultorio2,
    alt: "Bancada de apoio ao lado da cadeira odontológica, com instrumental organizado",
    titulo: "Bancada de apoio",
    nota: "O instrumental fica organizado ao lado da cadeira, à vista, e não em uma sala nos fundos.",
    colunas: "sm:col-span-2",
    proporcao: "aspect-[3/4]",
  },
  {
    foto: corredor,
    alt: "Circulação interna da Sencis ligando a recepção aos consultórios",
    titulo: "Circulação",
    nota: "Percurso curto e reservado entre a recepção e o atendimento.",
    colunas: "sm:col-span-2",
    proporcao: "aspect-[3/4]",
  },
  {
    foto: mordomias,
    alt: "Cantinho do café da recepção da Sencis, com bule, xícara e biscoitos",
    titulo: "Café e água",
    nota: "Chegou adiantada? Sirva-se enquanto espera.",
    colunas: "sm:col-span-3",
    proporcao: "aspect-[3/2]",
  },
];

export function Estrutura() {
  return (
    <section id="estrutura" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-[52ch]">
          <h2 className="font-display text-[2.25rem] leading-[1.08] text-ink sm:text-[2.75rem]">
            Onde você vai ser atendida
          </h2>
          <p className="mt-5 text-clay">
            As fotos são da clínica de verdade, sem banco de imagens. O que você
            vê aqui é o que encontra quando abre a porta.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-x-4 gap-y-8 sm:grid-cols-6">
          {ambientes.map((a) => (
            <figure key={a.titulo} className={a.colunas}>
              <div
                className={`overflow-hidden rounded-[var(--radius-card)] bg-sand ${a.proporcao}`}
              >
                <Image
                  src={a.foto}
                  alt={a.alt}
                  placeholder="blur"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3">
                <span className="block font-medium text-ink">{a.titulo}</span>
                <span className="mt-0.5 block max-w-[42ch] text-sm text-clay">
                  {a.nota}
                </span>
              </figcaption>
            </figure>
          ))}

          {/* Fecha a última linha do mosaico com o convite, em vez de com
              um espaço vazio ou uma sétima foto de enchimento. */}
          <div className="flex flex-col justify-center rounded-[var(--radius-card)] border border-sand-deep p-7 sm:col-span-3">
            <p className="font-display text-2xl text-ink">
              Quer conhecer antes de marcar?
            </p>
            <p className="mt-3 max-w-[38ch] text-clay">
              Dá para passar aqui só para ver a clínica e conversar, sem
              consulta e sem compromisso. Avise antes para a recepção te
              esperar.
            </p>
            <a
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 self-start rounded-full border border-ink px-6 py-3 font-medium text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Combinar uma visita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
