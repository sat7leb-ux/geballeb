-- Row Level Security
-- Model: anyone (anon + authenticated) can READ public content.
-- Only an authenticated staff/admin (a row in `profiles`) can write.
-- Reservations and contact messages can be INSERTED by anyone (a guest
-- submitting a form) but only staff can read/update/delete them.

create or replace function is_staff() returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid()
  );
$$ language sql stable security definer;

alter table profiles enable row level security;
alter table cuisines enable row level security;
alter table categories enable row level security;
alter table menu_items enable row level security;
alter table menu_item_images enable row level security;
alter table reservations enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table gallery enable row level security;
alter table contact_messages enable row level security;
alter table restaurant_settings enable row level security;

-- profiles: a staff member can see their own row; only staff can manage profiles.
create policy "profiles: self read" on profiles for select
  using (auth.uid() = id);
create policy "profiles: staff manage" on profiles for all
  using (is_staff()) with check (is_staff());

-- Public read, staff write, for catalog content.
create policy "cuisines: public read" on cuisines for select using (true);
create policy "cuisines: staff write" on cuisines for insert with check (is_staff());
create policy "cuisines: staff update" on cuisines for update using (is_staff()) with check (is_staff());
create policy "cuisines: staff delete" on cuisines for delete using (is_staff());

create policy "categories: public read" on categories for select using (true);
create policy "categories: staff write" on categories for insert with check (is_staff());
create policy "categories: staff update" on categories for update using (is_staff()) with check (is_staff());
create policy "categories: staff delete" on categories for delete using (is_staff());

create policy "menu_items: public read available" on menu_items for select
  using (is_available = true or is_staff());
create policy "menu_items: staff write" on menu_items for insert with check (is_staff());
create policy "menu_items: staff update" on menu_items for update using (is_staff()) with check (is_staff());
create policy "menu_items: staff delete" on menu_items for delete using (is_staff());

create policy "menu_item_images: public read" on menu_item_images for select using (true);
create policy "menu_item_images: staff write" on menu_item_images for insert with check (is_staff());
create policy "menu_item_images: staff update" on menu_item_images for update using (is_staff()) with check (is_staff());
create policy "menu_item_images: staff delete" on menu_item_images for delete using (is_staff());

create policy "gallery: public read" on gallery for select using (true);
create policy "gallery: staff write" on gallery for insert with check (is_staff());
create policy "gallery: staff update" on gallery for update using (is_staff()) with check (is_staff());
create policy "gallery: staff delete" on gallery for delete using (is_staff());

create policy "settings: public read" on restaurant_settings for select using (true);
create policy "settings: staff update" on restaurant_settings for update using (is_staff()) with check (is_staff());

-- Reservations: anyone can submit; only staff can read/manage.
create policy "reservations: anyone can submit" on reservations for insert with check (true);
create policy "reservations: staff read" on reservations for select using (is_staff());
create policy "reservations: staff update" on reservations for update using (is_staff()) with check (is_staff());
create policy "reservations: staff delete" on reservations for delete using (is_staff());

-- Contact messages: same pattern as reservations.
create policy "contact_messages: anyone can submit" on contact_messages for insert with check (true);
create policy "contact_messages: staff read" on contact_messages for select using (is_staff());
create policy "contact_messages: staff update" on contact_messages for update using (is_staff()) with check (is_staff());
create policy "contact_messages: staff delete" on contact_messages for delete using (is_staff());

-- Customers/orders/order_items: written by the ordering flow (anon insert
-- allowed so a guest can place an order without an account), only staff
-- can read or manage afterwards. Tighten this if you add customer accounts.
create policy "customers: anyone can create" on customers for insert with check (true);
create policy "customers: staff read" on customers for select using (is_staff());
create policy "customers: staff update" on customers for update using (is_staff()) with check (is_staff());

create policy "orders: anyone can create" on orders for insert with check (true);
create policy "orders: staff read" on orders for select using (is_staff());
create policy "orders: staff update" on orders for update using (is_staff()) with check (is_staff());

create policy "order_items: anyone can create" on order_items for insert with check (true);
create policy "order_items: staff read" on order_items for select using (is_staff());
