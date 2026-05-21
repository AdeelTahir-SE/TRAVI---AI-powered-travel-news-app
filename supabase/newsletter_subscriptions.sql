-- ============================================================
-- TRAVI — Newsletter Subscriptions Table
-- Run this in the Supabase SQL Editor
-- ============================================================

create extension if not exists "uuid-ossp";

create table if not exists public.newsletter_subscription (
  newsletter_subscription_id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  email text not null unique,
  source text not null default 'footer',
  is_active boolean not null default true
);

create index if not exists newsletter_subscription_created_at_idx
  on public.newsletter_subscription (created_at desc);

create index if not exists newsletter_subscription_email_idx
  on public.newsletter_subscription (email);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists newsletter_subscription_updated_at on public.newsletter_subscription;
create trigger newsletter_subscription_updated_at
  before update on public.newsletter_subscription
  for each row execute function public.set_updated_at();

alter table public.newsletter_subscription enable row level security;

drop policy if exists "newsletter_subscription_public_insert" on public.newsletter_subscription;
create policy "newsletter_subscription_public_insert"
  on public.newsletter_subscription for insert
  to public
  with check (true);

drop policy if exists "newsletter_subscription_admin_read" on public.newsletter_subscription;
create policy "newsletter_subscription_admin_read"
  on public.newsletter_subscription for select
  to authenticated
  using (true);

drop policy if exists "newsletter_subscription_admin_update" on public.newsletter_subscription;
create policy "newsletter_subscription_admin_update"
  on public.newsletter_subscription for update
  to authenticated
  using (true)
  with check (true);