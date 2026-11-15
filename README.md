# Site institucional de escritório (demonstração)

> **Demonstração: escritório, profissionais, registros, contatos e depoimentos são fictícios.**
> Todos os dados deste projeto são placeholders e **devem ser substituídos antes de qualquer uso real**.

Site institucional em Next.js para um escritório fictício de advocacia em São Paulo/SP (Lacerda & Sampaio Advogados). Exemplo de portfólio.

## Como rodar

Requer Node.js 20.9 ou superior.

```bash
npm install
```

```bash
npm run dev
```

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento em http://localhost:3000 |
| `npm run build` | build de produção |
| `npm run start` | serve o build |
| `npm run lint` | ESLint |
| `npm test` | testes (Vitest + Testing Library) |

Deploy: Vercel, sem configuração especial. Defina as variáveis de ambiente no painel do projeto.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`.

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública, usada em metadata, sitemap, robots e JSON-LD |
| `RESEND_API_KEY` | chave do [Resend](https://resend.com) para o envio do formulário |
| `CONTACT_TO_EMAIL` | e-mail que recebe as mensagens |
| `CONTACT_FROM_EMAIL` | remetente (domínio verificado no Resend) |

**Formulário de contato.** Com `RESEND_API_KEY` e `CONTACT_TO_EMAIL` definidos, o route handler `/api/contato` envia a mensagem pela API do Resend (via `fetch`, sem dependência extra). Sem elas:

- em desenvolvimento, a mensagem é apenas registrada no console e a resposta é de sucesso;
- em produção, a resposta é de erro (503) e o visitante é orientado a usar telefone ou WhatsApp. O site nunca confirma um envio que não aconteceu.

**Mapa.** A página de contato incorpora o Google Maps por iframe, sem chave de API. O local vem de `site.contact.mapQuery` em `src/content/site.ts` (padrão: `"Brasil"`). Troque pelo endereço real.

## Estrutura de pastas

```
src/
  content/site.ts        fonte única de conteúdo: dados do escritório, textos, equipe,
                         áreas, FAQ, depoimentos, posts e o bloco SEGMENTO
  app/                   rotas (App Router)
    page.tsx             início
    sobre/               história, missão, valores e equipe
    areas-de-atuacao/    lista e [slug] (uma página por área)
    duvidas-frequentes/  FAQ completo
    blog/                lista e [slug] (artigos guardados em site.ts)
    contato/             formulário, canais, mapa
    privacidade/         aviso de privacidade (LGPD)
    api/contato/route.ts route handler do formulário
    sitemap.ts, robots.ts, not-found.tsx, error.tsx
    globals.css          tokens (variáveis CSS), base e classes utilitárias do tema
  components/            Header, Footer, SiteShell, Section (Section, Heading, PageHero,
                         CtaPanel, IconCircle), AreaCard, Faq, ContactForm, ProcessSteps,
                         Reveal, WhatsAppButtons, SocialLinks, Wordmark, JsonLd
  lib/                   contact-schema.ts (zod, cliente + servidor) e seo.ts (metadata, JSON-LD)
public/images/           fotos em WebP
docs/                    conteudos-necessarios.md e imagens-pendentes.md
tailwind.config.ts       mapeia as variáveis CSS para classes do Tailwind
```

**Por que App Router.** As páginas são conteúdo estático: como Server Components, saem pré-renderizadas e só o que é interativo (menu, accordion, formulário, fade-in) vai para o navegador. A Metadata API, `sitemap.ts`, `robots.ts` e os route handlers cobrem SEO e formulário sem bibliotecas extras.

## Como adaptar

Tudo fica em `src/content/site.ts`. Nenhum componente tem texto de negócio fixo.

- **Nome e logo:** o logotipo é um wordmark tipográfico gerado a partir de `site.name`. Trocar o dado troca o logo.
- **Cidade:** a constante `city` alimenta os textos de SEO local.
- **Segmento:** o bloco `segment`, no topo do arquivo, define rótulo, registro profissional (`OAB`) e tipo do Schema.org (`LegalService`). Para contabilidade use `CRC` e `AccountingService`; para engenharia, `CREA` e `ProfessionalService`. Os textos das áreas, FAQ e posts, logo abaixo no mesmo arquivo, precisam ser reescritos para o novo segmento.

## Paleta e tipografia

| Token | Cor | Uso |
|---|---|---|
| `--ink` | `#0F1B2D` | cor principal, textos e seções escuras |
| `--paper` / `--paper-deep` / `--surface` | `#F7F4EE` / `#EDE7DB` / `#FFFDF9` | fundos claros quentes, alternados entre seções |
| `--brass` | `#B08D57` | destaque: filetes, ícones, números, botão sobre fundo escuro |
| `--brass-ink` | `#7A5F33` | o mesmo destaque escurecido, para texto sobre fundo claro |

