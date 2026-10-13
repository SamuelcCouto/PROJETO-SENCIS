/**
 * Conteúdo do site. Os textos vêm do manual da marca, do texto "Essência
 * Sencis" e da versão atual do site (que a clínica revisou). Nada de preço,
 * prazo ou promessa de resultado: o Código de Ética Odontológica não permite,
 * e o que o site promete a recepção precisa conseguir cumprir.
 */

export type Midia =
  | { tipo: "video"; src: string; poster: string; legenda: string }
  | { tipo: "foto"; src: string; alt: string; largura: number; altura: number; legenda: string };

export type Tratamento = {
  id: string;
  nome: string;
  /** O problema, na linguagem de quem sente. */
  resolve: string;
  descricao: string;
  /** Como o assunto aparece na mensagem de WhatsApp. */
  assunto: string;
  midia: Midia | null;
  /** Termos que as pessoas digitam na busca (vão para o JSON-LD). */
  tambemChamado: string[];
};

export const tratamentos: Tratamento[] = [
  {
    id: "clinica-geral",
    nome: "Clínica geral e prevenção",
    resolve: "Cárie, sensibilidade e a consulta que ficou para depois",
    descricao:
      "Limpeza, flúor, restauração e o plano do que precisa ser feito, em ordem de urgência, com o custo na mesa antes de começar.",
    assunto: "clínica geral e prevenção",
    midia: {
      tipo: "foto",
      src: "/fotos/consultorio-janela.png",
      alt: "Consultório da Sencis, com a cadeira odontológica ao lado de uma janela ampla",
      largura: 1600,
      altura: 1200,
      legenda: "O consultório, com luz natural",
    },
    tambemChamado: ["limpeza dental", "profilaxia", "restauração", "tratamento de cárie", "check-up odontológico"],
  },
  {
    id: "estetica",
    nome: "Estética do sorriso",
    resolve: "Dentes escurecidos, manchados ou desalinhados na frente",
    descricao:
      "Clareamento em consultório ou em casa, facetas e lentes de contato dental, com simulação antes, para você ver o resultado antes de decidir.",
    assunto: "estética do sorriso",
    midia: {
      tipo: "video",
      src: "/videos/clareamento.mp4",
      poster: "/videos/clareamento-poster.jpg",
      legenda: "Clareamento em consultório, gravado na clínica",
    },
    tambemChamado: ["clareamento dental", "lente de contato dental", "faceta de porcelana", "faceta de resina"],
  },
  {
    id: "ortodontia",
    nome: "Ortodontia e alinhadores",
    resolve: "Dentes tortos, mordida errada, aparelho que nunca começou",
    descricao:
      "Aparelho fixo, autoligado, alinhadores transparentes e aparelhos ortopédicos. A escolha do aparelho depende do seu caso e é explicada antes de começar.",
    assunto: "ortodontia",
    midia: {
      tipo: "video",
      src: "/videos/ortodontia-manutencao.mp4",
      poster: "/videos/ortodontia-manutencao-poster.jpg",
      legenda: "Manutenção de aparelho, gravada na clínica",
    },
    tambemChamado: ["aparelho dentário", "aparelho ortodôntico", "alinhador invisível", "aparelho autoligado", "ortodontista"],
  },
  {
    id: "implantes-e-proteses",
    nome: "Implantes e próteses",
    resolve: "Dente perdido, prótese que não encaixa, dificuldade para mastigar",
    descricao:
      "Implante unitário ou múltiplo, coroa, protocolo, prótese fixa e removível, planejados para mastigar e falar com segurança de novo.",
    assunto: "implantes e próteses",
    midia: {
      tipo: "video",
      src: "/videos/implantes.mp4",
      poster: "/videos/implantes-poster.jpg",
      legenda: "Atendimento de implante, gravado na clínica",
    },
    tambemChamado: ["implante dentário", "prótese dentária", "coroa dentária", "implantodontia", "protocolo"],
  },
  {
    id: "canal-e-urgencia",
    nome: "Canal e urgência",
    resolve: "Dor que não passa, abscesso, dente que precisa ser salvo",
    descricao:
      "Canal com anestesia bem feita e o tempo que o caso pedir. Chegou com dor? Ligue: encaixamos no mesmo dia sempre que há horário.",
    assunto: "tratamento de canal",
    midia: {
      tipo: "video",
      src: "/videos/endodontia-canal.mp4",
      poster: "/videos/endodontia-canal-poster.jpg",
      legenda: "Tratamento de canal, gravado na clínica",
    },
    tambemChamado: ["tratamento de canal", "endodontia", "dor de dente", "abscesso dentário", "urgência odontológica"],
  },
  {
    id: "gengiva",
    nome: "Gengiva e periodontia",
    resolve: "Gengiva que sangra, retraída ou inflamada",
    descricao:
      "Gengivite, periodontite, raspagem e acompanhamento. Sangrar ao escovar não é normal e não passa sozinho.",
    assunto: "tratamento de gengiva",
    midia: {
      tipo: "foto",
      src: "/fotos/camera-intraoral-detalhe.jpg",
      alt: "Tablet mostrando, ampliada e ao vivo, a imagem da câmera intraoral durante o atendimento",
      largura: 960,
      altura: 1280,
      legenda: "A câmera intraoral mostra na tela o que a dentista vê",
    },
    tambemChamado: ["gengivite", "periodontite", "raspagem", "gengiva sangrando", "periodontia"],
  },
];

