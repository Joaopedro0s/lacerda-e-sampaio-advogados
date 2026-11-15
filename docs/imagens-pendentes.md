# Imagens pendentes

Unsplash e Pexels bloquearam o download automatizado (HTTP 401). As fotos de ambiente foram obtidas no Wikimedia Commons; os retratos da equipe ficaram como placeholders com a proporção final.

## Retratos da equipe (obrigatório)

Enquadramento igual para todos: do peito para cima, fundo neutro, sorriso discreto, luz suave.

| Arquivo | Tamanho | Onde é usado | Termo de busca |
|---|---|---|---|
| `public/images/equipe-1.webp` | 800 × 1000 px (4:5) | `/sobre`, sócia-fundadora | `professional woman portrait neutral background` |
| `public/images/equipe-2.webp` | 800 × 1000 px (4:5) | `/sobre`, sócio | `businessman portrait suit gray background` |
| `public/images/equipe-3.webp` | 800 × 1000 px (4:5) | `/sobre`, advogada | `young lawyer woman headshot studio` |
| `public/images/equipe-4.webp` | 800 × 1000 px (4:5) | `/sobre`, advogado | `man headshot blazer studio neutral` |

Depois de salvar os arquivos, preencha o campo `photo` de cada pessoa em `site.team` (`src/content/site.ts`), por exemplo `photo: "/images/equipe-1.webp"`. O placeholder some sozinho. Inclua o crédito em `site.photoCredits`.

## Fotos de ambiente (substituição recomendada)

As três fotos atuais funcionam, mas mostram bibliotecas e documentos, não um escritório. Em um site real, use fotos do próprio espaço.

| Arquivo atual | Tamanho | Onde é usado | Termo de busca para substituir |
|---|---|---|---|
| `public/images/contrato.webp` | 1920 × 1440 px | hero da home e imagem Open Graph | `law office interior desk` |
| `public/images/biblioteca.webp` | 1920 × 1107 px | faixa full-bleed da home | `law firm meeting room` |
| `public/images/estantes.webp` | 1920 × 1272 px | `/sobre`, história | `office reception bookshelf` |

Ao trocar, atualize `src`, `width`, `height` e `alt` em `site.ts` e os créditos em `site.photoCredits`.
