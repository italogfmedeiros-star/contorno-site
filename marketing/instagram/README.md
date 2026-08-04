# Instagram — Contorna AI

Peças e plano de conteúdo do lançamento do **Contorna AI**, geradas a partir da
identidade visual do site publicado em [contorna.ai](https://contorna.ai).

## O que tem aqui

```
PLANO.md                                      o plano em markdown (legendas copiáveis)
Contorna-AI-Plano-de-Conteudo-Instagram.pdf   o mesmo plano, apresentável (10 páginas, A4)
brand/contorna-mark.svg                       a marca
feed/                                         perfil (1080×1080) + 5 posts (1080×1350)
stories/                                      5 stories (1080×1920)
src/                                          fontes das peças + script de renderização
```

O conteúdo é o mesmo nos dois formatos — use o que servir melhor:

- **[`PLANO.md`](./PLANO.md)** para o dia a dia: as legendas estão em blocos de
  código, prontas para copiar, e o checklist tem caixas marcáveis.
- **[PDF](./Contorna-AI-Plano-de-Conteudo-Instagram.pdf)** para apresentar ou
  imprimir: traz as artes em miniatura junto de cada estratégia.

## A sequência

Lançamento em 5 posts ao longo de 14 dias, do teaser à conversão. Cada post do
feed tem uma versão equivalente em story, publicada no mesmo dia.

| # | Fase | Post | Objetivo |
|---|---|---|---|
| 1 | Expectativa | Toda venda trava num "não" | Curiosidade e comentários, sem revelar o produto |
| 2 | Lançamento | Chegou o Contorna AI | Anunciar e mostrar o produto em 3 segundos |
| 3 | Educação | Nota da rodada: 8.5 | Diferencial: avalia o que você responde |
| 4 | Objeção | A objeção de quem vende seguro… | Quebrar o "IA não entende meu nicho" |
| 5 | Conversão | Seu próximo "tá caro"… | Converter quem acompanhou a sequência |

As datas sugeridas no PDF são um ponto de partida — o que importa é manter a
ordem e o espaçamento entre as peças.

## Identidade visual

| Token | Hex | Uso |
|---|---|---|
| Verde marca | `#00B487` | Logo, acertos, notas |
| Laranja ação | `#EF4E17` | CTAs, destaques, rótulos |
| Ponto / objeção | `#E6482F` | O ponto da logo, o risco sobre o "não" |
| Fundo creme | `#F7F5F0` | Base de todas as artes |
| Texto | `#1B1914` | Títulos e corpo |
| Texto suave | `#7B776C` | Apoio e legendas |

Tipografia: **Bricolage Grotesque** (títulos, 800), **Inter** (corpo),
**IBM Plex Mono** (rótulos e dados).

Duas regras que se repetem em todas as peças: o **"não" sempre aparece riscado**
em `#E6482F`, e o conteúdo dos stories nunca invade as faixas de interface do
Instagram (~270px no topo, ~300px no rodapé).

## Regenerando as peças

As artes são HTML renderizado pelo Chromium — para editar um texto ou uma cor,
mexa no HTML e rode o script.

```bash
cd src
npm i -D playwright && npx playwright install chromium

node render.js            # tudo
node render.js feed       # só as artes de feed
node render.js stories    # só os stories
node render.js pdf        # só o PDF
```

| Arquivo | Gera |
|---|---|
| `src/artes.html` | perfil + 5 posts de feed |
| `src/stories.html` | 5 stories |
| `src/plano.html` | o PDF (embute as imagens de `feed/` e `stories/`) |

O PDF é montado a partir das imagens já geradas, então rode `feed` e `stories`
antes dele — `node render.js` sem argumento já respeita essa ordem.

### Por que duas pastas de fonte

- `src/fonts-screen/` — WOFF2 variável, usado nos PNGs.
- `src/fonts-print/` — WOFF estático, usado no PDF.

O Chromium **não embute fontes variáveis** ao exportar PDF: ele substitui por
uma fonte genérica do sistema. As versões estáticas resolvem isso e garantem que
o PDF abra igual em qualquer máquina. Não troque a referência de fonte do
`plano.html` para a pasta `fonts-screen` — o PDF perde a tipografia da marca.

As três famílias são licenciadas sob a
[SIL Open Font License](https://openfontlicense.org/), que permite redistribuição.

## Notas de publicação

- **Stories:** o respiro na parte de baixo de cada tela é proposital — é onde
  entra o sticker nativo do Instagram (clicável e relevante para o algoritmo).
  A página 9 do PDF indica qual sticker usar em cada uma.
- **Post 5:** o valor da assinatura aparece borrado de propósito, para gerar
  curiosidade e levar ao clique. A legenda acompanha essa escolha e não revela o
  preço.
- **Antes do post 2 ir ao ar:** ele manda tráfego direto para contorna.ai.
  Confirme que o fluxo de avaliação está funcionando de ponta a ponta.
