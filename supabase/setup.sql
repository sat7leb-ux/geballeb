-- Drop existing tables if any (clean start)
drop table if exists categories cascade;
drop table if exists menu_items cascade;
drop table if exists cuisines cascade;
drop table if exists contact_messages cascade;

-- Create tables
create table cuisines (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  tagline text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  cuisine_id uuid not null references cuisines(id) on delete cascade,
  name text not null,
  sort_order int not null default 0,
  unique (cuisine_id, name)
);

create table menu_items (
  id uuid primary key default gen_random_uuid(),
  cuisine_id uuid not null references cuisines(id) on delete restrict,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  image text,
  is_vegetarian boolean not null default false,
  is_vegan boolean not null default false,
  is_spicy boolean not null default false,
  is_featured boolean not null default false,
  is_available boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  source text default 'contact_form',
  created_at timestamptz not null default now()
);

-- Insert cuisines
insert into cuisines (name, slug, tagline, sort_order) values
  ('Lebanese', 'lebanese', 'The table our family built', 1),
  ('Oriental', 'oriental', 'Grills, mezze, and slow-cooked rice', 2),
  ('Chinese', 'chinese', 'Wok-fired classics, done properly', 3),
  ('Italian', 'italian', 'Pasta and pizza, no shortcuts', 4),
  ('Sandwiches', 'sandwiches', 'Wraps, rolls, and handheld feasts', 5),
  ('Drinks', 'drinks', 'Refreshment for every mood', 6),
  ('Alcoholic Beverages', 'alcoholic-beverages', 'Wine, arak, and crafted cocktails', 7),
  ('Chicha', 'chicha', 'Hookah and shisha flavors', 8),
  ('Desserts', 'desserts', 'Sweet endings from four kitchens', 9);

-- Insert categories
insert into categories (cuisine_id, name)
select c.id, 'Mezze' from cuisines c where c.slug = 'lebanese'
union all select c.id, 'Grills' from cuisines c where c.slug = 'lebanese'
union all select c.id, 'Bakery' from cuisines c where c.slug = 'lebanese'
union all select c.id, 'Salads' from cuisines c where c.slug = 'lebanese'
union all select c.id, 'Soups' from cuisines c where c.slug = 'lebanese'
union all select c.id, 'Grills' from cuisines c where c.slug = 'oriental'
union all select c.id, 'Rice & Grains' from cuisines c where c.slug = 'oriental'
union all select c.id, 'Mezze' from cuisines c where c.slug = 'oriental'
union all select c.id, 'Salads' from cuisines c where c.slug = 'oriental'
union all select c.id, 'Soups' from cuisines c where c.slug = 'oriental'
union all select c.id, 'Wok' from cuisines c where c.slug = 'chinese'
union all select c.id, 'Small Plates' from cuisines c where c.slug = 'chinese'
union all select c.id, 'Dim Sum' from cuisines c where c.slug = 'chinese'
union all select c.id, 'Soups' from cuisines c where c.slug = 'chinese'
union all select c.id, 'Rice & Noodles' from cuisines c where c.slug = 'chinese'
union all select c.id, 'Pizza' from cuisines c where c.slug = 'italian'
union all select c.id, 'Pasta' from cuisines c where c.slug = 'italian'
union all select c.id, 'Risotto' from cuisines c where c.slug = 'italian'
union all select c.id, 'Starters' from cuisines c where c.slug = 'italian'
union all select c.id, 'Salads' from cuisines c where c.slug = 'italian'
union all select c.id, 'Lebanese Wraps' from cuisines c where c.slug = 'sandwiches'
union all select c.id, 'Oriental Wraps' from cuisines c where c.slug = 'sandwiches'
union all select c.id, 'Chinese Wraps' from cuisines c where c.slug = 'sandwiches'
union all select c.id, 'Italian Panini' from cuisines c where c.slug = 'sandwiches'
union all select c.id, 'Fresh Juices' from cuisines c where c.slug = 'drinks'
union all select c.id, 'Smoothies' from cuisines c where c.slug = 'drinks'
union all select c.id, 'Hot Beverages' from cuisines c where c.slug = 'drinks'
union all select c.id, 'Cold Beverages' from cuisines c where c.slug = 'drinks'
union all select c.id, 'Traditional Drinks' from cuisines c where c.slug = 'drinks'
union all select c.id, 'Milkshakes' from cuisines c where c.slug = 'drinks'
union all select c.id, 'Lebanese Wines' from cuisines c where c.slug = 'alcoholic-beverages'
union all select c.id, 'Arak' from cuisines c where c.slug = 'alcoholic-beverages'
union all select c.id, 'Cocktails' from cuisines c where c.slug = 'alcoholic-beverages'
union all select c.id, 'Beer' from cuisines c where c.slug = 'alcoholic-beverages'
union all select c.id, 'Spirits' from cuisines c where c.slug = 'alcoholic-beverages'
union all select c.id, 'Fruit Flavors' from cuisines c where c.slug = 'chicha'
union all select c.id, 'Mint & Sweet' from cuisines c where c.slug = 'chicha'
union all select c.id, 'Berry & Citrus' from cuisines c where c.slug = 'chicha'
union all select c.id, 'Classic' from cuisines c where c.slug = 'chicha'
union all select c.id, 'Premium' from cuisines c where c.slug = 'chicha'
union all select c.id, 'Exotic' from cuisines c where c.slug = 'chicha'
union all select c.id, 'Lebanese Sweets' from cuisines c where c.slug = 'desserts'
union all select c.id, 'Oriental Sweets' from cuisines c where c.slug = 'desserts'
union all select c.id, 'Chinese Sweets' from cuisines c where c.slug = 'desserts'
union all select c.id, 'Italian Sweets' from cuisines c where c.slug = 'desserts'
union all select c.id, 'Ice Cream' from cuisines c where c.slug = 'desserts'
union all select c.id, 'Pastries' from cuisines c where c.slug = 'desserts';

