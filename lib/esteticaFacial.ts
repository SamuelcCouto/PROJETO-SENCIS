/**
 * Serviços de estética facial — além da odontologia.
 *
 * A clínica foi clara: "não é o foco, mas também fazem". Por isso este
 * conteúdo fica separado de tratamentos.ts, e a seção que o renderiza
 * (EsteticaFacial.tsx) tem peso visual menor que a de Tratamentos — é
 * informação verdadeira, mas secundária.
 *
 * Nota sobre limpeza de pele: ao contrário do botox e da harmonização facial
 * — aplicados dentro da Harmonização Orofacial, especialidade reconhecida
 * pelo Conselho Federal de Odontologia (Resolução CFO-198/2019) para
 * cirurgiões-dentistas habilitados — limpeza de pele facial normalmente não
 * está no escopo legal de atuação de uma cirurgiã-dentista; costuma ser
 * conduzida por esteticista ou biomédica. Por isso a descrição abaixo não
 * atribui o procedimento à responsável técnica, e o item fica de fora do
 * JSON-LD do tipo Dentist em lib/schema.ts. Confirmar com a clínica quem
 * realiza antes de reforçar esse item ou uni-lo à responsável técnica em
 * qualquer texto. Ver [[sencis-servicos-nao-odontologicos]] na memória.
 */

export type ServicoComplementar = {
  id: string;
  nome: string;
  descricao: string;
  /** Só os dois primeiros entram no JSON-LD — ver a nota acima. */
  escopoDentista: boolean;
};

export const servicosComplementares: ServicoComplementar[] = [
  {
    id: "botox",
    nome: "Botox",
    descricao:
      "Toxina botulínica para dor de mandíbula, bruxismo e rugas de expressão — aplicada dentro da Harmonização Orofacial.",
    escopoDentista: true,
  },
  {
    id: "harmonizacao-facial",
    nome: "Harmonização facial",
    descricao:
      "Preenchimento e contorno para o equilíbrio do rosto, dentro da mesma especialidade reconhecida pelo Conselho Federal de Odontologia.",
    escopoDentista: true,
  },
  {
    id: "limpeza-de-pele",
    nome: "Limpeza de pele",
    descricao:
      "Limpeza de pele facial, para quem já é paciente da clínica e quer somar um cuidado de rotina à visita.",
    escopoDentista: false,
  },
];
