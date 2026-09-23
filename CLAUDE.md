# Sencis Odontologia Integrada

## Visão geral do código

Site de página única da clínica Sencis (Parque Amazônia, Goiânia/GO), em
produção em `https://www.sencis.com.br`. O conteúdo é dado estático em `lib/`,
renderizado no servidor; o único ponto dinâmico é `POST /api/agendamentos`, que
valida o pedido e devolve o paciente para o WhatsApp da clínica. Boa parte do
código existe para SEO local: JSON-LD `Dentist`, metadados e sitemap, travados
por testes.

**Stack**: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
Zod · Vitest · Vercel.
**Estrutura**: `app/` (layout, página, API, sitemap) · `components/` (uma seção
por arquivo) · `lib/` (dados, JSON-LD, contrato de agendamento) · `tests/`
(unidade e SEO) · `public/fotos` e `public/videos`.

Arquitetura detalhada, pegadinhas e onde mexer para cada tarefa:
[docs/CODEBASE_MAP.md](docs/CODEBASE_MAP.md). Estratégia de busca local:
[docs/visibilidade-google.md](docs/visibilidade-google.md).

## Regras

- Nome, endereço, telefone e CRO saem só de `lib/clinica.ts`, e precisam bater
  com o Perfil da Empresa no Google.
- Código, nomes e comentários em português, seguindo o estilo existente.
- Antes de entregar: `npm run typecheck && npm run lint && npm run build && npm test`
  (a suíte de HTML só roda com build).
- Performance se mede comparando o código antigo e o novo na mesma máquina, com
  várias execuções: um número isolado do Lighthouse varia até 7 pontos.
