import { BRACO_DESCENDO, N_PONTA, type Ponto } from "@/lib/traco";

/**
 * O fio da página: um traço só, que nasce como o braço do N na abertura e
 * desce pelo site inteiro até terminar no N do rodapé.
 *
 * Cada seção com `data-fio="nome"` tem uma camada SVG própria (FioCamada) e
 * uma rota aqui. As rotas são calculadas a partir da posição real dos blocos
 * de cada seção, então o fio passa sempre pelos vãos entre texto e foto, em
 * qualquer largura. A continuidade vem da regra: cada seção começa no x em que
 * a de cima terminou e desce com a tangente vertical nas duas bordas.
 *
 * Dois modos:
 * - completo: desktop com movimento. O fio passa pelos corredores entre as
 *   colunas e vira o eixo do encontro e o dos tratamentos.
 * - costura: celular (ou movimento reduzido), quando o conteúdo vira uma
 *   coluna só. O fio desce pela calha lateral enquanto há texto ou foto ao lado
 *   e atravessa a tela nos vãos entre os blocos, alternando o lado. No
 *   celular com movimento, ele continua sendo o eixo do encontro.
 */

export type Modo = "completo" | "costura";

type Contexto = {
  secao: HTMLElement;
  w: number;
  h: number;
  /** x em que a seção de cima terminou (null na primeira). */
  entrada: number | null;
  modo: Modo;
  /** Largura de desktop (a abertura muda de desenho, com ou sem movimento). */
  larga: boolean;
  /** Sem prefers-reduced-motion: o encontro fica fixado e o fio é o eixo dele. */
  movimento: boolean;
};

type Rota = (c: Contexto) => { d: string; saida: number };

type Caixa = { x: number; y: number; w: number; h: number };

const n = (v: number) => v.toFixed(1);

/** Posição de um elemento em relação à seção, pelo layout (ignora transform animado). */
function caixa(secao: HTMLElement, seletor: string): Caixa | null {
  const el = secao.querySelector<HTMLElement>(seletor);
  if (!el) return null;
  if (el instanceof HTMLElement) {
    let x = 0;
    let y = 0;
    let no: HTMLElement | null = el;
    while (no && no !== secao) {
      x += no.offsetLeft;
      y += no.offsetTop;
      no = no.offsetParent as HTMLElement | null;
    }
    if (no === secao) return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  }
  const a = (el as Element).getBoundingClientRect();
  const b = secao.getBoundingClientRect();
  return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height };
}

const direita = (c: Caixa) => c.x + c.w;

/** Curva que sai e chega na vertical: é o que emenda as seções sem quebra. */
function desce(x0: number, y0: number, x1: number, y1: number) {
  const k = (y1 - y0) * 0.55;
  return `C ${n(x0)} ${n(y0 + k)} ${n(x1)} ${n(y1 - k)} ${n(x1)} ${n(y1)}`;
}

/** Meio da calha lateral (a mesma conta do --gutter do CSS). */
const calha = (w: number) => Math.min(64, Math.max(16, w * 0.044)) / 2;
const margem = (w: number) => w - calha(w);

/** Rota padrão: entra, vai até o corredor x dentro de `ate` px e desce reto. */
function corredor(c: Contexto, x: number, ate: number) {
  const xe = c.entrada ?? x;
  return { d: `M ${n(xe)} 0 ${desce(xe, 0, x, ate)} L ${n(x)} ${n(c.h)}`, saida: x };
}

/** O que o fio não pode atravessar: texto, foto, vídeo, botão, mapa. */
const CONTEUDO =
  "h1,h2,h3,p,li,dt,dd,address,summary,figure,img,video,iframe,a,button,.encontro__palavra,.trat__sem-midia,.mapa,.marca";
/** Vão mínimo (px) para o fio atravessar a tela sem encostar em nada. */
const VAO_MINIMO = 40;

