This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


I’m not looking for a heavy back-end engineer or a big dev team — I just need a mid-level front-end or full-stack developer who’s comfortable with Next.js and Strapi.



The project is a simple MVP: a content-based Dubai experiences site with a small CMS and banner management.



It’s lightweight — around 1,500–2,000 lines of total code, including components, CMS integration, and one small API route for click tracking.



Main scope:
• Build a fast, responsive Next.js site connected to Strapi CMS
• Basic content pages (home, experiences, news, about)
• Manual banners (admin uploads image + link in CMS)
• Simple analytics for banner/affiliate clicks
• No logins, payments, or advanced logic — just clean content and speed



Goal: a clean, fast, easy-to-maintain MVP, not a complex platform.



# Dubai Experiences Info Site – Technical PRD



## 1. One-line Business Goal
Launch a content-driven Dubai experiences site with manual admin content, simple monetization, and stable CMS—optimized for clarity and maintainability.



---



## 2. Site Map



URL Pattern Type Content Summary
/ Homepage Search, experience categories (tiles), trending, latest news, banners (header/footer/sidebar), trending experiences
/experiences/[slug] Dynamic Page Experience details, images, info, affiliate links/widgets, related, banners
/news Listing AI-imported news list/grid, banners
/news/[slug] Dynamic Page Full news article, image, original source, banners
/about Static Page Site/company info, contact, banners
---



## 3. CMS Data Models (Strapi)



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



Admin uploads single image/link banner for each zone via CMS. Banners change only when admin updates them in Strapi.



---



## 5. Tracking & Analytics



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



## 6. Technology & Infrastructure



- Frontend: Next.js (use SSR and ISR as appropriate), TailwindCSS for styling
- CMS: Strapi (content-admin-only access)
- Database: PostgreSQL (managed/hosted)
- Deploy/Host: Vercel, use default settings + Cloudflare CDN
- Images: Use Next.js Image for auto-optimization, lazy-load everything except single top hero/cover per page
- SEO: Render all meta/canonical/OG tags on server
- News Import: Set up server cron (node script or Vercel scheduled function): pull 2–3 RSS tourism news items/day, create as Strapi drafts. Admin reviews in Strapi and publishes.



---



## 7. Performance & Targets



- Home and main listing pages: SSR TTFB < 600ms
- All dynamic/detail pages: LCP < 2.5s (including all banners/images/widgets)
- Lighthouse mobile > 85
- No unoptimized images, use image placeholders/loading blur
- Render SEO meta/OG tags every page



---



## 8. Dev Hand-Off Summary



- Stack: Next.js, TailwindCSS, Strapi, PostgreSQL, Vercel, Cloudflare CDN, GA4

- Content Models: Experiences, News, Banners (as detailed above)

- API Endpoints:

- Strapi REST for content

- /api/track (custom, for click/impression tracking)

- Banner Zones: header, sidebar, in-content-1, footer—place as designed above and control from CMS only

- Affiliate: Insert links/widgets directly in each experience via CMS; track clicks via server

- News Workflow: RSS → Strapi draft → manual admin publish

- Image Handling: Next.js optimized + lazy-load (except 1st hero image)

- Analytics: GA4 custom events for all described triggers

- Production Constraints:

- Do not add offline, personalization, login, or non-essential features