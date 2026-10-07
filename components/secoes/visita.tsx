import { FioCamada } from "@/components/fio-camada";
import { MapaSobDemanda } from "@/components/mapa-sob-demanda";
import { clinica, linkComoChegar, linkTelefone, linkWhatsapp } from "@/lib/clinica";

export function Visita() {
  const e = clinica.endereco;
  return (
    <section id="visita" className="visita" data-fio="visita" aria-labelledby="visita-titulo">
      <FioCamada />
      <div className="visita__texto">
        <h2 id="visita-titulo" className="titulo-secao">
          Venha conhecer
        </h2>
        <div className="visita__grade">
          <div>
            <h3>Endereço</h3>
            <address>
              {e.logradouro}
              <br />
              {e.complemento}
              <br />
              {e.bairro}, {e.cidade}/{e.estado}
              <br />
              CEP {e.cep}
            </address>
            <a className="link link--claro" href={linkComoChegar} target="_blank" rel="noopener noreferrer">
              Abrir a rota no Google Maps
            </a>
          </div>
          <div>
            <h3>Horário</h3>
            <dl className="visita__horarios">
              {clinica.horarios.map((h) => (
                <div key={h.dias}>
                  <dt>{h.dias}</dt>
                  <dd>{h.faixas.join(" e ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="visita__acoes">
          <a className="botao botao--claro" href={linkWhatsapp} target="_blank" rel="noopener noreferrer">
            Agendar pelo WhatsApp
          </a>
          <a className="botao botao--contorno-claro" href={linkTelefone}>
            Ligar {clinica.telefone.formatado}
          </a>
        </div>
        <p className="visita__nota">Com dor? Ligue em vez de mandar mensagem: urgência tem prioridade na agenda.</p>
      </div>
      <MapaSobDemanda />
    </section>
  );
}
