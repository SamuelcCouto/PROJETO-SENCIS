/**
 * O N do letreiro da fachada.
 *
 * Medido na foto da fachada (recorte ampliado). Nessas "unidades do letreiro"
 * a altura das maiúsculas vale 260 e a linha de base fica em y = 545.
 * O N tem três traços: a perna fina que sobe da esquerda, a descida fina e o
 * braço grosso que sobe para a direita e se curva para trás no alto.
 *
 * O desenho serve de logotipo e de começo do fio da página (lib/fio.ts): o
 * fio nasce na volta do alto do braço, desce por ele e segue pelo site.
 */

export type Ponto = readonly [number, number];

const PERNA: Ponto[] = [[110, 535], [150, 505], [205, 450], [242, 385]];
const DESCIDA: Ponto[] = [[262, 300], [272, 380], [282, 470], [292, 545]];
const BRACO: Ponto[] = [[340, 470], [440, 330], [505, 210]];
const CURVA: Ponto[] = [[535, 150], [525, 85], [470, 80], [420, 76], [360, 92], [312, 108]];

function cubicas(inicio: Ponto, resto: Ponto[]) {
  let d = `M ${inicio[0]} ${inicio[1]}`;
  for (let i = 0; i < resto.length; i += 3) {
    d += ` C ${resto[i].join(" ")} ${resto[i + 1].join(" ")} ${resto[i + 2].join(" ")}`;
  }
  return d;
}

/** O N inteiro, para o logotipo (viewBox do N: "100 70 440 480"). */
export const N_LOGO = `${cubicas(PERNA[0], PERNA.slice(1))} ${cubicas(DESCIDA[0], [...DESCIDA.slice(1), ...BRACO, ...CURVA])}`;
export const N_VIEWBOX = "100 70 440 480";

/** Ponta da volta do alto do N, em fração do viewBox do logotipo. O fio termina aqui, no rodapé. */
export const N_PONTA = { x: (312 - 100) / 440, y: (108 - 70) / 480 };

/**
 * Braço e volta do N no sentido em que o fio corre: da ponta da volta, lá em
 * cima, até o pé do braço. Primeiro ponto é o início; depois, grupos de três
 * (dois de controle e o destino de cada curva).
 */
export const BRACO_DESCENDO: Ponto[] = [
  [312, 108],
  [360, 92], [420, 76], [470, 80],
  [525, 85], [535, 150], [505, 210],
  [440, 330], [340, 470], [292, 545],
];
