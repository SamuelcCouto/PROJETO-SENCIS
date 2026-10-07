import Link from "next/link";
import { Marca } from "@/components/marca";

export default function NaoEncontrado() {
  return (
    <main className="nao-encontrado">
      <Marca descritor />
      <h1 className="titulo-secao">Esta página não existe</h1>
      <p>O endereço que você abriu não leva a nada no site. Tratamentos, a clínica e o agendamento estão na página inicial.</p>
      <Link className="botao botao--cheio" href="/">
        Voltar para o início
      </Link>
    </main>
  );
}
