# Manual de marca — Contorna AI

Documento de referência para propósito, valores, tom de voz e regras de uso de
logotipo, cores e tipografia da Contorna AI — pra garantir consistência em
qualquer canal (produto, redes sociais, material comercial).

## O que tem aqui

```
Contorna-AI-Manual-de-Marca.pdf   o manual completo (13 páginas, A4)
exemplos/                         peças de outros canais usadas na pág. "Aplicações"
src/                               fonte do manual + script de renderização
```

## Sistema documentado

Este manual documenta o sistema visual **Contorna AI** — creme `#F7F5F0`,
verde `#00B487`, laranja `#EF4E17` — usado em todo o material de
`marketing/instagram/` e nas peças comerciais. Esse é o sistema em uso ativo
desde a campanha de lançamento no Instagram.

**Atenção:** o site publicado em `app/` hoje usa um sistema visual diferente
(nome "contorno" minúsculo, tema escuro, paleta coral/teal, assinado
"DEVOPSIA" no rodapé). Isso está documentado e sinalizado na página 6 do
manual ("Naming") como uma divergência a resolver — não é um erro deste
documento, é o estado real encontrado no repositório.

## Regenerando o PDF

```bash
cd src
npm i -D playwright && npx playwright install chromium
node render.js
```

O HTML referencia as fontes de `marketing/instagram/src/fonts-print/` (não
duplicadas aqui) e imagens de `marketing/instagram/feed/`, `stories/` e
`destaques/` na página de aplicações — não mova ou renomeie essas pastas sem
atualizar os caminhos em `src/manual-de-marca.html`.

## Ao criar uma peça nova

Antes de desenhar algo novo pra Contorna AI, comece pela página 13
(checklist rápido) do manual. Se qualquer resposta for "não", volte pras
páginas 7-11 (logo, cores, tipografia, sistema visual) antes de publicar.
