import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // O endereço da Vercel servia o site inteiro e o Google via duas cópias.
        // O 308 diz qual é a oficial. Só este host: as prévias de cada branch
        // (projeto-sencis-git-*.vercel.app) continuam abrindo.
        // O destino precisa ser o mesmo siteUrl de lib/clinica.ts.
        source: "/:path*",
        has: [{ type: "host", value: "projeto-sencis.vercel.app" }],
        destination: "https://www.sencis.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
