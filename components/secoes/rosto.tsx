import { FioCamada } from "@/components/fio-camada";
import { whatsappSobre } from "@/lib/clinica";
import { rosto } from "@/lib/conteudo";

/** Harmonização orofacial: serviço secundário, com peso visual menor de propósito. */
export function Rosto() {
  return (
    <section className="rosto" data-fio="rosto" aria-labelledby="rosto-titulo">
      <FioCamada />
      <div className="rosto__cabeca">
        <h2 id="rosto-titulo" className="rosto__titulo">
          Harmonização orofacial
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
      <a className="link rosto__link" href={whatsappSobre("harmonização orofacial")} target="_blank" rel="noopener noreferrer">
        Perguntar sobre harmonização no WhatsApp
      </a>
    </section>
  );
}
