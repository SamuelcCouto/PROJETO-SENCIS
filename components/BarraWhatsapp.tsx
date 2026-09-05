"use client";

import { useEffect, useState } from "react";
import { linkWhatsapp } from "@/lib/clinica";
import { IconeWhatsapp } from "./icones";

/**
 * Barra fixa de contato no mobile.
 *
 * Só aparece depois que a pessoa passa do hero — antes disso o botão principal
 * já está na tela, e dois convites simultâneos para a mesma ação só tiram
 * espaço de leitura. É a única coisa que entra em cena sozinha fora do hero.
 */
export function BarraWhatsapp() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () =>
      setVisivel(window.scrollY > window.innerHeight * 0.85);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visivel ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={linkWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visivel ? 0 : -1}
        aria-hidden={!visivel}
        className="flex items-center justify-center gap-2.5 rounded-full bg-bege px-6 py-3.5 font-medium text-ink"
      >
        <IconeWhatsapp className="h-5 w-5" />
        Agendar no WhatsApp
      </a>
    </div>
  );
}
