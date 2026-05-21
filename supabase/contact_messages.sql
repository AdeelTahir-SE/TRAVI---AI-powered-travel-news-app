-- ============================================================
-- TRAVI — Contact Messages Table
-- Run this in the Supabase SQL Editor
-- ============================================================

create extension if not exists "uuid-ossp";

create table if not exists public.contact_message (
  contact_message_id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  subject text not null default 'general',
  message text not null,
  status text not null default 'new'
);

create index if not exists contact_message_created_at_idx
  on public.contact_message (created_at desc);

create index if not exists contact_message_email_idx
  on public.contact_message (email);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contact_message_updated_at on public.contact_message;
create trigger contact_message_updated_at
  before update on public.contact_message
  for each row execute function public.set_updated_at();

alter table public.contact_message enable row level security;

drop policy if exists "contact_message_public_insert" on public.contact_message;
create policy "contact_message_public_insert"
  on public.contact_message for insert
  to public
  with check (true);

drop policy if exists "contact_message_admin_read" on public.contact_message;
create policy "contact_message_admin_read"
  on public.contact_message for select
  to authenticated
  using (true);

drop policy if exists "contact_message_admin_update" on public.contact_message;
create policy "contact_message_admin_update"
  on public.contact_message for update
  to authenticated
  using (true)
  with check (true);