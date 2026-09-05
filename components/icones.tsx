/**
 * Ícones inline.
 *
 * O site antigo carregava a folha de estilo inteira do FontAwesome pelo CDN só
 * para usar sete ícones — um pedido bloqueante de renderização, mais a fonte de
 * ícones. Aqui cada ícone é um SVG de poucos bytes, no mesmo documento.
 */

type Props = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconeEstrela({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.6l2.7 5.9 6.4.8-4.7 4.4 1.2 6.3-5.6-3.1-5.6 3.1 1.2-6.3L2.9 9.3l6.4-.8L12 2.6z" />
    </svg>
  );
}

export function IconeWhatsapp({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 012.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 01-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24zm-3.2 4.3c-.15 0-.4.06-.6.29-.21.22-.8.78-.8 1.9s.82 2.2.93 2.36c.12.15 1.6 2.45 3.89 3.43.54.24.97.38 1.3.48.55.18 1.05.15 1.44.09.44-.06 1.35-.55 1.55-1.09.19-.53.19-.99.13-1.08-.05-.1-.2-.15-.42-.26-.22-.11-1.34-.66-1.55-.74-.2-.07-.35-.11-.5.12-.15.22-.58.73-.71.88-.13.15-.26.17-.48.06-.22-.11-.95-.35-1.8-1.11a6.8 6.8 0 01-1.26-1.55c-.13-.22-.01-.35.1-.46.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.08-.15.04-.28-.02-.39-.05-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38-.13 0-.28-.01-.43-.01z" />
    </svg>
  );
}

export function IconeLocal({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconeRelogio({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2V12l3.2 1.9" />
    </svg>
  );
}

export function IconeTelefone({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M6.3 3.5h3l1.5 3.8-2 1.4a12 12 0 006.5 6.5l1.4-2 3.8 1.5v3a1.8 1.8 0 01-2 1.8A16.4 16.4 0 014.5 5.5a1.8 1.8 0 011.8-2z" />
    </svg>
  );
}

export function IconeInstagram({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconeAcessivel({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <circle cx="12.4" cy="4.6" r="1.9" />
      <path d="M8.5 8.4l3.9 1.1v3.7h3.3M12.4 13.2l2.6 5.4" />
      <path d="M11.9 12.6a4.6 4.6 0 101.6 6.7" />
    </svg>
  );
}

export function IconeMais({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  );
}
