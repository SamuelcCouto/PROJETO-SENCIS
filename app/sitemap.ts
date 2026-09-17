import type { MetadataRoute } from "next";
import { clinica } from "@/lib/clinica";

/**
 * As fotos entram no sitemap para aparecerem na busca de imagens — quem procura
 * "clareamento dental Goiânia" ou "consultório odontológico Parque Amazônia"
 * pelo Google Imagens chega aqui.
 *
 * São os arquivos originais em public/, não as versões otimizadas do
 * next/image, que mudam de URL a cada build. tests/seo/metadados.test.ts
 * confere que cada um existe: renomear uma foto sem atualizar esta lista quebra
 * o teste, não o Google.
 */
const fotos = [
  "fachada.png",
  "recepcao-poltronas.png",
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
