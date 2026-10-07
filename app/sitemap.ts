import type { MetadataRoute } from "next";
import { clinica } from "@/lib/clinica";

/**
 * Página única. As fotos entram no sitemap para aparecerem na busca de imagens
 * ("consultório odontológico Parque Amazônia", "lentes de porcelana Goiânia").
 * São os arquivos originais em public/, que mantêm a URL entre um build e outro
 * (as versões do next/image mudam).
 */
const fotos = [
  "fachada.png",
  "recepcao-poltronas.png",
  "recepcao-cafe.png",
  "consultorio-janela.png",
  "planejamento.jpg",
  "camera-intraoral.jpg",
  "implantes-lentes-porcelana.jpg",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: clinica.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: fotos.map((f) => `${clinica.siteUrl}/fotos/${f}`),
    },
  ];
}
