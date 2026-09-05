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

### 7. Domínio próprio

`projeto-sencis.vercel.app` é um subdomínio da Vercel. Um domínio próprio
(`sencisodontologia.com.br`) melhora confiança, permite e-mail com o domínio da
clínica e é o que se cadastra nos diretórios acima. Custa pouco e é o próximo
passo natural.

---

## O que o site já passou a fazer

- Declara `Dentist` em JSON-LD, com endereço, coordenadas, horário, serviços e
  responsável técnica — antes não declarava nada, e o Google só conseguia
  associar a página à marca "sencis"
- Lista os seis grupos de tratamento com os termos que as pessoas realmente
  buscam. O site antigo não citava **nenhum** procedimento em lugar nenhum
- Tem FAQ com `FAQPage`, elegível para resposta direta na busca
- Cita o bairro e os bairros vizinhos no texto
- Carrega imagens em AVIF/WebP e sem CSS externo bloqueante
- Tem `sitemap.xml`, `robots.txt` e imagem de compartilhamento

Isso sustenta **relevância** e ajuda em **destaque**. Não substitui o perfil.

---

## Como medir

1. **Google Search Console** — cadastrar o site e enviar o sitemap.
2. **Estatísticas do perfil** — acompanhar "como as pessoas encontram você".
   A métrica que importa é a divisão entre busca **direta** (procuraram "sencis")
   e busca por **descoberta** (procuraram "dentista"). Hoje é quase toda direta.
   O objetivo é ver descoberta crescer.
3. Refazer o teste "dentista perto de mim" a partir do Parque Amazônia, uma vez
   por mês, sempre em aba anônima.

## Prazo honesto

Busca local se move em **4 a 12 semanas**, não em dias. Categoria e serviços
costumam refletir em uma ou duas semanas; avaliações e citações são acúmulo.
Ninguém consegue garantir posição — quem garante está vendendo outra coisa.
