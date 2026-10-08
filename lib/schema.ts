import { clinica } from "./clinica";
import { perguntas, rosto, tratamentos } from "./conteudo";

/**
 * JSON-LD para a busca local, herdado da versão atual do site.
 *
 * Sem `aggregateRating` de propósito: marcar a própria nota no próprio site é
 * "self-serving review" para o Google. A nota aparece na tela, creditada ao
 * Google, e fica fora do schema.
 */

const horarioAtendimento = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "12:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "13:00", closes: "18:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:30", closes: "12:00" },
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
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinica.endereco.logradouro}, ${clinica.endereco.complemento}`,
      addressLocality: clinica.endereco.cidade,
      addressRegion: clinica.endereco.estado,
      postalCode: clinica.endereco.cep,
      addressCountry: clinica.endereco.pais,
    },
    geo: { "@type": "GeoCoordinates", latitude: clinica.geo.latitude, longitude: clinica.geo.longitude },
    hasMap: clinica.perfilGoogle,
    openingHoursSpecification: horarioAtendimento,
    image: [
      `${clinica.siteUrl}/fotos/fachada.png`,
      `${clinica.siteUrl}/fotos/recepcao-poltronas.png`,
      `${clinica.siteUrl}/fotos/consultorio-janela.png`,
    ],
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Dinheiro, Pix, Cartão de crédito, Cartão de débito",
    logo: `${clinica.siteUrl}/icon.svg`,
    sameAs: [clinica.perfilGoogle, clinica.social.instagram],
    areaServed: [
      { "@type": "City", name: "Goiânia" },
      { "@type": "Place", name: "Parque Amazônia" },
      { "@type": "Place", name: "Jardim Atlântico" },
      { "@type": "Place", name: "Vila Rosa" },
      { "@type": "Place", name: "Setor Pedro Ludovico" },
    ],
    isAcceptingNewPatients: true,
    knowsLanguage: "pt-BR",
    medicalSpecialty: "Dentistry",
    publicAccess: true,
    amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "Acessível para cadeira de rodas", value: true }],
    employee: {
      "@type": "Person",
      name: clinica.responsavel.nome,
      jobTitle: clinica.responsavel.cargo,
      identifier: clinica.responsavel.cro,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tratamentos",
      itemListElement: [
        ...tratamentos.map((t) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: t.nome, description: t.resolve, alternateName: t.tambemChamado },
        })),
        // Só o que está no escopo legal de uma cirurgiã-dentista (ver lib/conteudo.ts).
        ...rosto.servicos.filter((s) => s.escopoDentista).map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.nome, description: s.descricao },
        })),
      ],
    },
  };
}

export function schemaFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: perguntas.map((p) => ({
      "@type": "Question",
      name: p.pergunta,
      acceptedAnswer: { "@type": "Answer", text: p.resposta },
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
