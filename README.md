# Contorna AI

LP institucional — Devopsia.

Apresenta o produto (Treinador, Copiloto ao vivo, Closer autônomo) e o problema que ele resolve:
treino de objeção em vendas. Sem simulador funcional, sem captura de leads, sem conta de
usuário — puramente estática. A visão completa do produto está em
[`docs/escopo.md`](docs/escopo.md); esta LP é a vitrine, não a implementação.

## Stack

| Camada | Escolha |
|---|---|
| Frontend | Next.js 16 (App Router), 100% estático |
| Deploy | Vercel, conectado ao GitHub — push em `main` publica sozinho |

Sem backend: nenhuma rota de API, nenhum banco, nenhuma variável de ambiente obrigatória.

## Estrutura

```
app/
  page.tsx              a página inteira — hero, problema, produto, inteligência, prova, fechamento
  layout.tsx             fontes e metadata
  globals.css             identidade visual (ver tokens abaixo)
  components/Mark.tsx      o símbolo da marca (SVG)
docs/escopo.md           visão completa do produto — o que existe hoje é só a LP
```

## Identidade visual

Mesma paleta e tipografia das peças de Instagram (`marketing/instagram/src/base.css`): fundo
creme `#F7F5F0`, texto `#1B1914`, laranja de ação `#EF4E17`, verde de acerto — `--win`
(`#00B487`) para preenchimento, `--win-deep` (`#00815F`) para tipografia, porque o verde puro
não tem contraste suficiente sobre o creme. O "não" riscado (`.strike`) é regra da marca e vale
em qualquer título, não só no `h1`.

## Rodando localmente

```bash
npm install
npm run dev
```

Sem `.env` para configurar.

## Deploy

Projeto Next.js padrão na Vercel, conectado a este repositório — push em `main` dispara build e
deploy automáticos. Sem variáveis de ambiente a configurar.

## Fechamento (CTA)

A seção final (`id="contato"` em `app/page.tsx`) hoje é só texto — não há canal de contato
definido. Quando houver (WhatsApp, e-mail ou Instagram), trocar o `<p className="lead-sub">`
por um link/botão apontando para ele; o comentário no JSX marca onde.

## Instagram

Peças de lançamento e o plano de conteúdo ficam em [`marketing/instagram/`](marketing/instagram/README.md) —
documentação própria, independente desta LP.
