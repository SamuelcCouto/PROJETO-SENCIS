import { Marca } from "./Marca";
import { clinica, enderecoLinhaUnica } from "@/lib/clinica";

const navegacao = [
  { href: "#tratamentos", rotulo: "Tratamentos" },
  { href: "#camera-intraoral", rotulo: "Câmera intraoral" },
  { href: "#clinica", rotulo: "A clínica" },
  { href: "#estrutura", rotulo: "Estrutura" },
  { href: "#agendar", rotulo: "Agendar" },
  { href: "#perguntas", rotulo: "Perguntas" },
  { href: "#localizacao", rotulo: "Como chegar" },
];

export function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-ink pt-16 pb-28 text-nude sm:pb-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Marca tom="claro" tamanho="grande" />
            <p className="mt-6 max-w-[38ch] text-sm text-nude/70">
              {enderecoLinhaUnica}
            </p>
            <p className="mt-3 text-sm text-nude/70">
              {clinica.telefone.formatado} · {clinica.social.instagramHandle}
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {navegacao.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-nude/80 transition-colors hover:text-bege"
                  >
                    {n.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-nude/55">
          <p>
            Responsável técnica: {clinica.responsavel.nome} ·{" "}
            {clinica.responsavel.cro} · Clínica {clinica.croClinica}
          </p>
          <p className="mt-2">
            © {ano} {clinica.nome}. As informações deste site não substituem uma
            consulta odontológica.
          </p>
        </div>
      </div>
    </footer>
  );
}
