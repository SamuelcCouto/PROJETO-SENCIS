import { FioCamada } from "@/components/fio-camada";
import { Marca } from "@/components/marca";
import { clinica } from "@/lib/clinica";

export function Rodape() {
  return (
    <footer className="rodape" data-fio="rodape">
      <FioCamada />
      <div className="rodape__marca">
        <Marca descritor />
        <p className="rodape__assinatura">{clinica.assinatura}</p>
      </div>
      <div className="rodape__info">
        <p>
          {clinica.responsavel.nome}
          <br />
          {clinica.responsavel.cargo}, {clinica.responsavel.cro}
        </p>
        <p>
          {clinica.nome}, {clinica.croClinica}
        </p>
      </div>
      <div className="rodape__info">
        <a className="link link--claro" href={clinica.social.instagram} target="_blank" rel="noopener noreferrer">
          Instagram {clinica.social.instagramHandle}
        </a>
        <p>
          {clinica.endereco.bairro}, {clinica.endereco.cidade}/{clinica.endereco.estado}
        </p>
      </div>
    </footer>
  );
}
