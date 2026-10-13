"use client";

import Image from "next/image";
import { useState } from "react";
import { linkMapaEmbed } from "@/lib/clinica";

/**
 * O mapa do Google só carrega quando a pessoa pede. Assim a página não manda
 * dados ao Google sem consentimento (LGPD) e não paga o peso do iframe.
 */
export function MapaSobDemanda() {
  const [carregado, setCarregado] = useState(false);

  if (carregado) {
    return (
      <div className="mapa">
        <iframe
          src={linkMapaEmbed}
          title="Mapa com a localização da Sencis no Parque Amazônia, Goiânia"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="mapa">
      <Image src="/fotos/fachada.png" alt="Fachada da Sencis, com o letreiro dourado sobre a entrada" fill sizes="(min-width: 1024px) 40vw, 92vw" />
      <button type="button" className="botao botao--claro mapa__botao" onClick={() => setCarregado(true)}>
        Mostrar o mapa do Google
      </button>
    </div>
  );
}
