import Image, { type StaticImageData } from "next/image";
import { linkWhatsapp } from "@/lib/clinica";
import { VideoAmbiente } from "./VideoAmbiente";
import fachada from "@/public/fotos/fachada.png";
import recepcaoSofa from "@/public/fotos/recepcao-sofa.png";
import recepcaoCafe from "@/public/fotos/recepcao-cafe.png";
import consultorioJanela from "@/public/fotos/consultorio-janela.png";
import cameraIntraoralDetalhe from "@/public/fotos/camera-intraoral-detalhe.jpg";

/**
 * O passeio pela clínica.
 *
 * O recorte de cada peça segue a orientação do arquivo: horizontais em 3:2,
 * verticais em 3:4. Forçar uma fachada horizontal numa moldura vertical já
 * cortou o letreiro no meio.
 *
 * Os dois clipes entram aqui, e não numa seção própria, porque resolvem a
 * fraqueza desta seção: eram só ambientes vazios. Com eles a galeria passa a
 * mostrar a clínica funcionando, que é o que a pessoa quer saber.
 */
type Peca = {
  alt: string;
  titulo: string;
  /** A legenda diz para que serve o espaço, não só como ele se chama. */
  nota: string;
  colunas: string;
  proporcao: string;
} & (
  | { foto: StaticImageData; video?: never }
  | { foto?: never; video: { src: string; poster: string } }
);

const pecas: Peca[] = [
  {
    foto: fachada,
    alt: "Fachada da Sencis Odontologia com letreiro dourado iluminado sobre a entrada",
    titulo: "A entrada, na avenida",
    nota: "Térrea, sem degrau na porta, com vaga na via em frente.",
    colunas: "sm:col-span-3",
    proporcao: "aspect-[3/2]",
  },
  {
    foto: consultorioJanela,
    alt: "Consultório da Sencis com a cadeira odontológica voltada para uma janela do chão ao teto",
    titulo: "Consultório com luz natural",
    nota: "A cadeira fica de frente para a janela. Você olha para fora, não para o refletor.",
    colunas: "sm:col-span-3",
    proporcao: "aspect-[3/2]",
  },
  {
    foto: recepcaoSofa,
    alt: "Recepção da Sencis com sofá, poltrona e iluminação indireta",
    titulo: "Recepção",
    nota: "Espaço para acompanhante, sem a fila de cadeiras encostadas na parede.",
    colunas: "sm:col-span-2",
    proporcao: "aspect-[3/4]",
  },
  {
    video: {
      src: "/videos/endodontia-canal.mp4",
      poster: "/videos/endodontia-canal-poster.jpg",
    },
    alt: "Dentista de touca e máscara trabalhando com o fotopolimerizador durante um tratamento de canal",
    titulo: "Tratamento de canal",
    nota: "Sem pressa e com o tempo que o caso pedir. Canal deixou de ser sinônimo de sofrimento.",
    colunas: "sm:col-span-2",
    proporcao: "aspect-[3/4]",
  },
  {
    foto: cameraIntraoralDetalhe,
    alt: "Tablet mostrando a imagem ampliada de um dente captada pela câmera intraoral durante o atendimento",
    titulo: "Câmera intraoral",
    nota: "O dente ampliado na tela, ao vivo, para você olhar junto.",
    colunas: "sm:col-span-2",
    proporcao: "aspect-[3/4]",
  },
  {
    video: {
      src: "/videos/ortodontia-manutencao.mp4",
      poster: "/videos/ortodontia-manutencao-poster.jpg",
    },
    alt: "Dentista atendendo uma paciente na cadeira durante a manutenção mensal do aparelho",
    titulo: "Manutenção de aparelho",
    nota: "A consulta mensal de quem usa aparelho, com hora marcada e sem espera.",
    colunas: "sm:col-span-2",
    proporcao: "aspect-[3/4]",
  },
  {
    foto: recepcaoCafe,
    alt: "Cantinho do café da recepção da Sencis, com bule, xícara e biscoitos",
    titulo: "Café e água",
    nota: "Chegou adiantada? Sirva-se enquanto espera.",
    colunas: "sm:col-span-2",
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
          <p className="mt-5 text-texto">
            As imagens são da clínica de verdade, sem banco de imagens. O que
            você vê aqui é o que encontra quando abre a porta.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-x-4 gap-y-8 sm:grid-cols-6">
          {pecas.map((p) => (
            <figure key={p.titulo} className={p.colunas}>
              <div
                className={`overflow-hidden rounded-[var(--radius-card)] bg-nude ${p.proporcao}`}
              >
                {p.video ? (
                  <VideoAmbiente
                    src={p.video.src}
                    poster={p.video.poster}
                    descricao={p.alt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={p.foto}
                    alt={p.alt}
                    placeholder="blur"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <figcaption className="mt-3">
                <span className="block font-medium text-ink">{p.titulo}</span>
                <span className="mt-0.5 block max-w-[42ch] text-sm text-texto">
                  {p.nota}
                </span>
              </figcaption>
            </figure>
          ))}

          {/* Fecha a última linha do mosaico com o convite, em vez de com um
              espaço vazio ou uma foto de enchimento. */}
          <div className="flex flex-col justify-center rounded-[var(--radius-card)] border border-linha p-7 sm:col-span-2">
            <p className="font-display text-2xl text-ink">
              Quer conhecer antes de marcar?
            </p>
            <p className="mt-3 text-texto">
              Dá para passar aqui só para ver a clínica e conversar, sem
              consulta e sem compromisso.
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
