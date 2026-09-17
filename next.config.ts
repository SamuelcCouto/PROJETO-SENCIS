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
        // O endereço original da Vercel continuava servindo o site inteiro, e o
        // Google enxergava duas cópias idênticas, dividindo a relevância entre
        // elas. O redirecionamento permanente (308) diz qual é a oficial.
        //
        // Casa só este host exato: os links de preview de cada branch
        // (projeto-sencis-git-*.vercel.app) continuam abrindo normalmente.
        // O destino precisa ser o mesmo siteUrl de lib/clinica.ts — o teste em
        // tests/seo/metadados.test.ts falha se divergirem.
        source: "/:path*",
        has: [{ type: "host", value: "projeto-sencis.vercel.app" }],
        destination: "https://www.sencis.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
