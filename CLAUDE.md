# Sencis Odontologia Integrada — v2

Site de página única da clínica Sencis (Parque Amazônia, Goiânia/GO), em
produção em `https://www.sencis.com.br`. A v2 substituiu a v1 em outubro de
2026; a v1 continua no histórico do git.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4
(tokens) · GSAP + ScrollTrigger · Lenis · Vercel.

Como rodar, onde trocar cada conteúdo e as regras de movimento: `README.md`.
Plano visual e de movimento: `design-plan.md`. Origem dos dados: `briefing.md`.
Estratégia de busca local: `docs/visibilidade-google.md`.

## Regras

- Nome, endereço, telefone e CRO saem só de `lib/clinica.ts` e precisam bater
  com o Perfil da Empresa no Google. O `siteUrl` de lá é o mesmo destino do
  redirecionamento em `next.config.ts`.
- Código, nomes e comentários em português, seguindo o estilo existente.
- Fotos sempre inteiras, sem recorte. O fio da página (`lib/fio.ts`) passa
  pelos vãos e nunca por cima de texto ou foto.
- Pedidos da clínica que não podem regredir (os testes conferem): título do
  topo "Odontologia que começa entendendo você", limpeza de pele junto com
  botox e harmonização (fora do JSON-LD), nenhuma dentista em destaque (a
  responsável técnica só no rodapé), todas as fotos que a clínica mandou.
- Responsividade: seção fixada nunca maior que a tela; em coluna única, foto
  com `max-height: 82svh`; link com área de toque de 44 px. Detalhes no README.
- Antes de entregar: `npm run typecheck && npm run lint && npm run build && npm test`.
