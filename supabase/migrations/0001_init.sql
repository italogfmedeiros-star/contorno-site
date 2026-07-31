-- Contorno — schema inicial (docs/escopo.md §7)
-- Fase 1 (MVP texto): scenarios, sessions, messages, reports.
-- `users` fica para a fase de painel do gestor, quando houver autenticação.

create extension if not exists "pgcrypto";

create table if not exists scenarios (
  id text primary key,
  nome text not null,
  setor text not null,
  tipo_objecao text not null,
  dificuldade text not null,
  created_at timestamptz not null default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  scenario_id text not null references scenarios(id),
  canal text not null default 'texto' check (canal in ('texto', 'voz')),
  status text not null default 'em_andamento' check (status in ('em_andamento', 'concluida')),
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table if not exists messages (
  id bigint generated always as identity primary key,
  session_id uuid not null references sessions(id) on delete cascade,
  role text not null check (role in ('cliente', 'vendedor', 'coach')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists reports (
  id bigint generated always as identity primary key,
  session_id uuid not null references sessions(id) on delete cascade,
  score_geral int not null check (score_geral between 0 and 100),
  score_categorias jsonb not null,
  insights jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_session_id_idx on messages(session_id);
create index if not exists sessions_scenario_id_idx on sessions(scenario_id);
create index if not exists reports_session_id_idx on reports(session_id);

-- RLS habilitado em todas as tabelas; nenhuma policy é criada porque, na
-- Fase 1, toda leitura/escrita acontece em rotas de servidor com a
-- service role key (que ignora RLS). Sem policies, acesso via chave
-- anônima fica bloqueado por padrão — abrir policies de leitura fica
-- para quando o painel do gestor (com autenticação) for construído.
alter table scenarios enable row level security;
alter table sessions enable row level security;
alter table messages enable row level security;
alter table reports enable row level security;