O azul-noite transmite sobriedade e autoridade sem o azul "padrão" de template. O fundo creme é mais acolhedor que o branco puro, e o latão aparece pouco, só para guiar o olhar. O latão original não atinge contraste AA como texto sobre creme (cerca de 2,9:1), por isso existe `--brass-ink` (cerca de 5,4:1); sobre o azul-noite o latão original passa (cerca de 5,5:1).

Títulos em **Fraunces** (serifada, com caráter editorial) e corpo em **Figtree** (sans-serif de leitura fácil), 17px com entrelinha 1,6, ambas via `next/font`. Container máximo de 1240px.

## SEO, LGPD e acessibilidade

- Título e descrição únicos por página, Open Graph, URLs legíveis, `lang="pt-BR"`, sitemap e robots.
- JSON-LD: `LegalService` em todas as páginas, `BreadcrumbList` nas internas, `FAQPage` onde há FAQ e `Article` nos posts.
- **LGPD:** página `/privacidade` e consentimento obrigatório no formulário, validado no cliente e no servidor. **O site não usa analytics nem cookies de rastreamento, por isso não há banner de cookies.** Se isso mudar, o banner e o aviso de privacidade precisam ser revistos. Atenção: o mapa do Google só carrega quando o visitante chega até ele (`loading="lazy"`), mas é conteúdo de terceiro e pode definir cookies próprios.
- Acessibilidade: contraste AA, foco visível, skip link, landmarks, hierarquia de títulos, menu mobile com foco preso e fechamento por Esc, accordion com `aria-expanded`, animações desativadas com `prefers-reduced-motion`.

## Nota sobre publicidade na advocacia

Os textos evitam promessa de resultado, superlativos, comparações e captação agressiva, em linha com o Código de Ética e Disciplina da OAB e o Provimento 205/2021. Antes de publicar um site real, o escritório deve validar o conteúdo com as regras vigentes da OAB. Dois pontos pedem atenção especial: **depoimentos de clientes** e **números como "clientes atendidos"** estão aqui porque o briefing da demonstração pediu, mas podem ser entendidos como captação e devem ser avaliados (ou removidos) em um site real.

## Testes

Cada teste traz um comentário de uma linha dizendo o que cobre.

- `src/components/ContactForm.test.tsx`: campos obrigatórios, e-mail inválido, telefone inválido, bloqueio sem consentimento, envio com sucesso e erro do servidor.
- `src/app/api/contato/route.test.ts`: rejeita payload inválido, rejeita honeypot preenchido, aceita payload válido.
- `src/app/pages.test.tsx`: home, sobre, área, contato e privacidade mostram o `h1` e o aviso de dados fictícios.
- `src/components/Header.test.tsx`: menu mobile abre pelo teclado e fecha com Esc, devolvendo o foco.

## Imagens

As fotos vêm do Unsplash (hero e retratos da equipe) e do Wikimedia Commons (biblioteca e estantes), todas com licença de uso livre e crédito no rodapé. Os retratos são de banco de imagens: veja `docs/imagens-pendentes.md` para substituí-los.

## Pendências conhecidas

- Retratos da equipe são fotos de banco, com nomes fictícios.
- Sem limite de requisições no `/api/contato`: há honeypot e validação, mas adicione rate limit antes de uso real.
- Para um escritório real, veja `docs/conteudos-necessarios.md`.
# lacerda-e-sampaio-advogados
