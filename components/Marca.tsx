/**
 * O logotipo, em texto.
 *
 * A placa da fachada é um letreiro dourado retroiluminado sobre mármore claro.
 * Em vez de imitar o letreiro com uma imagem (que não escala nem é lida por
 * leitor de tela), a marca é composta em tipo, e a luz do letreiro vira um
 * filete quente entre a palavra e a descrição.
 */
export function Marca({
  tom = "escuro",
  tamanho = "padrao",
}: {
  tom?: "escuro" | "claro";
  tamanho?: "padrao" | "grande";
}) {
  const corTexto = tom === "escuro" ? "text-ink" : "text-white";
  const corLegenda = tom === "escuro" ? "text-texto" : "text-nude/70";
  const escala =
    tamanho === "grande"
      ? "text-[1.75rem] sm:text-[2.25rem]"
      : "text-[1.35rem] sm:text-[1.5rem]";
  const escalaLegenda =
    tamanho === "grande"
      ? "text-[0.6rem] sm:text-[0.68rem]"
      : "text-[0.5rem] sm:text-[0.56rem]";

  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span
        className={`font-sans font-medium tracking-[0.2em] ${escala} ${corTexto}`}
      >
        SENCIS
      </span>
      <span
        aria-hidden
        className="mt-[0.35em] h-px w-full bg-gradient-to-r from-azul via-bege to-transparent"
      />
      <span
        className={`mt-[0.5em] font-sans font-medium tracking-[0.3em] ${escalaLegenda} ${corLegenda}`}
      >
        ODONTOLOGIA&nbsp;INTEGRADA
      </span>
    </span>
  );
}