/** A origem do nome, do texto "Essência Sencis". */
export const encontro = {
  frase: "Sencis nasce do encontro entre essência, essencial e sense.",
  palavras: [
    { pre: "es", comum: "sênci", fim: "a", definicao: "aquilo que nos torna únicos" },
    { pre: "es", comum: "senci", fim: "al", definicao: "o que realmente importa" },
    { pre: "", comum: "sen", fim: "se", definicao: "sentir, perceber e compreender" },
  ],
  fecho: "É desse encontro que nasce a nossa forma de enxergar uma odontologia humanizada.",
};

export type Passo = {
  titulo: string;
  texto: string;
  foto: { src: string; alt: string; largura: number; altura: number };
};

/** A primeira consulta. É uma sequência de verdade, por isso vai numerada. */
export const primeiraConsulta: Passo[] = [
  {
    titulo: "Escuta em confiança",
    texto:
      "A primeira consulta é longa porque escutar leva tempo. Você conta o que incomoda e o que espera antes de qualquer exame. Se a ansiedade com dentista é grande, avise ao agendar: a consulta é montada em outro ritmo, com mais tempo reservado.",
    foto: {
      src: "/fotos/planejamento.jpg",
      alt: "A dentista conversa com uma paciente à mesa do consultório, com o notebook aberto entre as duas",
      largura: 1000,
      altura: 1000,
    },
  },
  {
    titulo: "Tecnologia em proximidade",
    texto:
      "A câmera intraoral amplia a imagem dos seus dentes e mostra na tela, junto com você, o que passa despercebido a olho nu: cáries, desgastes, fraturas e alterações na gengiva. Você vê, entende e decide.",
    foto: {
      src: "/fotos/camera-intraoral.jpg",
      alt: "Paciente deitada na cadeira segurando um tablet que mostra, ampliado e ao vivo, o próprio dente sendo examinado",
      largura: 960,
      altura: 1280,
    },
  },
  {
    titulo: "Conhecimento em clareza",
    texto:
      "Você sai com o plano por escrito, em ordem de urgência e com os valores, sem compromisso de fechar na hora. Ninguém decide bem sob pressão.",
    foto: {
      src: "/fotos/consultorio-bancada.png",
      alt: "Mesa de atendimento do consultório, com papéis e tablet, e a cadeira odontológica ao fundo",
      largura: 1200,
      altura: 1600,
    },
  },
];

/**
 * Cuidados com o rosto. A clínica pediu os três juntos, mas foi clara que não
 * são o foco: por isso a seção tem peso visual menor que a de tratamentos.
 *
 * Limpeza de pele não está no escopo legal de uma cirurgiã-dentista (costuma
 * ser feita por esteticista ou biomédica). Por isso o texto não a atribui à
 * responsável técnica e ela fica fora do JSON-LD de dentista
 * (`escopoDentista: false`). Botox e harmonização entram: são da Harmonização
 * Orofacial, especialidade reconhecida pelo CFO (Resolução CFO-198/2019).
 */
