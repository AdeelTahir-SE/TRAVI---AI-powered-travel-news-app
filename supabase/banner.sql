-- ============================================================
-- TRAVI — Banners Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================


-- ─────────────────────────────────────────────
-- 1. BANNER TABLE
-- ─────────────────────────────────────────────
create table if not exists public.banner (
  banner_id    bigserial   primary key,
  title        text        not null,
  zone         text        not null check (zone in ('header', 'sidebar', 'in-content', 'footer')),
  image        text        not null,
  link         text        not null default '',
  start_date   date,
  end_date     date,
  active       boolean     not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-update updated_at on every row update
drop trigger if exists banner_updated_at on public.banner;
create trigger banner_updated_at
  before update on public.banner
  for each row execute function public.set_updated_at();

-- Indexes
create index if not exists banner_zone_idx        on public.banner (zone);
create index if not exists banner_active_idx      on public.banner (active);
create index if not exists banner_created_at_idx  on public.banner (created_at desc);


-- ─────────────────────────────────────────────
-- 2. ROW LEVEL SECURITY
-- ─────────────────────────────────────────────
alter table public.banner enable row level security;

drop policy if exists "banner_public_read" on public.banner;
create policy "banner_public_read"
  on public.banner for select
  using (true);

drop policy if exists "banner_anon_insert" on public.banner;
create policy "banner_anon_insert"
  on public.banner for insert
  with check (true);

drop policy if exists "banner_anon_update" on public.banner;
create policy "banner_anon_update"
  on public.banner for update
  using (true);

drop policy if exists "banner_anon_delete" on public.banner;
create policy "banner_anon_delete"
  on public.banner for delete
  using (true);


-- ─────────────────────────────────────────────
-- 3. STORAGE BUCKET
-- ─────────────────────────────────────────────
insert into storage.buckets (id, name, public)
  values ('banner-images', 'banner-images', true)
  on conflict (id) do nothing;

drop policy if exists "banner_images_public_read" on storage.objects;
create policy "banner_images_public_read"
  on storage.objects for select
  using (bucket_id = 'banner-images');

drop policy if exists "banner_images_anon_upload" on storage.objects;
create policy "banner_images_anon_upload"
  on storage.objects for insert
  with check (bucket_id = 'banner-images');

drop policy if exists "banner_images_anon_delete" on storage.objects;
create policy "banner_images_anon_delete"
  on storage.objects for delete
  using (bucket_id = 'banner-images');


-- ─────────────────────────────────────────────
-- 4. SAMPLE DATA
-- ─────────────────────────────────────────────
insert into public.banner (title, zone, image, link, start_date, end_date, active)
values
  (
    'Summer Dubai Deals — Header Banner',
    'header',
    '/banners/sample-header.jpg',
    'https://example.com/summer-deals',
    current_date,
    current_date + interval '30 days',
    true
  ),
  (
    'Atlantis The Palm — Sidebar Ad',
    'sidebar',
    '/banners/sample-sidebar.jpg',
    'https://www.atlantis.com/dubai',
    current_date,
    current_date + interval '60 days',
    true
  ),
  (
    'Desert Safari Experience — In-Content',
    'in-content',
    '/banners/sample-content.jpg',
    'https://example.com/desert-safari',
    current_date,
    current_date + interval '14 days',
    false
  )
on conflict do nothing;
