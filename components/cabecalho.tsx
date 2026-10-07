"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Marca } from "@/components/marca";
import { clinica, linkTelefone, linkWhatsapp } from "@/lib/clinica";
import { obterLenis, rolarPara } from "@/lib/motion";

const links = [
  { rotulo: "Tratamentos", alvo: "#tratamentos" },
  { rotulo: "A clínica", alvo: "#clinica" },
  { rotulo: "Perguntas", alvo: "#perguntas" },
  { rotulo: "Como chegar", alvo: "#visita" },
];

/**
 * Cabeçalho fixo. Some quando a pessoa rola para baixo e volta quando ela
 * rola para cima, para não cobrir as cenas fixadas. No celular, o menu ocupa
 * a tela, deixa o resto da página `inert`, fecha com Esc e devolve o foco.
 */
export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [oculto, setOculto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ultimo = window.scrollY;
    const aoRolar = () => {
      const y = window.scrollY;
      setOculto(y > 200 && y > ultimo + 2 ? true : y < ultimo - 2 ? false : (v) => v);
      ultimo = y;
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  const fechar = useCallback((devolverFoco = true) => {
    setAberto(false);
    if (devolverFoco) botao.current?.focus();
  }, []);

  useEffect(() => {
    const resto = document.querySelectorAll<HTMLElement>("main, footer");
    if (!aberto) {
      resto.forEach((el) => el.removeAttribute("inert"));
      obterLenis()?.start();
      return;
    }
    resto.forEach((el) => el.setAttribute("inert", ""));
    obterLenis()?.stop();
    menu.current?.querySelector<HTMLElement>("a")?.focus();
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto, fechar]);

  const irPara = (alvo: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (aberto) {
      // A rolagem suave fica parada com o menu aberto; sem religar, o link não rola.
      obterLenis()?.start();
      fechar(false);
    }
    rolarPara(alvo, { offset: 0 });
  };

  return (
    <>
      <header className={`cabecalho${oculto && !aberto ? " is-oculto" : ""}`}>
        <a href="#topo" className="cabecalho__marca" aria-label="Sencis, voltar ao início" onClick={irPara("#topo")}>
          <Marca />
        </a>
        <nav className="cabecalho__nav" aria-label="Principal">
          {links.map((l) => (
            <a key={l.alvo} href={l.alvo} onClick={irPara(l.alvo)}>
              {l.rotulo}
            </a>
          ))}
        </nav>
        <a className="botao botao--cheio cabecalho__cta" href={linkWhatsapp} target="_blank" rel="noopener noreferrer">
          Agendar avaliação
        </a>
        <button
          ref={botao}
          type="button"
          className="cabecalho__menu"
          aria-expanded={aberto}
          aria-controls="menu-celular"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? "Fechar" : "Menu"}
        </button>
      </header>

      <div id="menu-celular" ref={menu} className="menu" hidden={!aberto} role="dialog" aria-modal="true" aria-label="Menu">
        <nav aria-label="Menu">
          {links.map((l) => (
            <a key={l.alvo} href={l.alvo} onClick={irPara(l.alvo)}>
              {l.rotulo}
            </a>
          ))}
        </nav>
        <div className="menu__acoes">
          <a className="botao botao--cheio" href={linkWhatsapp} target="_blank" rel="noopener noreferrer">
            Agendar avaliação
          </a>
          <a className="botao botao--contorno" href={linkTelefone}>
            Ligar {clinica.telefone.formatado}
          </a>
        </div>
      </div>
    </>
  );
}
