Main scope:
• Build a fast, responsive Next.js site connected to a custom Admin Panel (Supabase-backed)
• Basic content pages (home, experiences, news, about)
• Manual banners (admin uploads image + link in Admin Panel)
• Simple analytics for banner/affiliate clicks
• AI-powered travel news generation via OpenAI API
• No logins, payments, or advanced logic — just clean content and speed



Goal: a clean, fast, easy-to-maintain MVP, not a complex platform.



# Dubai Experiences Info Site – Technical PRD



## 1. One-line Business Goal
Launch a content-driven Dubai experiences site with manual admin content, AI-generated travel news, simple monetization, and a custom Admin Panel—optimized for clarity and maintainability.



---



## 2. Site Map



URL Pattern Type Content Summary
/ Homepage Search, experience categories (tiles), trending, latest news, banners (header/footer/sidebar), trending experiences
/experiences/[slug] Dynamic Page Experience details, images, info, affiliate links/widgets, related, banners
/news Listing AI-imported news list/grid, banners
/news/[slug] Dynamic Page Full news article, image, original source, banners
/about Static Page Site/company info, contact, banners
/admin Admin Panel Content management dashboard (Hotels, Articles, AI News Generator)
---



## 3. CMS Data Models (Custom Admin Panel — Supabase)



### Model: Experiences
- title: string
- slug: string
- category: enum (as homepage)
- images: list (URLs)
- info_json: JSON (all fields: location, hours, ticket info, contact, highlights, overview text...)
- affiliate_links: list (label + url)
- banner_zone_override: string (optional, to specify which banner appears)



### Model: News
- title: string
- body: rich text
- source: string
- image: string (URL)
- status: enum (draft/published)
- imported_at: datetime
- ai_generated: boolean (flag for AI-generated articles)
- openai_model: string (model used for generation, e.g. gpt-4o)



### Model: Banners
- zone: enum (header/sidebar/in-content-1/footer)
- image: string (URL)
- link: string (URL)
- start_date: date
- end_date: date
- active: boolean



---



## 4. Ad Zones



- Header: Full-width, above nav, all pages
- Sidebar: Vertical, visible on /, /about, /news, and on experience/news pages if screen size allows
- In-content-1: Between intro/highlights and main info on experience/news pages
- Footer: Full-width, all pages



Admin uploads single image/link banner for each zone via the Admin Panel. Banners change only when admin updates them.



---



## 5. AI-Powered Travel News Generation (OpenAI API)

A key feature of TRAVI is its AI-powered news generation system, which allows the admin to automatically create high-quality travel news articles using the OpenAI API.

### How It Works

1. **Admin triggers generation** — From `/admin/articles`, the admin clicks "Generate with AI" and enters a topic/prompt (e.g. "Top 5 things to do in Dubai this winter").
2. **API Route processes the request** — The Next.js API route `/api/generate-news` calls the OpenAI Chat Completions API (model: `gpt-4o-mini` or `gpt-4o`).
3. **Structured output returned** — The AI returns a fully structured article (title, paragraphs, subsections, quotations, tip) in JSON format.
4. **Admin reviews and saves** — The generated content is pre-filled into the article creation form. The admin can review, edit, and save it to Supabase.

### API Route: `/api/generate-news`

- **Method:** POST
- **Body:** `{ prompt: string, model?: string }`
- **Returns:** Structured article JSON compatible with the `Article` type
- **Auth:** Protected — only callable from the admin panel session
- **OpenAI Model:** `gpt-4o-mini` (default), configurable to `gpt-4o`

### Environment Variables Required

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

### OpenAI Prompt Strategy

The system prompt instructs GPT to return a JSON object with:
- `title` — compelling article headline
- `paras` — array of 5 rich paragraphs
- `subsections` — array of 2 subsections, each with heading + 5 paragraphs
- `quotation1` — full quotation with person name, role
- `quotation2` — simplified quotation with person name
- `tip` — practical traveler tip



