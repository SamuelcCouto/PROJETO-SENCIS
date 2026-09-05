/**
 * Perguntas que as pessoas realmente fazem antes de marcar — e que hoje elas
 * fazem no WhatsApp, uma por uma. Responder aqui economiza a conversa e alimenta
 * o schema FAQPage, que é o que habilita a resposta direta no Google.
 *
 * Regra ao editar: nenhuma resposta promete preço, prazo ou cobertura de convênio.
 * Compromisso que o site assume, a recepção precisa conseguir cumprir.
 */

export type Pergunta = {
  pergunta: string;
  resposta: string;
};

export const faq: Pergunta[] = [
  {
    pergunta: "Preciso pagar a primeira consulta?",
    resposta:
      "A primeira conversa é uma avaliação: a gente examina, tira as radiografias necessárias e monta o plano de tratamento com os valores. Você sai sabendo o que precisa ser feito e quanto custa, sem compromisso de fechar na hora. Confirme o valor da avaliação pelo WhatsApp antes de vir.",
  },
  {
    pergunta: "Vai doer?",
    resposta:
      "Essa é a pergunta que mais ouvimos, e ela é legítima. Trabalhamos com anestesia tópica antes da injeção, aplicação lenta e pausa sempre que você pedir. Se a sua ansiedade com dentista é grande, diga isso na hora de agendar — a consulta é montada em um ritmo diferente, com mais tempo reservado.",
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
    pergunta: "Posso levar meu filho? Vocês atendem crianças?",
    resposta:
      "Sim. Atendemos crianças e a recepção tem espaço para acompanhante. Avise a idade quando for agendar para reservarmos o tempo certo — primeira consulta infantil costuma ser mais sobre criar confiança do que sobre procedimento.",
  },
  {
    pergunta: "Quanto tempo demora um clareamento?",
    resposta:
      "Depende da técnica. O clareamento de consultório costuma ser resolvido em uma a três sessões; o supervisionado em casa leva de duas a três semanas de uso da moldeira. Na avaliação definimos qual faz sentido para o seu esmalte e a sua rotina.",
  },
  {
    pergunta: "Onde exatamente fica a clínica?",
    resposta:
      "No Parque Amazônia, em Goiânia, na Av. Senador José Rodrigues de Morais Neto, 1251, sala 03 — perto da Praça Senador José Rodrigues de Morais Filho. Atendemos também quem vem do Jardim Atlântico, Vila Rosa, Aeroviário e Setor Pedro Ludovico.",
  },
];
