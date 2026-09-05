import { Cabecalho } from "@/components/Cabecalho";
import { Hero } from "@/components/Hero";
import { Tratamentos } from "@/components/Tratamentos";
import { Clinica } from "@/components/Clinica";
import { Estrutura } from "@/components/Estrutura";
import { Agendar } from "@/components/Agendar";
import { Perguntas } from "@/components/Perguntas";
import { Localizacao } from "@/components/Localizacao";
import { Rodape } from "@/components/Rodape";
import { BarraWhatsapp } from "@/components/BarraWhatsapp";

export default function Pagina() {
  return (
    <>
      <a
        href="#tratamentos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Cabecalho />

      <main>
        <Hero />
        <Tratamentos />
        <Clinica />
        <Estrutura />
        <Agendar />
        <Perguntas />
        <Localizacao />
      </main>

      <Rodape />
      <BarraWhatsapp />
    </>
  );
}