export const rosto = {
  titulo: "Também no consultório",
  intro:
    "A Sencis é uma clínica odontológica antes de tudo. Mas o cuidado com o rosto não para na boca, e alguns tratamentos abaixo cabem na mesma visita.",
  servicos: [
    {
      nome: "Botox",
      descricao:
        "Toxina botulínica para dor de mandíbula, bruxismo e rugas de expressão, aplicada dentro da Harmonização Orofacial.",
      escopoDentista: true,
    },
    {
      nome: "Harmonização facial",
      descricao:
        "Preenchimento e contorno para o equilíbrio do rosto, dentro da mesma especialidade reconhecida pelo Conselho Federal de Odontologia.",
      escopoDentista: true,
    },
    {
      nome: "Limpeza de pele",
      descricao:
        "Limpeza de pele facial, para quem já é paciente da clínica e quer somar um cuidado de rotina à visita.",
      escopoDentista: false,
    },
  ],
};

export type Pergunta = { pergunta: string; resposta: string };

/** As perguntas que chegam pelo WhatsApp antes de marcar. Nenhuma resposta promete preço, prazo ou cobertura. */
export const perguntas: Pergunta[] = [
  {
    pergunta: "Preciso pagar a primeira consulta?",
    resposta:
      "A primeira conversa é uma avaliação: a gente examina, tira as radiografias necessárias e monta o plano de tratamento com os valores. Você sai sabendo o que precisa ser feito e quanto custa, sem compromisso de fechar na hora. Confirme o valor da avaliação pelo WhatsApp antes de vir.",
  },
  {
    pergunta: "Vai doer?",
    resposta:
      "Essa é a pergunta que mais ouvimos, e ela é legítima. Trabalhamos com anestesia tópica antes da injeção, aplicação lenta e pausa sempre que você pedir. Se a sua ansiedade com dentista é grande, diga isso na hora de agendar: a consulta é montada em um ritmo diferente, com mais tempo reservado.",
  },
  {
    pergunta: "Vocês atendem convênio?",
    resposta:
      "O atendimento é particular, com parcelamento no cartão. Se você tem plano odontológico, mande o nome do convênio pelo WhatsApp que verificamos a cobertura e o reembolso antes de você se deslocar até a clínica.",
  },
  {
    pergunta: "Estou com dor agora. Consigo ser atendida hoje?",
    resposta:
      "Ligue em vez de mandar mensagem. Urgência com dor tem prioridade na agenda e encaixamos no mesmo dia sempre que há horário disponível. Se a clínica estiver fechada, mande mensagem descrevendo a dor que retornamos na abertura.",
  },
  {
    pergunta: "Tem estacionamento?",
    resposta:
      "A clínica fica na Av. Senador José Rodrigues de Morais Neto, com vagas na via em frente e no entorno imediato. A entrada é térrea e acessível para cadeira de rodas, sem degrau na porta.",
  },
  {
    pergunta: "Vocês atendem crianças?",
    resposta:
      "Sim. Atendemos crianças e a recepção tem espaço para acompanhante. Avise a idade quando for agendar para reservarmos o tempo certo. A primeira consulta infantil costuma ser mais sobre criar confiança do que sobre procedimento.",
  },
  {
    pergunta: "Quanto tempo demora um clareamento?",
    resposta:
      "Depende da técnica. O clareamento de consultório costuma ser resolvido em uma a três sessões; o supervisionado em casa leva de duas a três semanas de uso da moldeira. Na avaliação definimos qual faz sentido para o seu esmalte e a sua rotina.",
  },
  {
    pergunta: "Onde exatamente fica a clínica?",
    resposta:
      "No Parque Amazônia, em Goiânia, na Av. Senador José Rodrigues de Morais Neto, 1251, sala 03, perto da Praça Senador José Rodrigues de Morais Filho. Atendemos também quem vem do Jardim Atlântico, Vila Rosa, Aeroviário e Setor Pedro Ludovico.",
  },
];
