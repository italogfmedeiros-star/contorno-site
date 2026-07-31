-- Captura de leads da landing page (formulário de acesso antecipado)

create table if not exists leads (
  id bigint generated always as identity primary key,
  nome text not null,
  email text not null unique,
  whatsapp text,
  empresa text,
  tamanho_time text,
  created_at timestamptz not null default now()
);

-- Mesma postura do 0001: RLS ligado, sem policies — escrita só via
-- service role key nas rotas de servidor.
alter table leads enable row level security;
