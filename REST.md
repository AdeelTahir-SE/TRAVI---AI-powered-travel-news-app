# TRAVI — Remaining Work

> Last updated: 2026-05-19  
> Status key: 🔴 Not started · 🟡 Partial · 🟢 Done

---

## 1. Admin Panel

### 1.1 Hotels
| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Consistent page header (h1 + subtitle) | 🟢 Done | Matches dashboard pattern |
| 2 | Hotel list — compact card layout with tags | 🟢 Done | Pill-tag style, matches articles page |
| 3 | Hotel form modal — consistent rounded-2xl & blur backdrop | 🟢 Done | Matches articles modal style |
| 4 | Star rating input (1–5 stars) as a visual picker | 🟢 Done | Click star = whole; click same star = half. Amber fill, hover scale, shows numeric value |
| 5 | Hotel image ordering / re-ordering UI | 🟢 Done | Thumbnail grid with ← → arrow buttons + × remove; new images append via ImageUpload below |
| 6 | Hotel delete — replace `window.confirm` with inline confirmation | 🟢 Done | Two-step inline confirm: Delete → Sure? / Yes,delete / Cancel |

### 1.2 Articles
| # | Task | Status | Notes |
|---|------|--------|-------|
| 7 | Article delete — replace `window.confirm` with inline confirmation | 🟢 Done | Same inline two-step pattern as hotels |
| 8 | Article list — show article cover image thumbnail | 🔴 Not started | Would help identify articles quickly |
| 9 | Rich text / markdown preview for paragraph fields | 🔴 Not started | Currently plain textareas |
| 10 | Draft vs Published status toggle per article | 🔴 Not started | All articles are always live |

### 1.3 AI Generator
| # | Task | Status | Notes |
|---|------|--------|-------|
| 11 | Preview article in full (all paragraphs) before saving | 🔴 Not started | Currently shows only intro + subsection list |
| 12 | Edit generated content inline before saving | 🔴 Not started | Must save as-is or regenerate |
| 13 | Cost estimate shown before generation | 🔴 Not started | GPT-4o is expensive; warn user |
| 14 | Generation history — list of previously generated articles | 🔴 Not started | No way to see what was generated before |

### 1.4 Analytics
| # | Task | Status | Notes |
|---|------|--------|-------|
| 15 | Connect GA4 Data API for live metrics | 🔴 Not started | Currently all metric cards show `—` |
| 16 | Most-viewed articles from GA4 | 🔴 Not started | Requires GA4 Data API route |
| 17 | Most-viewed hotels from GA4 | 🔴 Not started | Same as above |

### 1.5 Admin Auth
| # | Task | Status | Notes |
|---|------|--------|-------|
| 18 | Replace `localStorage` auth with Supabase Auth / JWT | 🔴 Not started | Intentionally deferred — keeping localStorage for now |
| 19 | Admin login page — improve error messaging | 🟡 Partial | Basic errors shown; no rate limiting |
| 20 | Protect API routes (`/api/generate-news`) server-side | 🔴 Not started | Currently callable by anyone who knows the endpoint |

---

## 2. Public-Facing Site

### 2.1 Home Page
| # | Task | Status | Notes |
|---|------|--------|-------|
| 21 | Hero section — real dynamic content (latest article/hotel) | 🔴 Not started | Currently static |
| 22 | "Explore Dubai" section — wire to live hotel data | 🟡 Partial | Component exists; check live data binding |
| 23 | News/Articles section — pagination or infinite scroll | 🔴 Not started | Shows all articles flat |

### 2.2 Article Detail Page
| # | Task | Status | Notes |
|---|------|--------|-------|
| 24 | SEO meta tags per article (dynamic `generateMetadata`) | 🟢 Done | Full OG + Twitter meta per article slug, canonical URL |
| 25 | Article share buttons (Twitter/X, WhatsApp, Copy Link) | 🔴 Not started | |
| 26 | Related articles section at end of article | 🟢 Done | Live Supabase data — excludes current article, shows 3 most recent |
| 27 | Estimated read time display | 🟢 Done | Word count ÷ 200 WPM, shown as pill badge next to date |

### 2.3 Hotel Detail Page
| # | Task | Status | Notes |
|---|------|--------|-------|
| 28 | Hotel detail page (`/hotels/[id]`) | 🟡 Partial | Confirm routing and full content render |
| 29 | Hotel image gallery / lightbox | 🔴 Not started | |
| 30 | Map embed (Google Maps) for hotel location | 🔴 Not started | |
| 31 | Hotel booking CTA (external link or enquiry form) | 🔴 Not started | |

### 2.4 Search
| # | Task | Status | Notes |
|---|------|--------|-------|
| 32 | Global search (hotels + articles) | 🔴 Not started | No search functionality exists |
| 33 | Filter articles by category/tag | 🔴 Not started | |
| 34 | Filter hotels by stars / price range | 🔴 Not started | |

---

## 3. Infrastructure & Performance

| # | Task | Status | Notes |
|---|------|--------|-------|
| 35 | GA4 Measurement ID in production env | 🟡 Partial | Added to codebase; needs real `G-XXXXXXXXXX` value |
| 36 | OpenAI API key server-side only (not exposed to client) | 🟢 Done | Lives in `/api/generate-news` route |
| 37 | Supabase RLS (Row Level Security) policies | 🟢 Done | SQL file at `supabase/rls_policies.sql` — run in Supabase Dashboard SQL Editor |
| 38 | Image optimisation — use Next.js `<Image>` everywhere | 🟢 Done | All `<img>` tags replaced; `next/image` import added to hotels admin; `remotePatterns` covers all hosts |
| 39 | `next.config.js` — add Supabase storage domain to `images.domains` | 🟢 Done | Upgraded to `remotePatterns` with Supabase storage pathname pattern |
| 40 | Error boundary component for graceful UI failures | 🟢 Done | `src/components/ErrorBoundary.tsx` — class component, shows recovery UI |
| 41 | Loading skeleton screens (instead of spinner-only) | 🟢 Done | `src/components/Skeletons.tsx` — `AdminPageSkeleton` used in hotels & articles |
| 42 | Sitemap (`/sitemap.xml`) for SEO | 🔴 Not started | |
| 43 | `robots.txt` | 🟢 Done | Created at `public/robots.txt` — allows public, blocks `/admin/*` |

---

## 4. Polish & UX

| # | Task | Status | Notes |
|---|------|--------|-------|
| 44 | Toast notification system (success / error) instead of `alert()` | 🟢 Done | All `alert()`/`confirm()` replaced in hotels & articles; slide-in toasts bottom-right |
| 45 | Mobile responsiveness audit — admin panel on tablet | 🟡 Partial | Sidebar collapses; forms need testing |
| 46 | Dark mode support (admin panel) | 🔴 Not started | |
| 47 | Keyboard accessibility (focus traps in modals, escape to close) | 🔴 Not started | |
| 48 | `favicon.ico` / `apple-touch-icon` | 🔴 Not started | |

---

## Priority Order (Suggested)

1. **#18** — Replace localStorage auth (security)
2. **#37** — Supabase RLS policies (security)
3. **#44** — Toast notifications (removes all `alert()` calls)
4. **#6 / #7** — Inline delete confirmation (UX)
5. **#15** — GA4 Data API for live metrics
6. **#24** — Dynamic OG meta tags per article
7. **#10** — Draft / Published toggle
8. **#32** — Global search
