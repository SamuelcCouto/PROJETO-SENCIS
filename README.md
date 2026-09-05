# Sencis Odontologia Integrada

Site da Sencis Odontologia Integrada — Parque Amazônia, Goiânia/GO.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · deploy na Vercel.

## Rodar

```bash
npm install
npm run dev
```

`npm run build` para o build de produção, `npm run typecheck` para checar tipos sem gerar saída.

## Onde ficam as coisas

| Caminho | O que é |
| --- | --- |
| `app/page.tsx` | Monta a página única, na ordem das seções |
| `app/layout.tsx` | Metadados, fontes e injeção do JSON-LD |
| `app/api/agendamentos/route.ts` | Recebe pedidos de agendamento |
| `components/` | Uma seção por arquivo |
| `lib/clinica.ts` | **Endereço, telefone, horário, CRO — fonte única** |
| `lib/tratamentos.ts` | Os procedimentos e como as pessoas os procuram |
| `lib/faq.ts` | Perguntas frequentes (viram schema `FAQPage`) |
| `lib/schema.ts` | JSON-LD de busca local |
| `lib/agendamento/` | Contrato, validação e repositório de agendamentos |

### Mexer nos dados da clínica

Endereço, telefone, horário e CRO saem todos de `lib/clinica.ts`. Editar lá
atualiza a página, o rodapé, o mapa e o JSON-LD de uma vez.

O que estiver ali precisa bater **exatamente** com o Perfil da Empresa no
Google. Divergência de nome, endereço ou telefone entre o site e o perfil
enfraquece a busca local — é o erro mais comum e o mais fácil de evitar.

## O backend de agendamentos

Ainda não existe agenda. O que existe é o encaixe pronto para ela:

```
FormAgendamento → POST /api/agendamentos → pedidoAgendamentoSchema (zod)
                                         → RepositorioAgendamentos
                                         → WhatsApp da clínica
```

Hoje `RepositorioEmMemoria` (`lib/agendamento/repositorio.ts`) só valida e
registra; a entrega real acontece no WhatsApp, que é o canal que a recepção lê
todo dia.

Para ligar uma agenda de verdade, escreva uma classe que implemente
`RepositorioAgendamentos` e troque a linha da fábrica em `obterRepositorio()`.
Nem a rota nem o formulário precisam mudar.

**Antes de tirar o passo do WhatsApp**, garanta que o novo destino avisa alguém.
Um pedido que entra no banco e não dispara notificação é um paciente perdido em
silêncio — pior do que não ter formulário.

## SEO local

- `Dentist` + `FAQPage` + `WebSite` em JSON-LD, montados em `lib/schema.ts`
- `app/sitemap.ts` e `app/robots.ts` gerados pelo Next
- `public/og.jpg` (1200×630) para pré-visualização de link

Não existe `aggregateRating` no schema, e isso é de propósito: marcar a nota da
própria empresa no próprio site é *self-serving review* pelas diretrizes do
Google — inelegível para rich result e sujeito a ação manual. A nota 5,0 aparece
na tela, creditada ao Google, mas fora do JSON-LD.

O site sustenta relevância e destaque. **Posição no Google Maps quem decide é o
Perfil da Empresa no Google**, não o site — veja `docs/visibilidade-google.md`.
