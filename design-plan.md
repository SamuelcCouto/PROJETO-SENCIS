# Plano de design — Sencis Odontologia Integrada

Status: **construído e em validação** (27/09/2026). Base: `briefing.md`. Manutenção: `README.md`.
Figma (5 pranchas: paleta, tipografia e marca, movimento, mapa de seções, telas-chave):
https://www.figma.com/design/iaF5FVNgYIOh0CCQnFgeDm

## Tema
Sujeito: uma clínica odontológica de bairro nobre em Goiânia, onde o tratamento começa com escuta.
Público: mulheres de 25 a 50 anos que já se frustraram com dentista; também homens e famílias.
Função da página: levar a pessoa a agendar a avaliação pelo WhatsApp sentindo que vai ser ouvida.
Detalhe que só este site teria: o **N do letreiro da fachada**, desenhado como um traço caligráfico
dourado que sobe acima das outras letras, e a **parede da recepção**, onde a luz vaza por trás de um
recorte e desenha um contorno. As duas coisas existem na clínica e viram o vocabulário visual do site.

## Paleta
Os cinco tons da cartela, sem tom inventado. Os três tons de texto derivados só mudam a luminosidade
(mesmo matiz e croma no OKLCH) e existem para passar no WCAG AA. Cálculo em `scratchpad/contraste.py`.

| Token | Hex | Papel |
|-------|-----|-------|
| `--papel` | #F3EFE6 | fundo base (off-white quente da cartela; nunca branco puro) |
| `--creme` | #E8D8C1 | fundo das seções alternadas e das janelas de mídia |
| `--nude` | #D2BAA0 | a luz: o traço do N sobre grafite; superfícies; filetes decorativos |
| `--azul` | #455F80 | ação: botão, link, foco de teclado; fundo da faixa de visita |
| `--grafite` | #3A3A3A | texto principal; fundo das cenas escuras (a clínica acende) |
| `--azul-profundo` | #354F6F | texto azul sobre nude e creme (4,51 e 6,01) |
| `--nude-texto` | #715C45 | texto secundário sobre papel e creme (5,51 e 4,53) |
| `--azul-claro` | #89A6CA | link sobre grafite (4,53) |

Pares liberados para texto corrido: grafite sobre papel (9,91), creme (8,14) e nude (6,11);
papel sobre azul (5,72); azul sobre papel (5,72) e creme (4,69); nude sobre grafite (6,11).
Proibido: nude, creme ou papel entre si como texto; grafite sobre azul.
Bordas funcionais e foco precisam de 3:1: usam azul ou grafite, nunca nude.

## Tipografia
Display: **Ysabeau** (Google Fonts, variável). Sans humanista com proporções de Garamond e traço
levemente caligráfico: conversa com o N do letreiro sem cair na serifa de alto contraste.
Pesos 200 a 400. Títulos em caixa normal, sem caixa-alta espaçada.
Texto: **Albert Sans** (Google Fonts). Grotesca geométrica e neutra, eco do "ODONTOLOGIA" da fachada.
Pesos 400 e 500. Corpo 17px, entrelinha 1,65, medida máxima de 62 caracteres.

Escala (Elements of Typographic Style, razão ~1,333 no corpo):
- palavras do encontro: `clamp(3.5rem, 12vw, 11rem)`, Ysabeau 200
- título do hero: `clamp(2.75rem, 1.6rem + 5.2vw, 6.5rem)`, Ysabeau 300, entrelinha 1,02
- h2: `clamp(2rem, 1.2rem + 3vw, 3.75rem)`, Ysabeau 300
- item de tratamento no eixo: `clamp(1.75rem, 1rem + 2.6vw, 3.25rem)`, Ysabeau 300
- h3: 1.5rem, Albert Sans 500
- corpo: 1.0625rem; apoio: 0.875rem

Logo: SENCIS em caixa-alta geométrica com o N em traço caligráfico. Enquanto o SVG oficial não chega,
o N é redesenhado em SVG a partir da foto da fachada (serve também de caminho para a animação).

## Layout
Grade de 12 colunas, largura máxima 1320px, margem lateral 16px no celular e 40px no desktop.
Texto alinhado à esquerda, sempre. Nada centralizado a não ser o nome no momento do encontro.
Estrutura com significado: a única linha recorrente é **o eixo**, que aparece só onde há alinhamento
(no encontro e na lista de tratamentos). Sem filetes decorativos entre seções, sem rótulo acima de título.
Botões retangulares com raio de 3px. Fotos sempre inteiras, sem recorte e sem sombra: a moldura segue a
proporção do arquivo. (Revisão de 27/09: a primeira versão recortava as fotos pela curva do N e cortava
pessoas; o recorte saiu e a curva virou o fio da página.)

