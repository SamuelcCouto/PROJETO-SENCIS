'use client';

import type { RefObject } from 'react';
import { COM_MOVIMENTO, gsap, useGSAP } from '@/lib/motion';

type Seletor = (seletor: string) => Element[];

type Opcoes = {
  /** Quanto de rolagem a cena dura, na sintaxe do ScrollTrigger ('+=60%', '+=1200'). */
  duracao?: string | (() => string);
  /** Fixa a seção durante a cena. Com false, a cena só acompanha a rolagem. */
  fixar?: boolean;
  /** true = segue a rolagem exatamente; número = segundos de atraso (mais "pesado"). */
  suavizar?: boolean | number;
  /** Prende a rolagem em pontos ao soltar: um número N = N passos iguais; ou uma lista de 0 a 1. */
  passos?: number | number[];
  /** Estado final para quem pediu menos movimento. */
  semMovimento?: (q: Seletor) => void;
};

/**
 * Mecânica sem gesto: fixa a seção e amarra uma timeline à rolagem.
 *
 * O que se move e como (o gesto) é escrito por cada projeto em `montar`, a
 * partir da identidade de movimento da marca (references/identidade-de-movimento.md).
 * Os componentes HeroFixado e ColecaoHorizontal são os gestos da ORVA escritos
 * à mão; este hook existe para que outro projeto não precise copiá-los.
 *
 * `secao` deve apontar para um elemento dentro de um invólucro do próprio
 * componente: o GSAP põe o pin-spacer entre os dois.
 */
export function useCenaFixada(
  secao: RefObject<HTMLElement | null>,
  montar: (tl: gsap.core.Timeline, q: Seletor) => void,
  { duracao = '+=100%', fixar = true, suavizar = true, passos, semMovimento }: Opcoes = {},
) {
  useGSAP(
    () => {
      const alvo = secao.current;
      if (!alvo) return;
      const q = gsap.utils.selector(alvo) as Seletor;
      const mm = gsap.matchMedia();

      mm.add(COM_MOVIMENTO, () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: alvo,
            start: 'top top',
            end: duracao,
            pin: fixar,
            scrub: suavizar,
            invalidateOnRefresh: true,
            snap: passos === undefined ? undefined : typeof passos === 'number' ? 1 / passos : passos,
          },
        });
        montar(tl, q);
      });

      if (semMovimento) mm.add('(prefers-reduced-motion: reduce)', () => semMovimento(q));
    },
    { scope: secao },
  );
}
