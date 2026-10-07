import { FioCamada } from "@/components/fio-camada";
import { perguntas } from "@/lib/conteudo";

/** Perguntas frequentes com <details> nativo: abre e fecha sem JavaScript. */
export function Perguntas() {
  return (
    <section id="perguntas" className="perguntas" data-fio="perguntas" aria-labelledby="perguntas-titulo">
      <FioCamada />
      <h2 id="perguntas-titulo" className="titulo-secao">
        Antes de marcar
      </h2>
      <div className="perguntas__lista">
        {perguntas.map((p) => (
          <details className="pergunta" key={p.pergunta}>
            <summary>
              <span>{p.pergunta}</span>
              <span className="pergunta__sinal" aria-hidden="true" />
            </summary>
            <p>{p.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
