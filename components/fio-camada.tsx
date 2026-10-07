/**
 * A camada do fio dentro de uma seção. Fica atrás do conteúdo (z-index -1 no
 * contexto da seção) e não recebe clique. O desenho (atributo `d`) e o viewBox
 * são escritos pelo FioDaPagina depois de medir a seção; por isso o `d` não
 * passa pelo React.
 *
 * O halo só aparece na cena da clínica, onde o fio acende.
 */
export function FioCamada() {
  return (
    <svg className="fio" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path className="fio__halo" pathLength={1000} />
      <path className="fio__linha" pathLength={1000} />
    </svg>
  );
}
