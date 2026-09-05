/**
 * Fonte única de verdade dos dados da clínica.
 *
 * Tudo que é NAP (Name, Address, Phone) sai daqui: o texto da página, o JSON-LD,
 * o link do mapa e o rodapé. Manter isso centralizado é o que evita divergência
 * entre o site e o Perfil da Empresa no Google — divergência de NAP é uma das
 * causas mais comuns de perda de relevância na busca local.
 */

export const clinica = {
  nome: "Sencis Odontologia Integrada",
  nomeCurto: "Sencis",
  slogan: "Odontologia que começa entendendo você",

  telefone: {
    // E.164 para links e schema; formatado para leitura humana.
    e164: "+5562992272783",
    formatado: "(62) 99227-2783",
  },

  whatsapp: {
    numero: "5562992272783",
    mensagemPadrao:
      "Olá! Vim pelo site da Sencis e gostaria de agendar uma avaliação.",
  },

  endereco: {
    logradouro: "Av. Sen. José Rodrigues de Morais Neto, 1251",
    complemento: "Sala 03, Quadra 199, Lote 06",
    bairro: "Parque Amazônia",
    cidade: "Goiânia",
    estado: "GO",
    cep: "74835-620",
    pais: "BR",
  },

  geo: {
    latitude: -16.7277486,
    longitude: -49.2791126,
  },

  /** Segunda a sexta com intervalo de almoço; sábado meio período. */
  horarios: [
    { dias: "Segunda a sexta", faixas: ["08:30 – 12:00", "13:00 – 18:00"] },
    { dias: "Sábado", faixas: ["08:30 – 12:00"] },
    { dias: "Domingo", faixas: ["Fechado"] },
  ],

  responsavel: {
    nome: "Arielly Vieira da Silva",
    cargo: "Cirurgiã-dentista e responsável técnica",
    cro: "CRO-GO 16695",
  },

  /** Registro da pessoa jurídica no Conselho Regional de Odontologia. */
  croClinica: "CRO-GO 4560",

  avaliacoes: {
    nota: 5.0,
    total: 50,
    fonte: "Google",
  },

  social: {
    instagram: "https://www.instagram.com/sencisodontologia/",
    instagramHandle: "@sencisodontologia",
  },

  /**
   * A URL canônica do site.
   *
   * Precisa bater exatamente com o domínio marcado como "Production" no
   * painel da Vercel — hoje é o www, com o domínio nu (sencis.com.br)
   * redirecionando (308) para ele. Se um dia a Vercel passar a tratar o
   * domínio nu como produção em vez do www, troque aqui também: um
   * descompasso entre esta constante e o redirect real da Vercel faz o
   * Google indexar duas URLs canônicas diferentes para a mesma página.
   */
  siteUrl: "https://www.sencis.com.br",
} as const;

export const enderecoLinhaUnica = `${clinica.endereco.logradouro} — ${clinica.endereco.complemento}, ${clinica.endereco.bairro}, ${clinica.endereco.cidade} - ${clinica.endereco.estado}, ${clinica.endereco.cep}`;

export const linkWhatsapp = `https://wa.me/${clinica.whatsapp.numero}?text=${encodeURIComponent(clinica.whatsapp.mensagemPadrao)}`;

const consultaMapa = encodeURIComponent(
  `${clinica.nome}, ${clinica.endereco.bairro}, ${clinica.endereco.cidade}`,
);

/** Abre o Google Maps de verdade, que resolve a busca por nome sem problema. */
export const linkComoChegar = `https://www.google.com/maps/dir/?api=1&destination=${consultaMapa}`;

/**
 * O embed vai por coordenada, não por nome.
 *
 * Buscar pelo nome renderizaria o alfinete já rotulado, mas o cartão de
 * resultado do embed depende de uma sessão do Google e falha em branco quando
 * não carrega — um retângulo vazio no lugar do mapa. A coordenada sempre
 * desenha o alfinete. O nome do lugar quem carrega é o texto ao lado e o
 * JSON-LD.
 */
export const linkMapaEmbed = `https://maps.google.com/maps?q=${clinica.geo.latitude},${clinica.geo.longitude}&z=16&output=embed`;

/**
 * Monta um link de WhatsApp com contexto do que a pessoa estava lendo.
 * Chegar na conversa já sabendo o assunto reduz atrito para os dois lados.
 */
export function whatsappSobre(assunto: string): string {
  const texto = `Olá! Vim pelo site da Sencis e gostaria de saber mais sobre ${assunto}.`;
  return `https://wa.me/${clinica.whatsapp.numero}?text=${encodeURIComponent(texto)}`;
}
