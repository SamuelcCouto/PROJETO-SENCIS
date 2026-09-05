import type { Metadata, Viewport } from "next";
import { Jost, Instrument_Sans } from "next/font/google";
import { clinica } from "@/lib/clinica";
import { schemaClinica, schemaFaq, schemaSite } from "@/lib/schema";
import "./globals.css";

// Geométrica, como o letreiro da fachada e os títulos do manual da marca.
// A identidade pede formas suaves e nenhum clichê dental — uma serifa de
// display puxava para o editorial, que não é o que a Sencis é.
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinica.siteUrl),
  // O título abre com o termo que as pessoas digitam, não com a marca: quem já
  // conhece a Sencis busca por "sencis" e acha de qualquer jeito; quem não
  // conhece busca por "dentista em Goiânia".
  title: {
    default:
      "Dentista em Goiânia — Sencis Odontologia Integrada | Parque Amazônia",
    template: "%s | Sencis Odontologia",
  },
  description:
    "Clínica odontológica no Parque Amazônia, Goiânia. Clareamento, implante, aparelho, canal e limpeza com atendimento humanizado. Avaliação pelo WhatsApp: (62) 99227-2783.",
  keywords: [
    "dentista em Goiânia",
    "clínica odontológica Goiânia",
    "dentista Parque Amazônia",
    "clareamento dental Goiânia",
    "implante dentário Goiânia",
    "aparelho ortodôntico Goiânia",
    "lente de contato dental Goiânia",
    "tratamento de canal Goiânia",
    "odontologia integrada",
    "Sencis Odontologia",
  ],
  applicationName: clinica.nome,
  authors: [{ name: clinica.responsavel.nome }],
  creator: clinica.nome,
  publisher: clinica.nome,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: clinica.siteUrl,
    siteName: clinica.nome,
    title:
      "Sencis Odontologia Integrada — Dentista no Parque Amazônia, Goiânia",
    description:
      "Uma clínica onde a conversa vem antes do procedimento. Clínica geral, estética, ortodontia, implantes e canal em Goiânia.",
    images: [
      {
        // Recorte 1200x630 da fachada: quem recebe o link vê o letreiro que
        // vai procurar na calçada. Gerado em public/og.jpg.
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Fachada da Sencis Odontologia Integrada, com o letreiro dourado sobre a entrada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sencis Odontologia Integrada — Goiânia",
    description:
      "Clínica odontológica no Parque Amazônia, Goiânia. Atendimento humanizado, avaliação pelo WhatsApp.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Odontologia",
  icons: {
    icon: [{ url: "/icone.svg", type: "image/svg+xml" }],
    apple: "/icone.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#2b2e31",
  width: "device-width",
  initialScale: 1,
  // O site antigo travava o zoom com maximum-scale=1 e user-scalable=no,
  // o que impede alguém com baixa visão de ampliar o texto.
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [schemaClinica(), schemaFaq(), schemaSite()];

  return (
    <html
      lang="pt-BR"
      className={`${jost.variable} ${instrumentSans.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://maps.google.com" />
        <script
          type="application/ld+json"
          // Conteúdo próprio e estático, montado a partir de lib/schema.ts.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
