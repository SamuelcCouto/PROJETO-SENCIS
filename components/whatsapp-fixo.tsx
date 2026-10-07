"use client";

import { useEffect, useState } from "react";
import { linkWhatsapp } from "@/lib/clinica";

/** Botão de agendamento fixo no celular: aparece depois da abertura e some no rodapé. */
export function WhatsappFixo() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const abertura = document.getElementById("topo");
    const rodape = document.querySelector("footer");
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const passouAbertura = abertura ? abertura.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const noRodape = rodape ? rodape.getBoundingClientRect().top < window.innerHeight : false;
      setVisivel(passouAbertura && !noRodape);
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, []);

  return (
    <a
      className={`whatsapp-fixo${visivel ? " is-visivel" : ""}`}
      href={linkWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel}
    >
      Agendar pelo WhatsApp
    </a>
  );
}
