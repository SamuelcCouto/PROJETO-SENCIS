/**
 * As camadas de fundo de uma seção, atrás do conteúdo (z-index negativo no
 * contexto da seção) e sem receber clique:
 *
 * - `.veios`: o mármore. Deriva com a rolagem só por transform (FioDaPagina),
 *   que a placa de vídeo compõe sem recalcular o estilo da seção.
 * - `.fio`: o traço da página. O desenho (`d`) e o viewBox são escritos pelo
 *   FioDaPagina depois de medir a seção; por isso o `d` não passa pelo React.
 *   O halo só aparece na cena da clínica, onde o fio acende.
 */
export function FioCamada() {
  return (
    <>
      <div className="veios" aria-hidden="true" />
      <svg className="fio" aria-hidden="true" focusable="false" preserveAspectRatio="none">
        <path className="fio__halo" pathLength={1000} />
        <path className="fio__linha" pathLength={1000} />
      </svg>
    </>
  );
}
