# GEBAL — Restaurant Website & Admin Dashboard

A premium Next.js 14 (App Router) + TypeScript + Tailwind site for GEBAL, a Lebanese / Oriental / Chinese / Italian restaurant in Sidon, Lebanon. Backed by Supabase (Postgres + Auth + Storage), ready to deploy on Vercel.

## What's included

- **Public site**: cinematic homepage, menu (filter/search), dish detail pages, reservations form, gallery, about, contact
- **Admin dashboard** at `/admin`, gated by Supabase Auth: overview stats, menu CRUD, reservation status management, gallery, restaurant settings
- **Supabase schema** with Row Level Security, storage buckets, and seed data (16 sample dishes across all four cuisines)
- **SEO**: metadata, Open Graph, `robots.ts`, `sitemap.ts`, JSON-LD structured data (Restaurant schema)
- **Premium design system**: Fraunces + Inter typography, warm earth-tone palette, Framer Motion animations, full-screen mobile navigation

## Design System

### Typography
- **Display**: Fraunces (serif) — editorial headings
- **Body**: Inter (sans-serif) — UI and body text
- **Accent**: Cormorant Garamond (serif) — decorative elements

### Colors
- **Ink** `#0E0E0E` — primary dark
- **Parchment** `#F5F0E8` — light text on dark
- **Paper** `#FAF7F0` — page background
- **Saffron** `#C4944A` — primary accent
- **Clay** `#A0522D` — warm accent
- **Olive** `#5C6B4F` — natural accent
- **Stone** `#8A8578` — muted text

### Animation
- Framer Motion for page transitions and mobile menu
- CSS keyframe animations for scroll-triggered reveals
- `prefers-reduced-motion` respected throughout

## 1. Install dependencies

```bash
npm install
```

## 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Click **New project**. Pick a name (e.g. `gebal`), a strong database password, and a region close to your customers.
3. Once provisioned, go to **Project Settings → API**. You'll need:
   - **Project URL**
   - **anon public** key
   - **service_role** key (keep this secret — never expose it in frontend code)

## 3. Run the database migrations

1. In the Supabase dashboard, open **SQL Editor → New query**.
2. Paste and run, **in order**:
   - `supabase/migrations/0001_init.sql` (tables, indexes, triggers)
   - `supabase/migrations/0002_rls.sql` (Row Level Security policies)
   - `supabase/migrations/0003_storage.sql` (storage buckets + policies)
3. Then paste and run `supabase/seed.sql` to populate ~16 sample dishes across all four cuisines, categories, and gallery placeholders.

## 4. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 5. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site.

## 6. Create your first admin user

1. In Supabase, go to **Authentication → Users → Add user**.
2. Copy the new user's UUID.
3. In **SQL Editor**, run:
   ```sql
   insert into profiles (id, full_name, role)
   values ('paste-the-uuid-here', 'Your Name', 'admin');
   ```
4. Go to `http://localhost:3000/admin/login` and sign in.

## 7. Uploading images

The demo ships with gradient placeholders instead of photos. To use real photos:

1. In Supabase, go to **Storage** — you'll see the `restaurant-images`, `menu-images`, and `gallery-images` buckets.
2. Upload images there.
3. Store the returned path in `menu_item_images.storage_path` or `gallery.storage_path`, and swap `CuisineSwatch` for a Next.js `<Image>` pointed at the public URL.

## 8. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: GEBAL restaurant site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gebal.git
git push -u origin main
```

## 9. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com), sign in with GitHub, and click **Add New → Project**.
2. Import the `gebal` repo.
3. Under **Environment Variables**, add the same four variables from `.env.local`, with `NEXT_PUBLIC_SITE_URL` set to your Vercel URL.
4. Click **Deploy**.

## Day-to-day admin tasks

Once deployed, from `/admin` you can:

- **Add/edit/delete dishes** — Menu tab
- **Manage reservations** — confirm, cancel, or mark completed
- **Update restaurant info** — Settings tab (phone, address, hours)
- **Gallery** — manage restaurant photography

## Tech stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom design system
- **Animation**: Framer Motion
- **Database**: Supabase (Postgres + Auth + Storage)
- **Deployment**: Vercel
