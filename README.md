# Sencis Odontologia Integrada — site

Site de página única da Sencis (Parque Amazônia, Goiânia/GO), com rolagem
animada. Plano visual e de movimento em `design-plan.md` e no Figma
(https://www.figma.com/design/iaF5FVNgYIOh0CCQnFgeDm). Dados de origem em
`briefing.md`.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4
(só os tokens; o visual está em `app/globals.css`) · GSAP + ScrollTrigger ·
Lenis (rolagem suave). Tudo instalado pelo npm, sem CDN.

## Rodar

```bash
npm install
npm run dev        # desenvolvimento, recarrega sozinho
npm run build      # build de produção
npm run start      # serve o build (porta 3000, ou PORT=3200 npm run start)
```

Antes de entregar qualquer mudança:

```bash
npm run typecheck && npm run lint && npm run build
```

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Telefone, WhatsApp, endereço, horário, CRO, nota do Google, Instagram | `lib/clinica.ts` (fonte única: precisa bater com o Perfil da Empresa no Google) |
| Textos dos tratamentos, do encontro, da primeira consulta, da harmonização e as perguntas | `lib/conteudo.ts` |
| Foto ou vídeo de um tratamento | `lib/conteudo.ts`, campo `midia` do tratamento. O arquivo vai em `public/fotos` ou `public/videos` |
| Fotos da abertura, da clínica e da galeria | `components/secoes/abertura.tsx` e `components/secoes/clinica.tsx` (lista `salas`) |
| Fotos de resultados (lentes, harmonização, botox) | `components/secoes/resultados.tsx` (lista `casos`) |
| Textura do fundo | `public/textura/` e o bloco "o fundo: mármore" em `app/globals.css` |
| Cores e fontes | `app/globals.css` (bloco `@theme`) e `app/layout.tsx` (fontes) |
| Logotipo | `components/marca.tsx` e o desenho do N em `lib/traco.ts` (provisório, redesenhado da fachada) |
| Caminho do fio que atravessa a página | `lib/fio.ts` (uma rota por seção) |
| Título e descrição para o Google, imagem de compartilhamento | `app/layout.tsx` e `public/og.jpg` |
| Dados estruturados (JSON-LD de dentista e perguntas) | `lib/schema.ts` (lê de `lib/clinica.ts` e `lib/conteudo.ts`) |

### Trocar ou acrescentar mídia

- **Fotos:** coloque o arquivo em `public/fotos/` com nome em kebab-case pelo que
  mostra (`consultorio-janela.png`) e informe `largura` e `altura` reais no
  conteúdo. As fotos aparecem inteiras, sem recorte: a moldura segue a proporção
  do arquivo.
- **Vídeos:** MP4 H.264 sem áudio, vertical 3:4 (1080×1440 é o ideal), até 6 MB,
  com um pôster JPG do primeiro quadro. Os vídeos tocam mudos, em loop, só quando
  aparecem na tela.
- Material bruto enviado pela clínica fica em `fotos/` e `videos/` na raiz, que
  estão fora do git. Só entra no site o que for escolhido e copiado para `public/`.

## Como a página se move

Ordem das seções (`app/page.tsx`): abertura, o encontro, a primeira consulta,
tratamentos, resultados, harmonização orofacial, a clínica, perguntas, visita,
rodapé.

- **Fundo:** veios de mármore (o mármore da fachada e da bandeja do café) em
  `public/textura/`, gerados sem emenda para repetir. Ficam atrás do fio e
  derivam devagar com a rolagem (`--deriva`), inclusive nos trechos fixados.

- **Abertura:** a única animação que roda sozinha, ao carregar.
- **O encontro** (fixada): as palavras essência, essencial e sense se alinham
  pelas letras em comum e sobra o nome SENCIS.
- **Tratamentos** (fixada, com parada em cada item): a lista passa pelo eixo; o
  detalhe e o vídeo trocam ao lado.
- **O fio:** um traço só, que nasce como o braço do N na abertura, vira o eixo do
  encontro e dos tratamentos, acende em nude na clínica e termina no N do rodapé.
  Ele se desenha conforme a rolagem e passa pelos vãos entre os blocos, calculado
  a partir da posição real deles (`lib/fio.ts`, `components/fio-da-pagina.tsx`).
  No celular e com movimento reduzido, corre pela margem direita.

Regras que evitam quebra (detalhes em `components/` e na skill `site-premium`):

1. Anime só `transform`, `opacity`, `filter`, `clip-path` e o traço
   (`stroke-dashoffset`).
2. Dois tweens nunca mexem na mesma propriedade do mesmo elemento.
3. No máximo dois trechos fixados na página. Os gatilhos são criados na ordem das
   seções, e o fio (`FioDaPagina`) vem depois de tudo.
4. Na seção de tratamentos, só os títulos (`h3`) recebem transform. `ol` e `li`
   ficam sem posição e sem transform, senão o detalhe e a mídia se deslocam.
5. Traços usam `pathLength="1000"` e vão de 1000 a 0. O GSAP arredonda px para
   inteiro: com `pathLength="1"`, o traço só ligava e desligava.
6. Tudo que anima tem caminho sem movimento (`prefers-reduced-motion`): sem pin,
   sem rolagem suave, conteúdo à vista.

## Testes que foram feitos

- TypeScript e ESLint sem erros; build de produção estático.
- Prints automáticos em 1440×900 e 390×844, também com movimento reduzido, pelo
  script `prints.mjs` da skill `site-premium`. Console sem erros.
- Menu do celular (abre, deixa o resto `inert`, fecha com Esc, devolve o foco) e
  botão fixo de WhatsApp testados com Playwright.
- **Não testado:** Safari em iPhone de verdade, Firefox, 768px. Faça isso antes de
  publicar.

## Pendências

- Logotipo oficial em SVG (o atual é provisório).
- Confirmar com a clínica: odontopediatria como serviço próprio, quem faz a
  limpeza de pele, consentimento para fotos de antes e depois, e a divergência
  "desde 2017" (Instagram) × "clínica nova" (versão atual do site).
- Publicação: domínio sencis.com.br na Vercel (hoje aponta para a versão atual).
  Ao trocar, manter o `siteUrl` de `lib/clinica.ts` igual ao domínio de produção.
