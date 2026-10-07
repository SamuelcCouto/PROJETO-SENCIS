import { N_LOGO, N_VIEWBOX } from "@/lib/traco";

/**
 * Logotipo provisório, redesenhado a partir do letreiro da fachada: SENCIS em
 * caixa-alta geométrica com o N em traço caligráfico. Troque pelo SVG oficial
 * quando a clínica enviar.
 *
 * O tamanho vem do font-size de quem usa (a marca é medida em em). O N é um
 * SVG com a base na linha de base do texto; `data-n` deixa a animação de
 * traço achar o caminho sem depender da classe.
 */
export function Marca({
  descritor = false,
  className = "",
  titulo = "Sencis",
}: {
  descritor?: boolean;
  className?: string;
  titulo?: string;
}) {
  return (
    <span className={`marca ${className}`} role="img" aria-label={descritor ? `${titulo} Odontologia Integrada` : titulo}>
      <span className="marca__nome" aria-hidden="true">
        <span className="marca__letras" data-marca-letras>SE</span>
        <svg className="marca__n" viewBox={N_VIEWBOX} aria-hidden="true" focusable="false">
          <path d={N_LOGO} pathLength={1000} data-n />
        </svg>
        <span className="marca__letras" data-marca-letras>CIS</span>
      </span>
      {descritor ? (
        <span className="marca__descritor" aria-hidden="true">
          Odontologia integrada
        </span>
      ) : null}
    </span>
  );
}
