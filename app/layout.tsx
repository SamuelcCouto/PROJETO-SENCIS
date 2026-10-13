import type { Metadata, Viewport } from "next";
import { Albert_Sans, Ysabeau } from "next/font/google";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { clinica } from "@/lib/clinica";
import { schemaClinica, schemaFaq, schemaSite } from "@/lib/schema";
import "./globals.css";

// Ysabeau: sans humanista com proporções de Garamond, conversa com o N
// caligráfico do letreiro. Só os pesos que os títulos usam.
const ysabeau = Ysabeau({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
  variable: "--fonte-ysabeau",
});

// Albert Sans: grotesca geométrica, eco do "ODONTOLOGIA" da fachada.
const albert = Albert_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--fonte-albert",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinica.siteUrl),
  title: {
    default: "Dentista em Goiânia no Parque Amazônia | Sencis Odontologia",
    template: "%s | Sencis Odontologia",
  },
  description:
    "Dentista no Parque Amazônia, em Goiânia. Clareamento, implante, aparelho, canal e limpeza, com atendimento humanizado. WhatsApp (62) 99227-2783.",
  applicationName: clinica.nome,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: clinica.siteUrl,
    siteName: clinica.nome,
    title: "Sencis Odontologia Integrada, dentista no Parque Amazônia, Goiânia",
    description: "Odontologia que começa entendendo você. Clínica geral, estética, ortodontia, implantes e canal no Parque Amazônia, Goiânia.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Fachada da Sencis Odontologia, com o letreiro dourado sobre a entrada" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F3EFE6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [schemaClinica(), schemaFaq(), schemaSite()];
  return (
    <html lang="pt-BR" className={`${ysabeau.variable} ${albert.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
