# Jiu-Dina — Landing +250 Dinâmicas Interativas de Jiu-Jitsu

Clone da landing page `dinamicas-jiu-jitsu.vercel.app`. É um site estático, sem build:
um `index.html`, o Tailwind via CDN e as imagens locais.

## Rodar

```bash
node server.js
```

Abre em http://localhost:5173 (servidor estático em `server.js`, sem dependências).
Também dá para abrir o `index.html` direto no navegador.

## Estrutura

```
index.html        página inteira (marcação + estilos + scripts)
config.js         links de checkout, pixel, WhatsApp, vídeo e contador
server.js         servidor estático para desenvolvimento (não vai para o deploy)
vercel.json       força deploy estático na Vercel
assets/img/       imagens
assets/favicon.svg
```

## Deploy

É um site estático: a Vercel serve os arquivos da raiz, sem build.

O `vercel.json` existe porque a Vercel detectava o projeto como servidor Node
(por causa do `server.js` + `package.json`) e tentava executá-lo, devolvendo 404 em vez
da página. Com `"framework": null` ela usa o preset "Other" e serve os arquivos direto.
O `package.json` foi removido pelo mesmo motivo — o site não depende de nada.

## Antes de publicar — preencha `config.js`

Os valores do site original foram removidos; os campos estão vazios esperando os seus:

| Campo | O que é |
| --- | --- |
| `metaPixelId` | Pixel da Meta — **preenchido** (`1059796013613866`); `""` desliga |
| `utmifyPixelId` | Pixel da UTMify — **preenchido** (`6a8750047b15a79c1cf556ad`); `""` desliga |
| `wistiaMediaId` | vídeo do topo da página de vendas, na Wistia — **já preenchido** (`i4q5pjvdok`) |
| `vslMediaId` | vídeo da VSL do quiz (`quiz/vsl.html`), na Wistia — **já preenchido** (`1f7llb243d`) |
| `links.checkoutPremium` | botão "Quero o Premium" — R$ 19,90 |
| `links.checkoutUpsell` | botão do modal — R$ 14,90 |
| `links.checkoutBasico` | link "Continuar com o básico" — R$ 10,00 |
| `links.whatsapp` | botão flutuante de WhatsApp |
| `timerStartSeconds` / `timerResetSeconds` | contador de escassez da seção de planos |

A capa do vídeo é o arquivo `assets/img/video-capa.jpg`, baixado da própria Wistia. Para
trocar, é só substituir o arquivo (proporção 9:16).

Os pixels (Meta e UTMify) são carregados uma única vez pelo `config.js` e valem para
**todas** as páginas — a de vendas e todas as etapas do quiz.

Enquanto um campo estiver vazio a página continua funcionando: o pixel não dispara, a capa
do vídeo não abre o player, os botões de checkout ficam sem destino e o botão flutuante de
WhatsApp não é exibido.

As imagens em `assets/img/` (depoimentos, capas dos bônus, mockup do produto) ainda são as
do material original — substitua pelas suas antes de colocar no ar.

## Fluxo da página

1. **Hero** — capa do vídeo; o player da Wistia só é carregado no clique (`loadWistiaVideo`).
2. **O que você vai receber / Para quem é / Bônus** — conteúdo estático.
3. **Planos** (`#planos`) — contador regressivo, plano Básico e Premium.
   O botão do Básico não vai direto pro checkout: abre o modal de upsell de R$ 14,90.
4. **Depoimentos** — carrossel de 7 prints, avança sozinho a cada 4s.
5. **Garantia, FAQ (accordion), rodapé e botão de WhatsApp.**

## Nota técnica

O Tailwind é carregado por `cdn.tailwindcss.com`, que compila as classes no navegador —
funciona, mas em produção pesa e mostra um aviso no console. Para eliminar isso, dá para
gerar um CSS compilado com o Tailwind CLI e trocar o `<script>` por um `<link>`.
