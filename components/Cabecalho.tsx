"use client";

import { useEffect, useState } from "react";
import { Marca } from "./Marca";
import { linkWhatsapp } from "@/lib/clinica";

const secoes = [
  { href: "#tratamentos", rotulo: "Tratamentos" },
  { href: "#clinica", rotulo: "A clínica" },
  { href: "#estrutura", rotulo: "Estrutura" },
  { href: "#perguntas", rotulo: "Perguntas" },
  { href: "#localizacao", rotulo: "Como chegar" },
];

export function Cabecalho() {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Com o menu aberto, travar o fundo evita a rolagem fantasma no iOS.
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  useEffect(() => {
    if (!menuAberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [menuAberto]);

  return (
    <>
      {/* Uma linha sólida, fixa, no ponto mais alto da página — o primeiro
          pixel de cor que a pessoa vê, antes até do header. O gradiente do
          Hero é atmosfera e depende de rolar até lá; esta faixa está sempre
          presente, em qualquer altura de rolagem. */}
      <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-1 bg-azul" />

      <header
        className={`fixed inset-x-0 top-1 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
          rolou || menuAberto
            ? "bg-white/90 py-3 shadow-topo backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          <a href="#topo" aria-label="Sencis — início" className="shrink-0">
            <Marca />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {secoes.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="relative text-[0.9375rem] text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-azul after:transition-[width] after:duration-300 hover:after:w-full"
                  >
                    {s.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-ink-soft sm:inline-block"
            >
              Agendar avaliação
            </a>

            <button
              type="button"
              onClick={() => setMenuAberto((v) => !v)}
              aria-expanded={menuAberto}
              aria-controls="menu-mobile"
              aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-linha text-ink transition-colors hover:bg-nude lg:hidden"
            >
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                    menuAberto ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-200 ${
                    menuAberto ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                    menuAberto ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* O painel fica FORA do <header> de propósito: o header usa
          backdrop-filter quando fica opaco, e backdrop-filter cria bloco de
          contenção para descendentes com position:fixed — de dentro dele, o
          painel se ancorava na altura do header (73px) em vez da tela. */}
      <div
        id="menu-mobile"
        hidden={!menuAberto}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto border-t border-linha bg-white px-5 pb-10 pt-8 sm:px-8 lg:hidden"
      >
        <nav aria-label="Navegação do menu">
          <ul className="lista-filete">
            {secoes.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  onClick={() => setMenuAberto(false)}
                  className="font-display block py-4 text-[1.75rem] text-ink"
                >
                  {s.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuAberto(false)}
          className="mt-8 block rounded-full bg-ink px-6 py-4 text-center font-medium text-white"
        >
          Agendar avaliação no WhatsApp
        </a>
      </div>
    </>
  );
}
