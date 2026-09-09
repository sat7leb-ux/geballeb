-- Jebal Restaurant — initial schema
-- Run in the Supabase SQL editor, or via `supabase db push` with the CLI.

create extension if not exists "pgcrypto";

-- Staff/admin profiles, linked 1:1 to a Supabase Auth user.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

create table if not exists cuisines (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  tagline text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  cuisine_id uuid not null references cuisines(id) on delete cascade,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (cuisine_id, name)
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  cuisine_id uuid not null references cuisines(id) on delete restrict,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  currency text not null default 'USD',
  ingredients text,
  allergens text,
  is_vegetarian boolean not null default false,
  is_vegan boolean not null default false,
  is_spicy boolean not null default false,
  is_featured boolean not null default false,
  is_available boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists menu_item_images (
  id uuid primary key default gen_random_uuid(),
  menu_item_id uuid not null references menu_items(id) on delete cascade,
  storage_path text not null,
  is_primary boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  reservation_date date not null,
  reservation_time time not null,
  guests int not null check (guests > 0),
  occasion text,
  special_requests text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text unique,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,
  fulfillment_type text not null default 'pickup' check (fulfillment_type in ('pickup', 'delivery')),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  subtotal numeric(10,2) not null default 0,
  notes text,
  -- Payment is intentionally out of scope; these columns give a payment
  -- gateway (Stripe, etc.) somewhere to attach later without a migration.
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'paid', 'refunded')),
  payment_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  menu_item_id uuid not null references menu_items(id) on delete restrict,
  quantity int not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  notes text
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  caption text,
  category text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists restaurant_settings (
  id int primary key default 1,
  name text not null default 'Jebal',
  phone text,
  email text,
  address text,
  opening_hours text,
  instagram_url text,
  facebook_url text,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into restaurant_settings (id) values (1) on conflict (id) do nothing;

-- Indexes for the lookups the app actually does.
create index if not exists idx_menu_items_cuisine on menu_items(cuisine_id);
create index if not exists idx_menu_items_available on menu_items(is_available);
create index if not exists idx_reservations_date on reservations(reservation_date);
create index if not exists idx_reservations_status on reservations(status);
create index if not exists idx_order_items_order on order_items(order_id);

-- Keep updated_at current on edit.
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_menu_items_updated on menu_items;
create trigger trg_menu_items_updated before update on menu_items
  for each row execute function set_updated_at();

drop trigger if exists trg_reservations_updated on reservations;
create trigger trg_reservations_updated before update on reservations
  for each row execute function set_updated_at();

drop trigger if exists trg_orders_updated on orders;
create trigger trg_orders_updated before update on orders
  for each row execute function set_updated_at();

drop trigger if exists trg_settings_updated on restaurant_settings;
create trigger trg_settings_updated before update on restaurant_settings
  for each row execute function set_updated_at();