```
ABERTURA (papel)                                   O ENCONTRO (papel, fixado)
+-----------------------------------------------+  +-----------------------------------------------+
| SE\/CIS                         Agendar       |  |                   |                           |
|                                               |  |      essência     |   aquilo que nos torna    |
| Cuidar de um             +-----------\        |  |      essencial    |   únicos                  |
| sorriso é olhar          |  foto:     )       |  |          sense    |                           |
| para além dele.          |  escuta   /        |  |                   |  <- eixo                  |
|                          |  (planej.) (       |  |   letras se alinham no eixo, o resto apaga,   |
| Parque Amazônia, Goiânia +-----------/        |  |   sobra SENCIS e o N vira o traço             |
| [Agendar avaliação] [Ligar]                   |  +-----------------------------------------------+
+-----------------------------------------------+

TRATAMENTOS (creme, fixado)                        A CLÍNICA (grafite)
+-----------------------------------------------+  +-----------------------------------------------+
|  Clínica geral              +---------+       |  |        traço do N se desenha em luz nude      |
|  Estética do sorriso        |  vídeo  |       |  |        e a recepção aparece dentro dele       |
|  -- Ortodontia ----------- eixo ------|------ |  |                                               |
|     resolve: dentes tortos | clipe   |       |  |  recepção | café | consultório | corredor     |
|     [Perguntar sobre isso] +---------+       |  |  5,0 no Google, 54 avaliações (link)          |
|  Implantes e próteses                         |  +-----------------------------------------------+
|  Canal e urgência                             |
+-----------------------------------------------+
```

## Identidade de movimento
Materiais e objetos do mundo do cliente: letras douradas sobre mármore claro, com o N em traço único;
a parede da recepção com luz indireta vazando por trás de um recorte; porcelana (as lentes e o bule do
café); madeira em forma de seixo nas mesas; tecido cinza e manta azul-marinho; a tela do tablet onde
a câmera intraoral mostra ao paciente o próprio dente.

Verbos desses objetos: o traço corre numa pincelada só; a luz acende devagar, por trás, e contorna;
a porcelana é ajustada até encaixar sem folga; o dente é alinhado aos poucos até o eixo; o café é
servido e assenta; a câmera aproxima.

Três adjetivos: **acolhedora, firme, sensível** (a personalidade descrita no manual).

Gesto-assinatura: **o encontro no eixo.** Elementos que chegam levemente fora de lugar deslizam devagar,
sem quique e sem sobra, até um eixo comum. No momento marcante, as palavras essência, essencial e sense
deslizam até empilhar as letras que têm em comum (S, E, N), o resto apaga e sobra o nome SENCIS.

Gestos de apoio:
- **O fio da página.** Um traço só, desenhado pela rolagem: nasce na abertura como o braço e a volta do
  N, desce entre o título e a foto, vira o eixo do encontro, dobra no eixo dos tratamentos, acende em
  nude com halo baixo na clínica (a luz indireta da parede da recepção) e termina entrando na volta do
  N do rodapé. A rota é calculada pela posição real dos blocos (`lib/fio.ts`), então passa sempre pelos
  vãos e nunca por cima de texto ou foto. No celular e com movimento reduzido, corre pela margem direita.
- **Correção suave.** Na lista de tratamentos, o item que chega ao eixo sai de 1° e 10px de desvio e assenta.

Curvas e tempo: `power2.out` para assentar (firme, sem passar do ponto); `sine.inOut` para a luz (como
um dimmer); `scrub: 1` nos trechos amarrados à rolagem. Abertura com 1,6s no total. Nenhuma animação
abaixo de 0,6s.

O que a marca não faz: blur como transição e cortina do centro (ORVA); tranco, `back.out` e `elastic`
(Stillo); `steps()` e blocos de pixel (Detera); parallax em toda foto; entrada fade-up em cada seção;
hover que aumenta card; brilho intenso ou colorido.

Teste da troca: com a paleta e as fontes da ORVA, três palavras que se alinham até formar SENCIS e o N
do letreiro acendendo continuam sendo desta marca e de nenhuma outra.

