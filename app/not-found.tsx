import Link from "next/link";
import { Marca } from "@/components/Marca";

export default function NaoEncontrado() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-20">
      <div className="max-w-[44ch] text-center">
        <Marca tamanho="grande" />
        <h1 className="font-display mt-10 text-[2.25rem] leading-tight text-ink">
          Esta página não existe
        </h1>
        <p className="mt-4 text-clay">
          O endereço que você abriu não corresponde a nada no site. Volte para o
          início — tratamentos, estrutura e agendamento estão todos lá.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-ink px-7 py-4 font-medium text-white transition-colors hover:bg-ink-soft"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