-- Insert sample menu items
insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured, is_vegetarian, is_vegan)
select c.id, cat.id, 'Hummus Jebal', 'Slow-cooked chickpeas, tahini from Baalbek, olive oil, pine nuts. Served with warm pita.', 8.00, 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop', true, true, true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Tabbouleh', 'Finely chopped parsley, mint, tomato, bulgur, lemon juice, olive oil.', 9.00, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop', false
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Mixed Grill Jebal', 'Kafta, shish taouk, and lamb kebab with garlic toum.', 26.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Grills' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Margherita Pizza', 'San Marzano tomato, fior di latte, basil, wood-fired.', 15.00, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'italian' and cat.name = 'Pizza' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Spaghetti Carbonara', 'Guanciale, egg, pecorino, black pepper. Roman perfection.', 19.00, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'italian' and cat.name = 'Pasta' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Kung Pao Chicken', 'Roasted peanuts, dried chili, proper Sichuan heat.', 18.00, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'chinese' and cat.name = 'Wok' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Baklava', 'Layered phyllo, walnuts, rose water syrup. Flaky and decadent.', 8.00, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Lebanese Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Tiramisu', 'Espresso, mascarpone, cocoa. Classic Italian indulgence.', 9.00, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Italian Sweets' and cat.cuisine_id = c.id limit 1;

-- Enable RLS
alter table cuisines enable row level security;
alter table categories enable row level security;
alter table menu_items enable row level security;
alter table contact_messages enable row level security;

-- Public read access
create policy "Public read cuisines" on cuisines for select using (true);
create policy "Public read categories" on categories for select using (true);
create policy "Public read menu_items" on menu_items for select using (true);

-- Allow public insert for contact messages
create policy "Anyone can create contact_messages" on contact_messages for insert with check (true);
