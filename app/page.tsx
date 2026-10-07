import { Cabecalho } from "@/components/cabecalho";
import { FioDaPagina } from "@/components/fio-da-pagina";
import { Rodape } from "@/components/rodape";
import { Abertura } from "@/components/secoes/abertura";
import { Clinica } from "@/components/secoes/clinica";
import { Encontro } from "@/components/secoes/encontro";
import { Perguntas } from "@/components/secoes/perguntas";
import { PrimeiraConsulta } from "@/components/secoes/primeira-consulta";
import { Resultados } from "@/components/secoes/resultados";
import { Rosto } from "@/components/secoes/rosto";
import { Tratamentos } from "@/components/secoes/tratamentos";
import { Visita } from "@/components/secoes/visita";
import { WhatsappFixo } from "@/components/whatsapp-fixo";

/**
 * Ordem da página = ordem dos ScrollTriggers. Cada seção fixada acrescenta
 * espaço, e os gatilhos de baixo contam com os de cima.
 * Fixadas: o encontro e os tratamentos. Nenhuma outra.
 * O FioDaPagina vem depois de tudo: os gatilhos do fio nascem depois dos pins.
 */
export default function Pagina() {
  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo">
        <Abertura />
        <Encontro />
        <PrimeiraConsulta />
        <Tratamentos />
        <Resultados />
        <Rosto />
        <Clinica />
        <Perguntas />
        <Visita />
      </main>
      <Rodape />
      <FioDaPagina />
      <WhatsappFixo />
    </>
  );
}