/** Faixas horizontais livres de conteúdo, de cima para baixo. */
function faixasLivres(secao: HTMLElement, h: number): [number, number][] {
  const base = secao.getBoundingClientRect().top;
  const ocupado: [number, number][] = [];
  secao.querySelectorAll<HTMLElement>(CONTEUDO).forEach((el) => {
    if (el.closest(".fio")) return;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    ocupado.push([r.top - base, r.bottom - base]);
  });
  ocupado.sort((a, b) => a[0] - b[0]);
  const livres: [number, number][] = [];
  let cursor = 0;
  for (const [a, b] of ocupado) {
    if (a - cursor >= VAO_MINIMO) livres.push([cursor, a]);
    cursor = Math.max(cursor, b);
  }
  if (h - cursor >= VAO_MINIMO) livres.push([cursor, h]);
  return livres;
}

/**
 * Costura: desce pela calha e, em cada vão livre, cruza para a calha do outro
 * lado. `inicio` continua um desenho já começado (a volta do N na abertura).
 */
function costura(c: Contexto, inicio?: { x: number; y: number; d: string }) {
  const lados = [calha(c.w), margem(c.w)];
  let x = inicio?.x ?? c.entrada ?? lados[1];
  let y = inicio?.y ?? 0;
  let d = inicio?.d ?? `M ${n(x)} 0`;
  let lado = Math.abs(x - lados[0]) < Math.abs(x - lados[1]) ? 0 : 1;
  let noLado = Math.abs(x - lados[lado]) < 1;
  for (const [a0, b] of faixasLivres(c.secao, c.h)) {
    const a = Math.max(a0, y);
    if (b - a < VAO_MINIMO) continue;
    const topo = a + 10;
    const fundo = Math.min(b - 10, topo + 140);
    // Quem chega fora da calha (vindo do eixo do encontro) vai para a mais perto.
    const destino = noLado ? 1 - lado : lado;
    d += ` L ${n(x)} ${n(topo)} ${desce(x, topo, lados[destino], fundo)}`;
    x = lados[destino];
    lado = destino;
    noLado = true;
    y = fundo;
  }
  d += ` L ${n(x)} ${n(c.h)}`;
  return { d, saida: x };
}

const costurada: Rota = (c) => costura(c);

/** Meio do vão entre dois blocos lado a lado. */
const vao = (a: Caixa | null, b: Caixa | null) => (a && b ? (direita(a) + b.x) / 2 : null);

