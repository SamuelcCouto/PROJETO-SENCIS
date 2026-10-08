import { FioCamada } from "@/components/fio-camada";
import { whatsappSobre } from "@/lib/clinica";
import { rosto } from "@/lib/conteudo";

/** Botox, harmonização e limpeza de pele: secundários, com peso visual menor de propósito. */
export function Rosto() {
  return (
    <section className="rosto" data-fio="rosto" aria-labelledby="rosto-titulo">
      <FioCamada />
      <div className="rosto__cabeca">
        <h2 id="rosto-titulo" className="rosto__titulo">
          {rosto.titulo}
        </h2>
        <p>{rosto.intro}</p>
      </div>
      <dl className="rosto__lista">
        {rosto.servicos.map((s) => (
          <div key={s.nome}>
            <dt>{s.nome}</dt>
            <dd>{s.descricao}</dd>
          </div>
        ))}
      </dl>
      <a className="link rosto__link" href={whatsappSobre("botox, harmonização e limpeza de pele")} target="_blank" rel="noopener noreferrer">
        Perguntar sobre esses cuidados no WhatsApp
      </a>
    </section>
  );
}
