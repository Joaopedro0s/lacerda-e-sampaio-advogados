# Conteúdos que o escritório real precisa fornecer

Tudo o que hoje é placeholder em `src/content/site.ts`.

## Identidade

- Nome do escritório e razão social.
- Logotipo em vetor (SVG), se houver. Hoje o logo é um wordmark gerado a partir do nome.
- Cidade e UF de atuação.

## Registros profissionais

- Número de inscrição da sociedade na OAB.
- Número de inscrição na OAB de cada profissional exibido.
- CNPJ, para o aviso de privacidade.

## Equipe

- Nome completo, cargo e área de cada integrante.
- Formação (graduação, pós-graduação, instituições).
- Retrato de cada pessoa, com o mesmo enquadramento e fundo (ver `imagens-pendentes.md`).
- Autorização de uso de imagem de cada integrante.

## Contato

- Endereço completo e termo para o mapa (`site.contact.mapQuery`).
- Telefone fixo e número de WhatsApp.
- E-mail de contato e e-mail que receberá as mensagens do formulário.
- Horários de atendimento.
- Links reais das redes sociais (ou a indicação de quais remover).

## Textos finais

- Proposta de valor e texto de apresentação.
- História, missão e valores.
- Áreas de atuação: o que é atendido, para quem, situações comuns e perguntas frequentes de cada uma.
- FAQ geral, revisado por um profissional.
- Artigos do blog (os três atuais são exemplos).
- Números de confiança (anos de atuação, clientes atendidos), se forem mantidos.

## Depoimentos

- Depoimentos reais, com autorização por escrito de cada cliente e sem dados sigilosos do caso.
- Avaliação prévia de compatibilidade com as regras de publicidade da OAB. Se houver dúvida, remover a seção.

## Fotografia

- Fotos do escritório (recepção, sala de reunião, fachada) em alta resolução.
- Créditos e licenças de qualquer imagem de banco.

## Políticas e conformidade

- Aviso de privacidade revisado: controlador, encarregado (DPO) e canal de contato, prazos de retenção, operadores envolvidos.
- Validação de todo o conteúdo com o Código de Ética e o Provimento 205/2021 da OAB.
- Decisão sobre analytics e cookies. Hoje não há nenhum; se forem adicionados, será preciso banner de consentimento.

## Infraestrutura

- Domínio e URL final (`NEXT_PUBLIC_SITE_URL`).
- Conta no Resend com domínio verificado (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`).
- Conta na Vercel para o deploy.