## Mapa de seções
| Ordem | Seção | Mecânica | Gesto | Conteúdo |
|-------|-------|----------|-------|----------|
| 1 | Abertura | sem pin; animação única ao carregar | o fio nasce como o braço do N, a foto aparece inteira, a frase assenta | "Cuidar de um sorriso é olhar para além dele." Parque Amazônia, Goiânia. Agendar avaliação / Ligar |
| 2 | O encontro | **pin 1**, `+=180%`, scrub | encontro no eixo (assinatura) | essência, essencial, sense viram SENCIS; "É desse encontro que nasce a nossa forma de enxergar uma odontologia humanizada." |
| 3 | A primeira consulta | editorial com coluna sticky (CSS) | foto troca com correção suave | 1. Escuta em confiança (planejamento). 2. Tecnologia em proximidade (câmera intraoral). 3. Conhecimento em clareza (plano por escrito, em ordem de urgência, custo antes). Numerado porque é sequência real |
| 4 | Tratamentos | **pin 2**, snap por item | a lista passa pelo eixo; a janela de mídia troca | 6 tratamentos (mais odontopediatria, se confirmado), cada um com "Perguntar sobre ___" no WhatsApp |
| 5 | Rosto | bloco curto, sem pin | nenhum | Botox e harmonização (HOF), com peso visual menor |
| 6 | A clínica | revelação amarrada à rolagem, sem pin | o fio acende em nude e desce pelo corredor da galeria | recepção, café, consultório com janela, corredor, fachada; nota 5,0 no Google com link |
| 7 | Perguntas | `<details>` nativo | nenhum | 8 perguntas da v1 |
| 8 | Visita | grade, fundo azul | nenhum | endereço, horário, mapa carregado por clique, WhatsApp e telefone |
| 9 | Rodapé | grade, fundo grafite | nenhum | "Essencial na forma. Sentido na essência de cada sorriso.", CROs, Instagram |

Celular (< 768px): o encontro continua fixado, mais curto (`+=120%`). Os tratamentos viram lista
vertical sem pin, com a mídia dentro de cada item. Botão fixo de WhatsApp aparece depois da abertura.
Movimento reduzido: sem Lenis e sem pin. O encontro mostra o estado final, o traço já aparece desenhado
e a lista de tratamentos rola normal.

## Momento marcante
**O encontro.** O nome é o conceito da marca ("Sencis nasce do encontro entre essência, essencial e
sense") e só esta clínica pode contar isso com movimento. É onde a pessoa entende o sentido do nome
antes de ver qualquer procedimento.

## Stack
Next.js 16 (App Router), React 19, TypeScript, Tailwind 4 com tokens no `@theme`, GSAP com
ScrollTrigger e `@gsap/react`, Lenis (tudo pelo npm), `next/font` para Ysabeau e Albert Sans, Vercel.
Mecânica de `referencia-nextjs/` (`lib/motion.ts`, `SmoothScroll`, `useCenaFixada`), gestos escritos
nos componentes deste projeto. Dados da clínica numa fonte única (`lib/clinica.ts`) e JSON-LD `Dentist`
mantidos, para não perder o SEO local que a v1 construiu.

## Mídia necessária
| Peça | Origem | Status |
|------|--------|--------|
| Logo SVG oficial | clínica | falta; provisório: N redesenhado da fachada |
| Foto da abertura | `fotos/planejamento.jpg` (1000×1000) | serve; ideal a original em 2000px ou mais |
| Vídeo de abertura (opcional) | produção: a parede da recepção acendendo ou o café sendo servido, 8 a 10 s, 1920×1080 e vertical | falta; o site funciona sem ele |
| Clipes dos tratamentos | `videos/*.mp4` (480×640) | servem numa janela de até 360px; ideal regravar em 1080×1440 |
| Câmera intraoral | `fotos/camera-intraoral.jpg` | ok |
| Clínica | recepção, café, consultório, corredor, fachada | ok; equalizar o balanço de branco. A foto do café abre a cena (as avaliações do Google citam o café) |
| Clínica geral, gengiva, odontopediatria | — | sem mídia; entram só com tipografia |
| Botox e harmonização | fotos de antes e depois | só com consentimento por escrito |

## Revisão contra o briefing
O que parecia genérico e foi trocado:
- Fundo creme com serifa de alto contraste no título: é o visual mais repetido em sites gerados. O
  creme é da marca e fica; o título vai em Ysabeau, e a identidade vem do N e do eixo.
- Seis cards de tratamento com ícone: vetado. Virou a lista que passa pelo eixo, com vídeo real.
- Três cards para "como funciona": vetado. Virou editorial sticky com passos numerados, porque a
  primeira consulta é mesmo uma sequência.
- Carrossel de depoimentos: vetado sem autorização. Fica a nota do Google com link.
- Rótulo em caixa-alta acima de cada título: cortado.

Enfeite cortado: halo forte no traço (reduzido a 35%), parallax nas fotos da clínica, contador animado
de avaliações (o número aparece parado), segunda cena fixada na clínica (virou revelação sem pin).
