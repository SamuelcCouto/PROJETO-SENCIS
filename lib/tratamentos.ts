/**
 * Os tratamentos oferecidos, escritos do ponto de vista de quem procura.
 *
 * O site antigo não citava nenhum procedimento em nenhum lugar — por isso o Google
 * não tinha como associar a página a buscas por "dentista" ou "clínica odontológica".
 * Cada item aqui descreve o problema que a pessoa tem, não o nome técnico que só
 * o dentista usa, e os termos técnicos aparecem em `tambemChamado` para quem
 * busca por eles.
 */

export type Tratamento = {
  id: string;
  nome: string;
  /** O problema real, na linguagem de quem sente o problema. */
  resolve: string;
  descricao: string;
  /** Sinônimos e termos técnicos que as pessoas digitam na busca. */
  tambemChamado: string[];
};

export const tratamentos: Tratamento[] = [
  {
    id: "clinica-geral",
    nome: "Clínica geral e prevenção",
    resolve: "Cárie, sensibilidade e a consulta que ficou para depois",
    descricao:
      "Limpeza, flúor, restauração e o plano do que precisa ser feito — em ordem de urgência, com o custo na mesa antes de começar.",
    tambemChamado: [
      "limpeza dental",
      "profilaxia",
      "restauração",
      "tratamento de cárie",
      "check-up odontológico",
    ],
  },
  {
    id: "estetica",
    nome: "Estética do sorriso",
    resolve: "Dentes escurecidos, manchados ou desalinhados na frente",
    descricao:
      "Clareamento em consultório ou em casa, facetas e lentes de contato dental — com simulação antes, para você ver o resultado antes de decidir.",
    tambemChamado: [
      "clareamento dental",
      "lente de contato dental",
      "faceta de porcelana",
      "faceta de resina",
      "harmonização do sorriso",
    ],
  },
  {
    id: "ortodontia",
    nome: "Ortodontia e alinhadores",
    resolve: "Dentes tortos, mordida errada, aparelho que nunca começou",
    descricao:
      "Aparelho fixo, autoligado, alinhadores transparentes e aparelhos ortopédicos. A escolha depende do seu caso, não do que é mais fácil de vender.",
    tambemChamado: [
      "aparelho dentário",
      "aparelho ortodôntico",
      "aparelho ortopédico",
      "alinhador invisível",
      "aparelho autoligado",
      "ortodontista",
    ],
  },
  {
    id: "implantes-e-proteses",
    nome: "Implantes e próteses",
    resolve:
      "Dente perdido, prótese que não encaixa, dificuldade para mastigar",
    descricao:
      "Implante unitário ou múltiplo, coroa, protocolo, prótese fixa e removível — planejados para mastigar e falar com segurança de novo.",
    tambemChamado: [
      "implante dentário",
      "prótese dentária",
      "coroa dentária",
      "implantodontia",
      "protocolo",
    ],
  },
  {
    id: "endodontia",
    nome: "Canal e tratamento de urgência",
    resolve: "Dor que não passa, abscesso, dente que precisa ser salvo",
    descricao:
      "Canal com anestesia bem feita e o tempo que o caso pedir. Chegou com dor? Ligue: encaixamos no mesmo dia sempre que há espaço.",
    tambemChamado: [
      "tratamento de canal",
      "endodontia",
      "dor de dente",
      "abscesso dentário",
      "urgência odontológica",
    ],
  },
  {
    id: "periodontia",
    nome: "Gengiva e periodontia",
    resolve: "Gengiva que sangra, retraída ou inflamada",
    descricao:
      "Gengivite, periodontite, raspagem e acompanhamento. Sangrar ao escovar não é normal e não passa sozinho.",
    tambemChamado: [
      "gengivite",
      "periodontite",
      "raspagem",
      "gengiva sangrando",
      "periodontia",
    ],
  },
];