export const ROTAS: Record<string, Rota> = {
  abertura: (c) => {
    if (!c.larga) {
      // Celular: a volta do N no canto de cima e, dali, a costura.
      const x = margem(c.w);
      const topo = 64;
      return costura(c, {
        x,
        y: topo + 60,
        d: `M ${n(x - 64)} ${topo + 42} C ${n(x - 44)} ${topo + 22} ${n(x - 4)} ${topo + 18} ${n(x)} ${topo + 60}`,
      });
    }
    // Desktop: o braço do N inteiro, entre o título e a foto, sem encostar em nenhum dos dois.
    let fimTexto = 0;
    const base = c.secao.getBoundingClientRect().left;
    c.secao.querySelectorAll(".abertura__linha").forEach((linha) => {
      const r = document.createRange();
      r.selectNodeContents(linha);
      fimTexto = Math.max(fimTexto, r.getBoundingClientRect().right - base);
    });
    const foto = caixa(c.secao, ".abertura__foto");
    const pe = fimTexto + 28;
    const sy = (c.h * 0.8) / 469;
    const sx = Math.max(0.35, Math.min(sy, ((foto?.x ?? c.w * 0.64) - 32 - pe) / 243));
    const u = ([x, y]: Ponto) => `${n(pe + (x - 292) * sx)} ${n(c.h - (545 - y) * sy)}`;
    const p = BRACO_DESCENDO;
    let d = `M ${u(p[0])}`;
    for (let i = 1; i < p.length; i += 3) d += ` C ${u(p[i])} ${u(p[i + 1])} ${u(p[i + 2])}`;
    return { d, saida: pe };
  },

  encontro: (c) => {
    if (!c.movimento) return costura(c);
    // O fio vira o eixo: a coluna onde as letras em comum se alinham.
    const eixo = caixa(c.secao, ".encontro__resto")?.x ?? c.w * 0.3;
    return corredor(c, eixo, c.h * 0.1);
  },

  consulta: (c) => {
    if (c.modo !== "completo") return costurada(c);
    const x = vao(caixa(c.secao, ".consulta__coluna"), caixa(c.secao, ".consulta__passos")) ?? c.w * 0.43;
    return corredor(c, x, 96);
  },

  tratamentos: (c) => {
    if (c.modo !== "completo") return costurada(c);
    // Desce ao lado da lista, dobra no eixo (onde o item ativo para) e desce
    // de novo entre o detalhe e a mídia.
    const nome = caixa(c.secao, ".trat__nome");
    const detalhe = caixa(c.secao, ".trat__detalhe");
    const midia = caixa(c.secao, ".trat__midia");
    if (!nome || !detalhe || !midia) return costurada(c);
    const eixoY = nome.y + nome.h / 2;
    const xv = detalhe.x;
    const xt = (direita(detalhe) + midia.x) / 2;
    const r = 28;
    const xe = c.entrada ?? xv;
    return {
      d:
        `M ${n(xe)} 0 ${desce(xe, 0, xv, 90)} L ${n(xv)} ${n(eixoY - r)} ` +
        `Q ${n(xv)} ${n(eixoY)} ${n(xv + r)} ${n(eixoY)} L ${n(xt - r)} ${n(eixoY)} ` +
        `Q ${n(xt)} ${n(eixoY)} ${n(xt)} ${n(eixoY + r)} L ${n(xt)} ${n(c.h)}`,
      saida: xt,
    };
  },

  resultados: (c) => {
    if (c.modo !== "completo") return costurada(c);
    const x = vao(caixa(c.secao, ".resultados__foto--a"), caixa(c.secao, ".resultados__foto--b")) ?? c.w * 0.54;
    return corredor(c, x, 90);
  },

  rosto: (c) => {
    if (c.modo !== "completo") return costurada(c);
    const x = vao(caixa(c.secao, ".rosto__cabeca"), caixa(c.secao, ".rosto__lista")) ?? c.w * 0.43;
    return corredor(c, x, 80);
  },

  clinica: (c) => {
    if (c.modo !== "completo") return costurada(c);
    const texto = caixa(c.secao, ".clinica__texto");
    const foto = caixa(c.secao, ".clinica__foto");
    const salas = caixa(c.secao, ".salas");
    const a = caixa(c.secao, ".salas__foto--a");
    const b = caixa(c.secao, ".salas__foto--b");
    if (!texto || !foto || !salas) return costurada(c);
    const recuo = parseFloat(getComputedStyle(c.secao.querySelector(".clinica__texto")!).paddingRight) || 0;
    const x1 = (direita(texto) - recuo + foto.x) / 2;
    const x2 = vao(a, b) ?? x1;
    const xe = c.entrada ?? x1;
    const y2 = salas.y + 30;
    return {
      d: `M ${n(xe)} 0 ${desce(xe, 0, x1, 90)} L ${n(x1)} ${n(y2)} ${desce(x1, y2, x2, y2 + 80)} L ${n(x2)} ${n(c.h)}`,
      saida: x2,
    };
  },

  perguntas: (c) => {
    if (c.modo !== "completo") return costurada(c);
    const x = vao(caixa(c.secao, ".perguntas .titulo-secao"), caixa(c.secao, ".perguntas__lista")) ?? c.w * 0.36;
    return corredor(c, x, 100);
  },

  visita: (c) => {
    if (c.modo !== "completo") return costurada(c);
    const x = vao(caixa(c.secao, ".visita__texto"), caixa(c.secao, ".mapa")) ?? c.w * 0.57;
    return corredor(c, x, 100);
  },

  rodape: (c) => {
    // O fio termina entrando na volta do N do logotipo, na mesma direção dela.
    const n0 = c.secao.querySelector(".marca__n");
    const xe = c.entrada ?? c.w / 2;
    if (!n0) return { d: `M ${n(xe)} 0 L ${n(xe)} ${n(c.h)}`, saida: xe };
    const r = n0.getBoundingClientRect();
    const b = c.secao.getBoundingClientRect();
    const tx = r.left - b.left + r.width * N_PONTA.x;
    const ty = r.top - b.top + r.height * N_PONTA.y;
    return {
      d: `M ${n(xe)} 0 C ${n(xe)} ${n(ty * 0.7)} ${n(tx + 150)} ${n(ty - 50)} ${n(tx)} ${n(ty)}`,
      saida: tx,
    };
  },
};
