import { clinica } from "./clinica";
import { tratamentos } from "./tratamentos";
import { servicosComplementares } from "./esteticaFacial";
import { faq } from "./faq";

/**
 * JSON-LD para busca local.
 *
 * O tipo `Dentist` é o que diz ao Google, sem ambiguidade, que este endereço é
 * um consultório odontológico — o site antigo não declarava nada disso, então a
 * página só era recuperável por marca ("sencis") e não por categoria.
 *
 * Nota deliberada: NÃO existe `aggregateRating` aqui. A nota 5,0 é real, mas
 * marcar avaliação da própria empresa no próprio site é "self-serving review"
 * pelas diretrizes do Google, inelegível para rich result e sujeito a ação
 * manual. A nota aparece na tela, creditada ao Google — só não no schema.
 */

const enderecoPostal = {
  "@type": "PostalAddress",
  streetAddress: `${clinica.endereco.logradouro}, ${clinica.endereco.complemento}`,
  addressLocality: clinica.endereco.cidade,
  addressRegion: clinica.endereco.estado,
  postalCode: clinica.endereco.cep,
  addressCountry: clinica.endereco.pais,
};

const horarioAtendimento = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "12:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "13:00",
    closes: "18:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "08:30",
    closes: "12:00",
  },
];

export function schemaClinica() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${clinica.siteUrl}/#clinica`,
    name: clinica.nome,
    alternateName: clinica.nomeCurto,
    description:
      "Clínica odontológica no Parque Amazônia, em Goiânia. Clínica geral, estética do sorriso, ortodontia, implantes, canal e periodontia, com atendimento humanizado.",
    url: clinica.siteUrl,
    telephone: clinica.telefone.e164,
    address: enderecoPostal,
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinica.geo.latitude,
      longitude: clinica.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${clinica.geo.latitude},${clinica.geo.longitude}`,
    openingHoursSpecification: horarioAtendimento,
    image: [
      `${clinica.siteUrl}/fotos/fachada.png`,
      `${clinica.siteUrl}/fotos/recepcao-poltronas.png`,
      `${clinica.siteUrl}/fotos/consultorio-janela.png`,
    ],
    logo: `${clinica.siteUrl}/icone.svg`,
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Dinheiro, Pix, Cartão de crédito, Cartão de débito",
    sameAs: [clinica.social.instagram],
    areaServed: [
      { "@type": "City", name: "Goiânia" },
      { "@type": "Place", name: "Parque Amazônia" },
      { "@type": "Place", name: "Jardim Atlântico" },
      { "@type": "Place", name: "Vila Rosa" },
      { "@type": "Place", name: "Setor Pedro Ludovico" },
    ],
    isAcceptingNewPatients: true,
    availableLanguage: { "@type": "Language", name: "Portuguese" },
    medicalSpecialty: "Dentistry",
    // Acessibilidade cadeirante — confirmado no Perfil da Empresa no Google.
    publicAccess: true,
    employee: {
      "@type": "Person",
      name: clinica.responsavel.nome,
      jobTitle: clinica.responsavel.cargo,
      identifier: clinica.responsavel.cro,
    },
    availableService: [
      ...tratamentos.map((t) => ({
        "@type": "MedicalProcedure",
        name: t.nome,
        description: t.resolve,
        alternateName: t.tambemChamado,
      })),
      // Só os serviços dentro do escopo legal de uma cirurgiã-dentista (a
      // Harmonização Orofacial é especialidade reconhecida pelo CFO) entram
      // aqui. Limpeza de pele fica de fora — ver a nota em esteticaFacial.ts.
      ...servicosComplementares
        .filter((s) => s.escopoDentista)
        .map((s) => ({
          "@type": "MedicalProcedure",
          name: s.nome,
          description: s.descricao,
        })),
    ],
    potentialAction: {
      "@type": "ReserveAction",
      name: "Agendar avaliação",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://wa.me/${clinica.whatsapp.numero}`,
        inLanguage: "pt-BR",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };
}

export function schemaFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${clinica.siteUrl}/#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };
}

export function schemaSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${clinica.siteUrl}/#site`,
    url: clinica.siteUrl,
    name: clinica.nome,
    inLanguage: "pt-BR",
    publisher: { "@id": `${clinica.siteUrl}/#clinica` },
  };
}
