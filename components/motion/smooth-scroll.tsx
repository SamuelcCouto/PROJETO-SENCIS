'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { definirLenis, gsap, prefereMenosMovimento, ScrollTrigger } from '@/lib/motion';

/**
 * Rolagem suave ligada ao ScrollTrigger. Vai uma vez no layout raiz e não
 * renderiza nada: não envolve a página num provider, então as seções
 * continuam sendo componentes de servidor.
 */
export function SmoothScroll() {
  useEffect(() => {
    let ativo = true;
    // As fontes mudam a altura do texto; as posições dos gatilhos são
    // recalculadas quando elas terminam de carregar.
    document.fonts.ready.then(() => {
      if (ativo) ScrollTrigger.refresh();
    });

    if (prefereMenosMovimento()) {
      return () => { ativo = false; };
    }

    const lenis = new Lenis({ lerp: 0.09 });
    definirLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const avancar = (tempo: number) => lenis.raf(tempo * 1000);
    gsap.ticker.add(avancar);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ativo = false;
      gsap.ticker.remove(avancar);
      lenis.destroy();
      definirLenis(null);
    };
  }, []);

  return null;
}
