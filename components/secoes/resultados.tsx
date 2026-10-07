import Image from "next/image";
import { FioCamada } from "@/components/fio-camada";

/**
 * Resultados: casos atendidos na clínica, que a própria clínica pediu para
 * publicar. As fotos aparecem inteiras. As colunas deixam um corredor no meio
 * (coluna 7), por onde o fio desce no desktop.
 */
const casos = [
  {
    src: "/fotos/implantes-lentes-porcelana.jpg",
    alt: "Sorriso aproximado com as lentes de porcelana já colocadas nos dentes da frente",
    largura: 1600,
    altura: 1066,
    legenda: "Implantes e lentes de porcelana",
    classe: "resultados__foto--a",
  },
  {
    src: "/fotos/harmonizacao-facial-montagem.jpg",
    alt: "Montagem com quatro fotos do rosto de uma paciente, de frente e de perfil, antes e depois da harmonização facial",
    largura: 876,
    altura: 1236,
    legenda: "Harmonização facial, antes e depois",
    classe: "resultados__foto--b",
  },
  {
    src: "/fotos/botox-testa-antes-depois.jpg",
    alt: "Testa de uma paciente com as rugas de expressão antes (em cima) e suavizadas depois do botox (embaixo)",
    largura: 640,
    altura: 734,
    legenda: "Botox na testa: antes, em cima, e depois",
    classe: "resultados__foto--c",
  },
];

export function Resultados() {
  return (
    <section className="resultados" data-fio="resultados" aria-labelledby="resultados-titulo">
      <FioCamada />
      <div className="resultados__cabeca">
        <h2 id="resultados-titulo" className="titulo-secao">
          Resultados
        </h2>
        <p>Casos atendidos na Sencis. Cada um começou pela avaliação e pelo plano escrito.</p>
      </div>
      {casos.map((c) => (
        <figure className={`resultados__foto ${c.classe}`} key={c.src}>
          <Image src={c.src} alt={c.alt} width={c.largura} height={c.altura} sizes="(min-width: 1024px) 40vw, 92vw" />
          <figcaption>{c.legenda}</figcaption>
        </figure>
      ))}
    </section>
  );
}
