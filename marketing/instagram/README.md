# Instagram — Contorna AI

Peças e plano de conteúdo do lançamento do **Contorna AI**, geradas a partir da
identidade visual do site publicado em [contorna.ai](https://contorna.ai).

## O que tem aqui

```
Contorna-AI-Plano-de-Conteudo-Instagram.pdf   plano completo (13 páginas, A4)
brand/contorna-mark.svg                       a marca
feed/                                         perfil (1080×1080) + 6 posts (1080×1350)
carrossel/                                    6 slides do carrossel de objeções (1080×1350)
stories/                                      5 stories (1080×1920)
reels/                                        3 capas de Reels (1080×1920) + 5 destaques (1080×1080)
src/                                          fontes das peças + script de renderização
```

O PDF é o documento principal: traz a identidade visual, o cronograma, a
estratégia de cada peça, as legendas prontas para copiar e o guia de stories.

## A sequência

Lançamento em 5 posts ao longo de 14 dias, do teaser à conversão, mais duas
peças que sustentam o perfil depois dela. Os posts 1 a 5 têm uma versão
equivalente em story, publicada no mesmo dia.

| # | Data | Fase | Post | Objetivo |
|---|---|---|---|---|
| 1 | seg 10/08 | Expectativa | Toda venda trava num "não" | Curiosidade e comentários, sem revelar o produto |
| 2 | qui 13/08 | Lançamento | Chegou o Contorna AI | Anunciar e mostrar o produto em 3 segundos |
| 3 | dom 16/08 | Educação | Nota da rodada: 8.5 | Diferencial: avalia o que você responde |
| 4 | qui 20/08 | Objeção | A objeção de quem vende seguro… | Quebrar o "IA não entende meu nicho" |
| 5 | dom 23/08 | Conversão | Seu próximo "tá caro"… | Converter quem acompanhou a sequência |
| 6 | qui 27/08 | Salvamento | Carrossel: 4 objeções que travam a venda | Utilidade pura — maximizar salvamento e alcance |
| 7 | dom 30/08 | Marca | Por que criamos o Contorna AI | Humanizar depois da sequência comercial |

As datas sugeridas no PDF são um ponto de partida — o que importa é manter a
ordem e o espaçamento entre as peças.

O carrossel e o post de bastidor vêm **depois** da conversão de propósito: quem
não comprou no post 5 passa a receber utilidade em vez de oferta, e só faz
sentido contar por que a empresa existe depois que o público já sabe o que ela
faz.

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

Três regras que se repetem em todas as peças: o **"não" sempre aparece riscado**
em `#E6482F`; os ícones são **de traço, monocromáticos**, herdando a cor do
contexto; e o conteúdo dos stories nunca invade as faixas de interface do
Instagram (~270px no topo, ~300px no rodapé).

Numa citação de duas linhas, cada linha precisa do seu próprio `.strike` — o
risco é um traço único sobre o elemento e, num bloco de duas linhas, cairia no
vão entre elas.

## Regenerando as peças

As artes são HTML renderizado pelo Chromium — para editar um texto ou uma cor,
mexa no HTML e rode o script.

```bash
cd src
npm i -D playwright && npx playwright install chromium

node render.js            # tudo
node render.js feed       # só as artes de feed
node render.js carrossel  # só o carrossel
node render.js stories    # só os stories
node render.js reels      # só as capas de Reels e os destaques
node render.js pdf        # só o PDF
```

Se a máquina já tem um Chromium que o Playwright não reconhece como o dele,
aponte o binário em vez de baixar outro:

```bash
CHROMIUM_PATH=/caminho/para/chrome node render.js
```

| Arquivo | Gera |
|---|---|
| `src/base.css` | tokens e componentes comuns a todas as peças de tela |
| `src/artes.html` | perfil + 6 posts de feed |
| `src/carrossel.html` | 6 slides do carrossel |
| `src/stories.html` | 5 stories |
| `src/reels.html` | 3 capas de Reels + 5 ícones de destaque |
| `src/plano.html` | o PDF (embute as imagens das outras pastas) |

O PDF é montado a partir das imagens já geradas, então rode as peças antes
dele — `node render.js` sem argumento já respeita essa ordem.

`base.css` carrega os tokens e os componentes compartilhados nas medidas do
feed (1080×1350). As peças maiores sobem a escala na própria página. O
`plano.html` **não** usa `base.css`: ele imprime em PDF e depende das fontes
estáticas.

Um detalhe de CSS que já causou bug: `.foot .lock .nm` é o lockup do rodapé, e
uma regra como `#p2 .lock .nm` vence por especificidade e vaza nele. O lockup do
cabeçalho tem nome próprio (`.hero-lock`) por isso — não volte a chamá-lo de
`.lock`.

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
  O PDF indica qual sticker usar em cada uma.
- **Reels:** o vídeo sai em 1080×1920, mas a grade do perfil recorta uma faixa
  central de 1080×1350. O texto das capas está todo dentro dessa faixa. Suba a
  capa em "capa personalizada" — se deixar o Instagram escolher um frame, a
  grade perde a unidade.
- **Destaques:** são recortados em círculo, por isso os ícones ficam centrados e
  sem texto. Nomeie cada destaque com uma palavra só, para não truncar.
- **Post 5:** o valor da assinatura aparece borrado de propósito, para gerar
  curiosidade e levar ao clique. A legenda acompanha essa escolha e não revela o
  preço.
- **Antes do post 2 ir ao ar:** ele manda tráfego direto para contorna.ai.
  Confirme que o fluxo de avaliação está funcionando de ponta a ponta.
