# Contorno

Simulador de vendas com IA para treino de objeção — Devopsia.

Um agente de IA finge ser o cliente mais difícil do seu mercado; enquanto o vendedor conversa
com ele, um segundo agente (coach) sussurra ajustes em tempo real; ao final, um terceiro agente
gera um relatório com score e pontos cegos. Escopo completo do produto em [`docs/escopo.md`](docs/escopo.md).

## Status

Scaffold funcional da **Fase 1 do roadmap** (MVP texto — ver escopo §8): landing page,
biblioteca de 3 personas, chat vendedor ↔ Agente Cliente, Agente Coach ao vivo e Agente de
Relatório ao final da sessão. Canal de voz (Fase 3) e painel do gestor (Fase 4) ainda não
foram construídos.

## Stack

| Camada | Escolha |
|---|---|
| Frontend | Next.js 16 (App Router) |
| Backend/dados | Supabase (Postgres) |
| Agente Cliente / Agente Coach / Relatório | API Anthropic (`@anthropic-ai/sdk`) |
| Deploy | Vercel |

## Estrutura

```
app/
  page.tsx                 landing page
  simulate/page.tsx         escolha de persona, chat e relatório (client component)
  api/agent/cliente/        rota do Agente Cliente
  api/agent/coach/          rota do Agente Coach
  api/agent/report/         rota do Agente de Relatório
lib/
  scenarios.ts               biblioteca de personas/cenários
  prompts.ts                 system prompts (com restrições anti scenario-drift, escopo §9)
  anthropic.ts                chamadas à API Anthropic para os 3 agentes
  supabase/server.ts          cliente Supabase (service role, uso só em rotas de servidor)
  persistence.ts              escrita best-effort de sessões/mensagens/relatórios
supabase/migrations/0001_init.sql   schema (scenarios, sessions, messages, reports)
docs/escopo.md               escopo completo do produto
```

## Rodando localmente

Requer Node.js 20+.

```bash
npm install
cp .env.example .env.local   # preencha as chaves abaixo
npm run dev
```

Variáveis de ambiente (`.env.local`):

- `ANTHROPIC_API_KEY` — obrigatória para a simulação funcionar (Agente Cliente/Coach/Relatório).
- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — opcionais. Sem elas, a simulação
  funciona normalmente, só não fica salva (persistência é best-effort, ver `lib/persistence.ts`).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — reservada para quando o painel do gestor (Fase 4) precisar
  de acesso client-side com autenticação.

Para habilitar a persistência, crie um projeto em [supabase.com](https://supabase.com) e rode a
migration em `supabase/migrations/0001_init.sql` (via `supabase db push` ou colando o SQL no
SQL Editor do painel).

## Deploy

Projeto Next.js padrão — importe o repositório na Vercel e configure as mesmas variáveis de
ambiente de `.env.example` no painel do projeto.
