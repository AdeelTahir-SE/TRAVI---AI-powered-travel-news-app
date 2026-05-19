-- =============================================================================
-- TRAVI Admin Authentication System
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- =============================================================================

-- 1. Create admin_users table
-- This stores admin profile + approval status alongside Supabase auth.users
CREATE TABLE IF NOT EXISTS public.admin_users (
    id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email         text NOT NULL UNIQUE,
    full_name     text,
    status        text NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'verified', 'rejected')),
    role          text NOT NULL DEFAULT 'admin'
                  CHECK (role IN ('admin', 'super_admin')),
    created_at    timestamptz NOT NULL DEFAULT now(),
    updated_at    timestamptz NOT NULL DEFAULT now(),
    verified_at   timestamptz,
    verified_by   uuid REFERENCES public.admin_users(id)
);

-- 2. Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies (drop first so this file is safe to re-run)
DROP POLICY IF EXISTS "admin_users: self read"          ON public.admin_users;
DROP POLICY IF EXISTS "admin_users: super_admin read all" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users: super_admin update" ON public.admin_users;

-- Authenticated user can read their own row
CREATE POLICY "admin_users: self read"
    ON public.admin_users
    FOR SELECT
    USING (auth.uid() = id);

-- Super admins can read all rows
CREATE POLICY "admin_users: super_admin read all"
    ON public.admin_users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'super_admin' AND status = 'verified'
        )
    );

-- Super admins can update status/role of any row
CREATE POLICY "admin_users: super_admin update"
    ON public.admin_users
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'super_admin' AND status = 'verified'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'super_admin' AND status = 'verified'
        )
    );

-- 4. Auto-insert into admin_users on Supabase email confirmation
-- This trigger fires when a user confirms their email (email_confirmed_at is set)
CREATE OR REPLACE FUNCTION public.handle_admin_email_confirmed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Only act when email_confirmed_at goes from NULL → non-NULL
    IF OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL THEN
        INSERT INTO public.admin_users (id, email, full_name, status, role)
        VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
            'pending',
            'admin'
        )
        ON CONFLICT (id) DO NOTHING;  -- safe to call multiple times
    END IF;
    RETURN NEW;
END;
$$;

-- Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_admin_email_confirmed ON auth.users;
CREATE TRIGGER on_admin_email_confirmed
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_admin_email_confirmed();

-- 5. updated_at auto-maintenance
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS admin_users_set_updated_at ON public.admin_users;
CREATE TRIGGER admin_users_set_updated_at
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- 6. Verify/reject helpers (call from super-admin UI)
CREATE OR REPLACE FUNCTION public.verify_admin(target_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Only super admins can call this
    IF NOT EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid() AND role = 'super_admin' AND status = 'verified'
    ) THEN
        RAISE EXCEPTION 'Unauthorized: super_admin required';
    END IF;

    UPDATE public.admin_users
    SET status = 'verified', verified_at = now(), verified_by = auth.uid()
    WHERE id = target_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.reject_admin(target_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid() AND role = 'super_admin' AND status = 'verified'
    ) THEN
        RAISE EXCEPTION 'Unauthorized: super_admin required';
    END IF;

    UPDATE public.admin_users
    SET status = 'rejected'
    WHERE id = target_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.promote_admin(target_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid() AND role = 'super_admin' AND status = 'verified'
    ) THEN
        RAISE EXCEPTION 'Unauthorized: super_admin required';
    END IF;

    -- Cannot promote yourself (already super_admin) or a rejected user
    IF (SELECT status FROM public.admin_users WHERE id = target_id) != 'verified' THEN
        RAISE EXCEPTION 'User must be verified before being promoted';
    END IF;

    UPDATE public.admin_users
    SET role = 'super_admin'
    WHERE id = target_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.demote_admin(target_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid() AND role = 'super_admin' AND status = 'verified'
    ) THEN
        RAISE EXCEPTION 'Unauthorized: super_admin required';
    END IF;

    -- Cannot demote yourself
    IF target_id = auth.uid() THEN
        RAISE EXCEPTION 'Cannot demote yourself';
    END IF;

    UPDATE public.admin_users
    SET role = 'admin'
    WHERE id = target_id;
END;
$$;

-- =============================================================================
-- MANUAL STEP: Bootstrap your first super_admin
-- After registering your account and confirming your email, run once:
--
--   UPDATE public.admin_users
--   SET status = 'verified', role = 'super_admin'
--   WHERE email = 'your@email.com';
--
-- After that ALL status/role changes are done from /admin/users in the dashboard.
-- Available RPC functions (call via supabase.rpc()):
--   verify_admin(target_id)   → set status = 'verified'
--   reject_admin(target_id)   → set status = 'rejected'
--   promote_admin(target_id)  → set role   = 'super_admin'  (target must be verified)
--   demote_admin(target_id)   → set role   = 'admin'        (cannot demote yourself)
-- =============================================================================
