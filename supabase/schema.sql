-- ============================================================
-- TRAVI — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================


-- ─────────────────────────────────────────────
-- 1. EXTENSIONS
-- ─────────────────────────────────────────────
create extension if not exists "uuid-ossp";


-- ─────────────────────────────────────────────
-- 2. ARTICLE TABLE
-- ─────────────────────────────────────────────
create table if not exists public.article (
  article_id    bigserial primary key,
  title         text        not null,
  images        text[]      not null default '{}',
  published_date date        not null default current_date,
  paras         text[]      not null default '{}',
  subsections   jsonb       not null default '[]',
  quotation1    jsonb,
  quotation2    jsonb,
  tip           text        not null default '',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-update updated_at on every row update
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists article_updated_at on public.article;
create trigger article_updated_at
  before update on public.article
  for each row execute function public.set_updated_at();

-- Index for ordering by date
create index if not exists article_published_date_idx
  on public.article (published_date desc);

create index if not exists article_created_at_idx
  on public.article (created_at desc);


-- ─────────────────────────────────────────────
-- 3. HOTEL TABLE
-- ─────────────────────────────────────────────
create table if not exists public.hotel (
  hotel_id                   uuid        primary key default uuid_generate_v4(),
  created_at                 timestamptz not null default now(),
  title                      text        not null,
  tagline                    text        not null,
  about_hotel                text,
  location                   text,
  beach                      text,
  facilities                 text,
  rating                     numeric(3,1),
  rating_desc                text,
  reviews                    integer,
  price                      numeric(10,2),
  check_rates_link           text,
  view_rooms_link            text,
  rooms_link                 text,
  main_image                 text,
  about_hotel_images         text[]      not null default '{}',
  highlights                 jsonb,
  rooms                      jsonb,
  essential_information      jsonb,
  essential_information_image text,
  traveler_tips              text[],
  traveler_tips_image        text,
  hotel_cloud_image          text,
  faqs                       jsonb
);

create index if not exists hotel_created_at_idx
  on public.hotel (created_at desc);


-- ─────────────────────────────────────────────
-- 4. ROW LEVEL SECURITY
-- (Public read, authenticated write — adjust as needed)
-- ─────────────────────────────────────────────

-- Article
alter table public.article enable row level security;

drop policy if exists "article_public_read" on public.article;
create policy "article_public_read"
  on public.article for select
  using (true);

drop policy if exists "article_anon_insert" on public.article;
create policy "article_anon_insert"
  on public.article for insert
  with check (true);

drop policy if exists "article_anon_update" on public.article;
create policy "article_anon_update"
  on public.article for update
  using (true);

drop policy if exists "article_anon_delete" on public.article;
create policy "article_anon_delete"
  on public.article for delete
  using (true);

-- Hotel
alter table public.hotel enable row level security;

drop policy if exists "hotel_public_read" on public.hotel;
create policy "hotel_public_read"
  on public.hotel for select
  using (true);

drop policy if exists "hotel_anon_insert" on public.hotel;
create policy "hotel_anon_insert"
  on public.hotel for insert
  with check (true);

drop policy if exists "hotel_anon_update" on public.hotel;
create policy "hotel_anon_update"
  on public.hotel for update
  using (true);

drop policy if exists "hotel_anon_delete" on public.hotel;
create policy "hotel_anon_delete"
  on public.hotel for delete
  using (true);


-- ─────────────────────────────────────────────
-- 5. STORAGE BUCKETS
-- Run these separately if the SQL editor doesn't support storage helpers.
-- Alternatively create them in Dashboard → Storage.
-- ─────────────────────────────────────────────

insert into storage.buckets (id, name, public)
  values ('hotel-images', 'hotel-images', true)
  on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
  values ('article-images', 'article-images', true)
  on conflict (id) do nothing;

-- Storage RLS: allow public reads and anon uploads
drop policy if exists "hotel_images_public_read" on storage.objects;
create policy "hotel_images_public_read"
  on storage.objects for select
  using (bucket_id = 'hotel-images');

drop policy if exists "hotel_images_anon_upload" on storage.objects;
create policy "hotel_images_anon_upload"
  on storage.objects for insert
  with check (bucket_id = 'hotel-images');

drop policy if exists "hotel_images_anon_delete" on storage.objects;
create policy "hotel_images_anon_delete"
  on storage.objects for delete
  using (bucket_id = 'hotel-images');

drop policy if exists "article_images_public_read" on storage.objects;
create policy "article_images_public_read"
  on storage.objects for select
  using (bucket_id = 'article-images');

drop policy if exists "article_images_anon_upload" on storage.objects;
create policy "article_images_anon_upload"
  on storage.objects for insert
  with check (bucket_id = 'article-images');

drop policy if exists "article_images_anon_delete" on storage.objects;
create policy "article_images_anon_delete"
  on storage.objects for delete
  using (bucket_id = 'article-images');


-- ─────────────────────────────────────────────
-- 6. SAMPLE DATA (optional — comment out if not needed)
-- ─────────────────────────────────────────────

insert into public.article (
  title, published_date, paras, subsections, quotation1, quotation2, tip, images
) values (
  'Discover Dubai: Where Tradition Meets Tomorrow',
  '2025-10-28',
  array[
    'Dubai stands as one of the world''s most extraordinary cities, a place where gleaming skyscrapers cast shadows over ancient souks and desert sands stretch endlessly beyond the city''s glittering edge. In just a few decades, this emirate has transformed from a modest fishing village into a global destination that welcomes over 16 million visitors annually.',
    'The city''s ambition seems boundless — from the world''s tallest tower to the largest indoor ski slope, Dubai consistently redefines what is possible. Yet amid the spectacle, the warmth of Emirati hospitality and the rich tapestry of over 200 nationalities living side by side give Dubai a human dimension that surprises many first-time visitors.',
    'Whether you''re drawn by the luxury shopping, the world-class dining scene, the adventure activities, or simply the sheer spectacle of it all, Dubai delivers an experience unlike any other. Every visit reveals new layers to this remarkable city.',
    'The city''s culinary scene alone warrants a dedicated trip. From Michelin-starred restaurants helmed by celebrity chefs to humble shawarma joints packed with locals, Dubai''s food culture reflects its cosmopolitan makeup with extraordinary depth and quality.',
    'Planning your Dubai visit requires only one decision: where to begin. The city offers so much that even a week-long stay barely scratches the surface. Come with an open mind, comfortable walking shoes, and an appetite for the extraordinary.'
  ],
  '[
    {"heading": "Beaches, Desert, and Adventure", "paras": [
      "Dubai''s natural landscapes are just as spectacular as its skyscrapers. Spend a lazy afternoon at Jumeirah Beach, or head to Kite Beach for water sports and a beachfront food truck feast.",
      "For something truly unique, take a desert safari — dune bashing, camel rides, and a sunset dinner under the stars capture the magic of Arabia in one evening.",
      "The Palm Jumeirah, an artificial archipelago shaped like a palm tree, offers some of the city''s finest beach clubs and water activities, all with stunning views of the Dubai skyline.",
      "Thrill-seekers will find plenty to keep their hearts racing: skydiving over the Palm, zip-lining across the Marina, or taking a seaplane tour of the coastline from above.",
      "Even the city''s waterways offer adventure. Dubai Creek, the historic lifeline of the old city, is best explored by traditional abra — a wooden boat that has ferried passengers for centuries."
    ]},
    {"heading": "Culture and Heritage", "paras": [
      "Amid the glitz, Dubai proudly preserves its heritage. Wander through Al Fahidi Historical Neighbourhood, where narrow lanes and wind towers reveal the city''s humble beginnings.",
      "The Dubai Museum, housed in Al Fahidi Fort — the oldest surviving building in Dubai — offers a fascinating journey through the emirate''s rapid transformation from pearl-diving outpost to global metropolis.",
      "Visit the Gold Souk and Spice Souk in Deira, where the air is thick with the scent of frankincense and the glitter of thousands of pieces of jewellery on display.",
      "The Etihad Museum chronicles the formation of the United Arab Emirates with moving exhibitions that bring the story of the nation''s founding to life through personal testimonies and artefacts.",
      "Dubai''s mosques, particularly the stunning Jumeirah Mosque, open their doors to respectful visitors, offering a rare window into Islamic architecture and tradition."
    ]}
  ]'::jsonb,
  '{"quote": "Travel is the only thing you buy that makes you richer — and Dubai takes that maxim to extraordinary heights, offering experiences that redefine luxury, adventure, and cultural discovery in equal measure.", "person_name": "James Morrison", "person_role": "Senior Travel Editor", "person_image": "/images/comment-avatar.jpg"}'::jsonb,
  '{"quote": "Dubai is not just a city — it is a vision made real, proof that human ambition has no ceiling.", "person_name": "Amira Hassan"}'::jsonb,
  'Best time to visit Dubai is between November and March when the weather is pleasantly warm. Book desert safaris and popular restaurant tables in advance, dress modestly when visiting cultural sites and mosques, and always carry water when exploring outdoor attractions.',
  '{}'
)
on conflict do nothing;


