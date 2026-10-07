/**
 * Ponto único do GSAP no projeto. Todo componente animado importa daqui, para
 * os plugins serem registrados uma vez só e só no navegador (no servidor não
 * existe `window`, e o ScrollTrigger precisa dele).
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Só para o QA: o scripts/prints.mjs procura window.ScrollTrigger para achar
  // os trechos fixados. Importado pelo npm, o plugin não fica global sozinho.
  (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
}

// A instância do Lenis vive aqui, e não num contexto React, para menus e
// botões de âncora rolarem a página sem precisar de provider.
let lenisAtual: Lenis | null = null;
export const definirLenis = (lenis: Lenis | null) => { lenisAtual = lenis; };
export const obterLenis = () => lenisAtual;

/** Rola até uma posição (px), um seletor ou um elemento, com ou sem Lenis. */
export function rolarPara(alvo: number | string | HTMLElement, opcoes: { offset?: number; duracao?: number } = {}) {
  const { offset = 0, duracao = 1.6 } = opcoes;
  if (lenisAtual) {
    lenisAtual.scrollTo(alvo, { offset, duration: duracao });
    return;
  }
  const el = typeof alvo === 'string' ? document.querySelector<HTMLElement>(alvo) : alvo;
  const y = typeof el === 'number' ? el : el ? el.getBoundingClientRect().top + window.scrollY : 0;
  window.scrollTo({ top: y + offset });
}

export const prefereMenosMovimento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Condição usada em gsap.matchMedia(): só anima quem não pediu menos movimento. */
export const COM_MOVIMENTO = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, useGSAP };