---



## 6. Tracking & Analytics



Trigger the following events server-side (via Next.js + custom API route) and push to Google Analytics 4:



- affiliate_click: When user clicks affiliate/partner link or widget
  - Include: experience_id, link_url
- banner_click: When user clicks a banner
  - Include: zone, banner_id
- banner_impression: When banner loads in viewport
  - Include: zone, banner_id
- view_experience: On pageview for any experience
  - Include: experience_id
- view_news: On pageview for any news story
  - Include: news_id



---



## 7. Technology & Infrastructure



- Frontend: Next.js (use SSR and ISR as appropriate), TailwindCSS for styling
- Admin Panel: Custom Next.js admin routes at `/admin` (replaces Strapi CMS)
- Database: Supabase (PostgreSQL-backed, managed/hosted)
- AI Integration: OpenAI API (`gpt-4o-mini` / `gpt-4o`) for travel news generation
- Deploy/Host: Vercel, use default settings + Cloudflare CDN
- Images: Use Next.js Image for auto-optimization, lazy-load everything except single top hero/cover per page
- SEO: Render all meta/canonical/OG tags on server
- News Import: Admin can manually trigger AI generation or schedule a Vercel cron job to auto-generate 2–3 travel news items/day as drafts. Admin reviews in the Admin Panel and publishes.



---



## 8. Performance & Targets



- Home and main listing pages: SSR TTFB < 600ms
- All dynamic/detail pages: LCP < 2.5s (including all banners/images/widgets)
- Lighthouse mobile > 85
- No unoptimized images, use image placeholders/loading blur
- Render SEO meta/OG tags every page



---



## 9. Admin Panel Overview

The custom `/admin` panel replaces Strapi CMS entirely. It is a password-protected Next.js section with:

### Pages
- `/admin/login` — Admin login with password stored in environment variables
- `/admin` / `/admin/dashboard` — Overview dashboard with quick stats and AI news generation widget
- `/admin/articles` — Full CRUD for travel articles + AI generation via OpenAI
- `/admin/hotels` — Full CRUD for hotel listings with image uploads

### Features
- **Sidebar navigation** with active state highlighting
- **Authentication** via localStorage session flag (simple password-based)
- **Image uploads** to Supabase Storage buckets
- **AI News Generation Widget** — generate, preview, and publish articles with one click
- **Responsive** — works on desktop and tablet screens

### Design Language (Figma Reference)
Based on the Figma design (Travi-Homepage---Mobile-Final, node 3-5):
- **Primary color:** `#0D7FF2` (vivid blue)
- **Dark background:** `#0A1929` to `#0D2137` gradient
- **Accent:** `#F8A900` (golden yellow for AI/featured elements)
- **Typography:** Inter, Manrope, Oswald fonts
- **Card style:** White cards with `shadow-md hover:shadow-xl` transitions



---



## 10. Dev Hand-Off Summary



- Stack: Next.js, TailwindCSS, Supabase, OpenAI API, Vercel, Cloudflare CDN, GA4

- Content Models: Experiences, News (with AI flag), Banners (as detailed above)

- API Endpoints:

  - Supabase REST for content (via @supabase/supabase-js)

  - /api/generate-news (OpenAI-powered travel news generation)

  - /api/track (custom, for click/impression tracking)

- Banner Zones: header, sidebar, in-content-1, footer—place as designed above and control from Admin Panel only

- Affiliate: Insert links/widgets directly in each experience via Admin Panel; track clicks via server

- News Workflow: Admin Panel → "Generate with AI" → review draft → publish (or schedule via Vercel cron)

- Image Handling: Next.js optimized + lazy-load (except 1st hero image), stored in Supabase Storage

- Analytics: GA4 custom events for all described triggers

- Production Constraints:

  - Do not add offline, personalization, login, or non-essential features
  - OpenAI API calls must always go through server-side API routes (never expose API key to client)
  - AI-generated articles must be reviewed by admin before publishing