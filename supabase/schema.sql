create extension if not exists "pgcrypto";

create table if not exists public.usuarios (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  nome text not null,
  email text not null unique,
  perfil text not null default 'atendente' check (perfil in ('administrador','gestor','atendente','advogado')),
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create table if not exists public.servicos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  slug text not null unique,
  descricao text,
  ativo boolean not null default true,
  ordem integer not null default 0,
  criado_em timestamptz not null default now()
);

create table if not exists public.etapas_funil (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  ordem integer not null,
  etapa_final boolean not null default false,
  tipo_final text,
  ativo boolean not null default true
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text not null,
  email text,
  cidade text,
  estado char(2),
  servico_id uuid references public.servicos(id),
  etapa_funil_id uuid references public.etapas_funil(id),
  responsavel_id uuid references public.usuarios(id),
  origem text,
  prioridade text not null default 'média' check (prioridade in ('baixa','média','alta','urgente')),
  status text not null default 'ativo',
  rede_social text,
  tipo_problema text,
  usuario_perfil text,
  observacoes text,
  ultimo_contato_em timestamptz,
  proximo_contato_em timestamptz,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

alter table public.usuarios enable row level security;
alter table public.servicos enable row level security;
alter table public.etapas_funil enable row level security;
alter table public.leads enable row level security;

create policy "usuarios autenticados leem usuarios" on public.usuarios for select to authenticated using (true);
create policy "usuarios autenticados leem servicos" on public.servicos for select to authenticated using (true);
create policy "usuarios autenticados leem etapas" on public.etapas_funil for select to authenticated using (true);
create policy "usuarios autenticados gerenciam leads" on public.leads for all to authenticated using (true) with check (true);

insert into public.servicos (nome, slug, ordem) values
('Instagram invadido','instagram-invadido',1),('Instagram suspenso','instagram-suspenso',2),
('Facebook invadido','facebook-invadido',3),('Facebook suspenso','facebook-suspenso',4),
('WhatsApp banido','whatsapp-banido',5),('WhatsApp invadido','whatsapp-invadido',6)
on conflict (slug) do nothing;

insert into public.etapas_funil (nome, ordem, etapa_final, tipo_final) values
('Novo',1,false,null),('Diagnóstico',2,false,null),('Aguardando informações',3,false,null),
('Aguardando documentos',4,false,null),('Em análise',5,false,null),('Qualificado',6,false,null),
('Proposta enviada',7,false,null),('Negociação',8,false,null),('Contratado',9,true,'contratado'),
('Perdido',10,true,'perdido'),('Caso incompatível',11,true,'perdido'),('Sem resposta',12,false,null);
