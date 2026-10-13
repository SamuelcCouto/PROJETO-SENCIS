/**
 * Fonte única dos dados da clínica.
 *
 * Nome, endereço e telefone (NAP) saem só daqui: texto da página, JSON-LD,
 * links do mapa e rodapé. Precisam bater com o Perfil da Empresa no Google,
 * senão a busca local perde relevância. Conferido no Maps em 27/09/2026.
 */
export const clinica = {
  nome: "Sencis Odontologia Integrada",
  nomeCurto: "Sencis",
  /** O título do topo, pedido pela clínica (Jhennifer) desde a v1. */
  slogan: "Odontologia que começa entendendo você",
  assinatura: "Essencial na forma. Sentido na essência de cada sorriso.",

  telefone: {
    e164: "+5562992272783",
    formatado: "(62) 99227-2783",
  },

  whatsapp: {
    numero: "5562992272783",
    mensagemPadrao: "Olá! Vim pelo site da Sencis e gostaria de agendar uma avaliação.",
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

  geo: { latitude: -16.7277486, longitude: -49.2791126 },

  horarios: [
    { dias: "Segunda a sexta", faixas: ["08:30 às 12:00", "13:00 às 18:00"] },
    { dias: "Sábado", faixas: ["08:30 às 12:00"] },
    { dias: "Domingo", faixas: ["Fechado"] },
  ],

  responsavel: {
    nome: "Arielly Vieira da Silva",
    cargo: "Cirurgiã-dentista e responsável técnica",
    cro: "CRO-GO 16695",
  },
  croClinica: "CRO-GO 4560",

  /**
   * Link permanente do Perfil da Empresa no Google (pelo CID da ficha). Vai no
   * JSON-LD (hasMap e sameAs) para o Google ligar o site ao perfil do Maps.
   */
  perfilGoogle: "https://maps.google.com/?cid=3246560138749927553",

  avaliacoes: {
    nota: "5,0",
    total: 54,
    link: "https://maps.app.goo.gl/oTyXnQBeeLk9Pbrw9",
  },

  social: {
    instagram: "https://www.instagram.com/sencisodontologia/",
    instagramHandle: "@sencisodontologia",
  },

  siteUrl: "https://www.sencis.com.br",
} as const;

export const enderecoCurto = `${clinica.endereco.logradouro}, sala 03`;

export const linkWhatsapp = `https://wa.me/${clinica.whatsapp.numero}?text=${encodeURIComponent(clinica.whatsapp.mensagemPadrao)}`;

export const linkTelefone = `tel:${clinica.telefone.e164}`;

/** Abre a rota no Google Maps pelo nome, que o Maps resolve melhor que a coordenada. */
export const linkComoChegar = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${clinica.nome}, ${clinica.endereco.bairro}, ${clinica.endereco.cidade}`,
)}`;

/** O embed vai por coordenada: pelo nome, o cartão do embed às vezes falha em branco. */
export const linkMapaEmbed = `https://maps.google.com/maps?q=${clinica.geo.latitude},${clinica.geo.longitude}&z=16&output=embed`;

/** WhatsApp com o assunto que a pessoa estava lendo, para a conversa já começar no ponto. */
export function whatsappSobre(assunto: string): string {
  const texto = `Olá! Vim pelo site da Sencis e gostaria de saber mais sobre ${assunto}.`;
  return `https://wa.me/${clinica.whatsapp.numero}?text=${encodeURIComponent(texto)}`;
}