-- ─────────────────────────────────────────────
-- 7. SAMPLE HOTEL INSERT
-- Copy-paste this block into Supabase SQL Editor to add a hotel
-- ─────────────────────────────────────────────

insert into public.hotel (
  title,
  tagline,
  about_hotel,
  location,
  beach,
  facilities,
  rating,
  rating_desc,
  reviews,
  price,
  check_rates_link,
  view_rooms_link,
  rooms_link,
  main_image,
  about_hotel_images,
  highlights,
  rooms,
  essential_information,
  essential_information_image,
  traveler_tips,
  traveler_tips_image,
  hotel_cloud_image,
  faqs
) values (
  'Atlantis The Palm',
  'An iconic ocean-themed resort on the world-famous Palm Jumeirah',
  'Atlantis, The Palm is a legendary five-star resort perched at the apex of Palm Jumeirah. Home to Aquaventure Waterpark, The Lost Chambers Aquarium, and 17 world-class restaurants, it offers an unrivalled entertainment experience in Dubai. With over 1,500 luxurious rooms and suites, every stay is extraordinary.',
  'Palm Jumeirah, Dubai, UAE',
  'Private beach on the Arabian Gulf with crystal-clear waters and full beach service',
  'Aquaventure Waterpark, Infinity Pool, Lost Chambers Aquarium, 17 Restaurants & Bars, Spa, Kids Club, Dive Centre, Fitness Centre, Private Beach, Water Sports',
  4.8,
  'Exceptional',
  3240,
  1200.00,
  'https://www.atlantis.com/dubai/rooms-and-suites',
  'https://www.atlantis.com/dubai/rooms-and-suites',
  'https://www.atlantis.com/dubai/rooms-and-suites',
  '/hotels/atlantis-main.jpg',
  array[
    '/hotels/atlantis-about-1.jpg',
    '/hotels/atlantis-about-2.jpg',
    '/hotels/atlantis-about-3.jpg'
  ],
  '[
    {"title": "Aquaventure Waterpark", "description": "World-class waterpark with over 105 rides, slides and attractions spanning 17 hectares"},
    {"title": "Lost Chambers Aquarium", "description": "Home to 65,000 marine animals across 20 underwater halls and tunnels"},
    {"title": "Private Beach", "description": "700 metres of pristine private beach with full service and stunning Palm views"},
    {"title": "Fine Dining", "description": "17 restaurants and bars helmed by celebrity chefs including Nobu and Bread Street Kitchen"}
  ]'::jsonb,
  '[
    {
      "name": "Coral Deluxe Room",
      "description": "Elegantly appointed room with garden or pool views, featuring signature Atlantis amenities",
      "price": 1200.00,
      "image": "/hotels/atlantis-room-coral.jpg",
      "amenities": ["King Bed", "Garden/Pool View", "40 sqm", "Free WiFi", "Minibar", "Smart TV"]
    },
    {
      "name": "Palm Deluxe Room",
      "description": "Spacious room with panoramic Palm Jumeirah and Arabian Gulf views",
      "price": 1600.00,
      "image": "/hotels/atlantis-room-palm.jpg",
      "amenities": ["King Bed", "Palm View", "48 sqm", "Free WiFi", "Butler Service", "Smart TV"]
    },
    {
      "name": "Signature Suite",
      "description": "Lavish two-bedroom suite with sweeping ocean views and private butler service",
      "price": 3500.00,
      "image": "/hotels/atlantis-room-suite.jpg",
      "amenities": ["2 Bedrooms", "Ocean View", "160 sqm", "Private Butler", "Jacuzzi", "Living Room"]
    }
  ]'::jsonb,
  '{
    "checkin": "3:00 PM",
    "checkout": "12:00 PM",
    "parking": "Complimentary valet parking",
    "pets": "Not permitted",
    "cancellation": "Free cancellation up to 48 hours before arrival",
    "children": "Children of all ages are welcome",
    "dress_code": "Smart casual in restaurants; swimwear only in pool areas"
  }'::jsonb,
  '/hotels/atlantis-essential.jpg',
  array[
    'Book Aquaventure Waterpark tickets in advance during peak season (June–August)',
    'Request a high-floor room for the best Palm Jumeirah views',
    'The monorail connects the hotel directly to the Dubai Metro in 10 minutes',
    'Nobu and Bread Street Kitchen require reservations well in advance',
    'The private beach is quieter in the early morning — perfect for a peaceful swim'
  ],
  '/hotels/atlantis-tips.jpg',
  '/hotels/atlantis-cloud.jpg',
  '[
    {"question": "Is Aquaventure Waterpark included in the room rate?", "answer": "Yes! All hotel guests receive complimentary access to Aquaventure Waterpark and The Lost Chambers Aquarium during their stay."},
    {"question": "How far is Atlantis from Dubai Airport?", "answer": "Atlantis is approximately 40 minutes from Dubai International Airport by taxi or private transfer."},
    {"question": "Is there a shuttle to the Dubai Mall?", "answer": "Yes, complimentary shuttle buses run regularly to Dubai Mall and The Palm Monorail station."},
    {"question": "What is the minimum age for the waterpark rides?", "answer": "Most rides require a minimum height of 120 cm. The children''s water play area is suitable for all ages."}
  ]'::jsonb
)
on conflict do nothing;

