-- ============================================================
-- TRAVI — Supabase Row Level Security Policies
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable RLS on both tables (if not already enabled)
ALTER TABLE public.article ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel   ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- ARTICLE TABLE POLICIES
-- ============================================================

-- 1. Anyone (including anonymous users) can READ articles
CREATE POLICY "articles_public_read"
ON public.article FOR SELECT TO public USING (true);

-- 2. Only authenticated Supabase users (admins) can INSERT
CREATE POLICY "articles_auth_insert"
ON public.article FOR INSERT TO authenticated WITH CHECK (true);

-- 3. Only authenticated users can UPDATE
CREATE POLICY "articles_auth_update"
ON public.article FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- 4. Only authenticated users can DELETE
CREATE POLICY "articles_auth_delete"
ON public.article FOR DELETE TO authenticated USING (true);

-- ============================================================
-- HOTEL TABLE POLICIES
-- ============================================================

-- 1. Anyone can READ hotels
CREATE POLICY "hotels_public_read"
ON public.hotel FOR SELECT TO public USING (true);

-- 2. Only authenticated users can INSERT
CREATE POLICY "hotels_auth_insert"
ON public.hotel FOR INSERT TO authenticated WITH CHECK (true);

-- 3. Only authenticated users can UPDATE
CREATE POLICY "hotels_auth_update"
ON public.hotel FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- 4. Only authenticated users can DELETE
CREATE POLICY "hotels_auth_delete"
ON public.hotel FOR DELETE TO authenticated USING (true);

-- ============================================================
-- VERIFICATION — run to confirm policies are active
-- ============================================================
-- SELECT tablename, policyname, cmd, roles
-- FROM pg_policies
-- WHERE tablename IN ('article', 'hotel')
-- ORDER BY tablename, cmd;
