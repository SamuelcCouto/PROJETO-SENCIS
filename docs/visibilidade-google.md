# Por que a Sencis não aparece em "dentista" no mapa

## O diagnóstico, sem rodeio

**O site não decide posição no Google Maps.** Quem decide é o Perfil da Empresa
no Google (o antigo Google Meu Negócio). O site sustenta dois dos três fatores,
mas o trabalho pesado está no perfil.

O Google usa três fatores para a busca local, e ele mesmo os publica:

| Fator | O que significa | Quem controla |
| --- | --- | --- |
| **Distância** | A que distância você está de onde a pessoa buscou | Ninguém |
| **Relevância** | Se o perfil corresponde ao que foi digitado | Perfil + site |
| **Destaque** | Quão conhecida a empresa é online | Avaliações, citações, site |

### Sobre o segundo print

Na busca por "odontologia", o mapa está centrado na região do Setor
Bueno / Jardim América. O Parque Amazônia aparece só na borda inferior. Os
resultados exibidos ficam todos perto do centro daquele mapa.

Ou seja: boa parte do que parece "sumiço" é **distância**, e distância não tem
conserto. A Sencis nunca vai aparecer para quem busca do Setor Bueno — nem
deveria. A meta correta é aparecer para quem busca **do Parque Amazônia e dos
bairros vizinhos**, e é isso que dá para conquistar.

Repita o teste assim: no celular, dentro do Parque Amazônia, buscando
"dentista perto de mim". Esse é o resultado que importa.

---

## O que fazer, em ordem de impacto

### 1. Categorias do perfil — o ajuste mais importante

A categoria principal é o que mais define para quais buscas você aparece. Hoje o
perfil está como "Clínica odontológica", o que explica não aparecer bem em
"dentista".

- **Categoria principal:** `Dentista`
- **Categorias adicionais:** `Clínica odontológica`, `Ortodontista`,
  `Implantodontista`, `Dentista cosmético`, `Endodontista`

Cadastre apenas as que a clínica realmente atende. Categoria falsa derruba o
perfil inteiro se for denunciada.

### 2. Serviços e descrição

No perfil, preencha a lista de **Serviços** com os mesmos tratamentos que estão
no site: clareamento dental, lente de contato dental, implante, aparelho
ortodôntico, alinhador, tratamento de canal, limpeza, prótese, periodontia.

Na descrição, escreva com as palavras que as pessoas digitam e cite o bairro:

> Clínica odontológica no Parque Amazônia, em Goiânia. Clínica geral,
> clareamento, lentes de contato dental, ortodontia, implantes, canal e
> periodontia. Atendimento humanizado, com avaliação e plano de tratamento por
> escrito. Responsável técnica: Arielly Vieira da Silva, CRO-GO 16695.

### 3. Atributos

Marque tudo que se aplica — cada atributo é um filtro em que você pode aparecer:

- Entrada acessível para cadeira de rodas *(já está)*
- Banheiro, Wi-Fi, estacionamento na rua
- Aceita novos pacientes
- Agendamento por mensagem
- **Empresa de propriedade de mulheres** — atributo real do perfil, rende um
  selo visível e aparece em buscas filtradas

### 4. Avaliações — a maior alavanca de destaque

São 50 avaliações com nota 5,0. É uma base boa, mas os concorrentes que
apareceram no print têm 79, 578. Volume pesa.

O que fazer:

- Pedir avaliação a **toda** paciente satisfeita, no fim da consulta, com o link
  curto do perfil aberto no celular da recepção. Pedido feito na hora converte
  muito mais do que mensagem no dia seguinte.
- **Pedir que a pessoa cite o procedimento e o bairro no texto.** O texto das
  avaliações é indexado e influencia diretamente para quais buscas você aparece.
  Uma avaliação que diz *"fiz clareamento na Sencis, no Parque Amazônia"* vale
  muito mais que *"ótimo atendimento"*.
- Responder **todas**, inclusive as ruins. Resposta é sinal de perfil ativo.

Meta realista: +10 a 15 avaliações por mês.

### 5. Fotos e posts

- Subir fotos novas toda semana — perfis atualizados são favorecidos.
- Publicar um Post por semana (caso, dica, horário de feriado). Some em 7 dias,
  então precisa de ritmo.

### 6. Citações: o mesmo endereço em todo lugar

Cadastre a clínica nestes lugares, com nome, endereço e telefone **idênticos**
aos do perfil (copie de `lib/clinica.ts`):

- Doctoralia e BoaConsulta — os dois mais relevantes em saúde no Brasil
- Apple Business Connect — quem tem iPhone usa Apple Maps, e hoje a clínica
  provavelmente não existe lá
- Bing Places, Waze, Foursquare, Apontador, GuiaMais

Endereço escrito de forma diferente em cada lugar divide a autoridade em vez de
somar. É o erro mais comum e o mais fácil de evitar.

### 7. Domínio próprio — feito

`sencis.com.br` foi registrado e apontado para a Vercel via delegação de
nameservers. `www.sencis.com.br` é a URL de produção; o domínio nu redireciona
(308) para ela. É esse endereço que agora deve ser cadastrado em todos os
diretórios do item 6 e no Google Search Console — não mais o
`projeto-sencis.vercel.app` antigo.

