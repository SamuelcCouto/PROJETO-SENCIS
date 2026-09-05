"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Clipe curto, mudo e em laço, usado como um item da galeria.
 *
 * Regras que o componente garante:
 * - Só baixa o vídeo quando ele chega perto da tela. Dois clipes carregados de
 *   saída custariam mais que a página inteira num 4G ruim.
 * - Pausa quando sai de vista, para não gastar bateria rodando fora do campo
 *   de visão.
 * - Com `prefers-reduced-motion`, nunca toca: fica no pôster, que é um quadro
 *   do próprio vídeo já com a mesma correção de cor.
 */
export function VideoAmbiente({
  src,
  poster,
  descricao,
  className = "",
}: {
  src: string;
  poster: string;
  descricao: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [podeAnimar, setPodeAnimar] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => setPodeAnimar(!consulta.matches);
    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !podeAnimar) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          // O autoplay pode ser recusado (economia de dados, por exemplo).
          // Nesse caso o pôster continua na tela e nada quebra.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observador.observe(video);
    return () => observador.disconnect();
  }, [podeAnimar]);

  return (
    <video
      ref={ref}
      src={podeAnimar ? src : undefined}
      poster={poster}
      aria-label={descricao}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