Depois que o DNS propagar (algumas horas), confirme com um teste simples:
abrir `https://sencis.com.br` no celular, fora de rede Wi-Fi conhecida, e ver
se carrega com o cadeado de site seguro.

---

## O que o site já passou a fazer

- Declara `Dentist` em JSON-LD, com endereço, coordenadas, horário, serviços e
  responsável técnica — antes não declarava nada, e o Google só conseguia
  associar a página à marca "sencis"
- Lista os seis grupos de tratamento com os termos que as pessoas realmente
  buscam. O site antigo não citava **nenhum** procedimento em lugar nenhum
- Tem FAQ com oito perguntas reais — conteúdo que o Google lê. (O destaque de
  FAQ no resultado foi restrito pelo Google em 2023 a sites governamentais e de
  saúde de grande autoridade; uma clínica não se qualifica.)
- Cita o bairro e os bairros vizinhos no texto
- Carrega imagens em AVIF/WebP e sem CSS externo bloqueante
- Tem `sitemap.xml` (com as fotos, para a busca de imagens), `robots.txt` e
  imagem de compartilhamento
- Título com 59 caracteres e descrição com 144, começando por "Dentista" — no
  limite em que o Google não corta. O título antigo tinha 68 e perdia o bairro.
- Redireciona `projeto-sencis.vercel.app` para `www.sencis.com.br` (308). Antes o
  endereço antigo servia uma cópia idêntica do site, e o Google dividia a
  relevância entre as duas.
- O JSON-LD passa sem nenhum erro no vocabulário oficial do schema.org. Havia
  três propriedades que o Google simplesmente ignorava (`availableService`,
  `availableLanguage` e um `inLanguage`), e a acessibilidade para cadeira de
  rodas não estava declarada.

Tudo isso é travado por testes automáticos (ver o README): se uma mudança futura
quebrar o schema, o título ou o sitemap, o teste falha antes de o Google notar.

Medição de 16/09/2026, Lighthouse em produção: **SEO 100** no celular e no
desktop; performance 81 no celular e 98 no desktop.

Isso sustenta **relevância** e ajuda em **destaque**. Não substitui o perfil.

---

## O que ficou de fora porque muda o visual

Estas três melhorias foram identificadas, mas não aplicadas: cada uma altera algo
que a clínica vê. Cabe a ela decidir.

### O site quase não usa a palavra "dentista"

No texto visível da página, "dentista" aparece **duas vezes**, e o título
principal (h1) não contém a palavra. O Google tem o termo no título da aba, na
descrição e no schema — mas o conteúdo em si fala "odontologia" (9 vezes) e
"clínica odontológica". Para quem busca "dentista", o texto da página conta.

Sugestão de menor impacto visual: incluir "dentista" em uma frase que já existe,
por exemplo no parágrafo logo abaixo do título ("A Sencis é uma clínica
odontológica…" → "A Sencis é uma clínica de dentistas…"), sem mexer no h1.

### No celular, a foto principal demora a aparecer

A maior imagem da primeira tela (a foto da recepção) leva **3,7 s** para
aparecer numa conexão móvel simulada; o Google considera bom até 2,5 s. A foto já
é pré-carregada e baixa em 0,25 s — o atraso de quase 0,9 s está em ela
**aparecer**, porque a animação de entrada começa com a foto invisível e só
começa a revelá-la 180 ms depois. Tirar o fade só da foto (mantendo o
deslizamento) deve recuperar boa parte desse tempo. Velocidade no celular é um
fator pequeno, mas real, de posição.

### Dois textos com pouco contraste

A linha "Também procurado como…" nos tratamentos (contraste 2,5:1) e os textos
pequenos sobre o fundo nude da seção de estética (4,1:1) ficam abaixo do mínimo
de legibilidade (4,5:1). Não afeta posição no Google diretamente, mas afeta quem
lê no sol ou tem visão cansada.

---

## Como medir

1. **Google Search Console** — cadastrar a propriedade do tipo **Domínio**
   (`sencis.com.br`), que cobre com e sem www de uma vez. O Search Console pede
   um registro TXT; como o DNS está na Vercel, ele é criado no painel da Vercel
   em *Domains → sencis.com.br → DNS Records*. Depois, enviar
   `https://www.sencis.com.br/sitemap.xml`.
2. **No Perfil da Empresa no Google**, o campo *Site* precisa ser
   `https://www.sencis.com.br` — e não o endereço antigo da Vercel. É o elo que
   liga o perfil ao site.
3. **Estatísticas do perfil** — acompanhar "como as pessoas encontram você".
   A métrica que importa é a divisão entre busca **direta** (procuraram "sencis")
   e busca por **descoberta** (procuraram "dentista"). Hoje é quase toda direta.
   O objetivo é ver descoberta crescer.
4. Refazer o teste "dentista perto de mim" a partir do Parque Amazônia, uma vez
   por mês, sempre em aba anônima.

Quando o perfil estiver com o link certo, vale me passar a URL dele no Google
Maps: ela entra no `sameAs` do schema e amarra o site ao perfil de forma
explícita.

## Prazo honesto

Busca local se move em **4 a 12 semanas**, não em dias. Categoria e serviços
costumam refletir em uma ou duas semanas; avaliações e citações são acúmulo.
Ninguém consegue garantir posição — quem garante está vendendo outra coisa.
