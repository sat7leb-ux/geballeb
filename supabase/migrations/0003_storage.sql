-- Storage buckets for restaurant, menu, and gallery images.
-- Buckets are public-read (so <Image> tags work without signed URLs) but
-- only staff can upload/replace/delete.

insert into storage.buckets (id, name, public)
values
  ('restaurant-images', 'restaurant-images', true),
  ('menu-images', 'menu-images', true),
  ('gallery-images', 'gallery-images', true)
on conflict (id) do nothing;

create policy "public read restaurant-images" on storage.objects for select
  using (bucket_id = 'restaurant-images');
create policy "public read menu-images" on storage.objects for select
  using (bucket_id = 'menu-images');
create policy "public read gallery-images" on storage.objects for select
  using (bucket_id = 'gallery-images');

create policy "staff write restaurant-images" on storage.objects for insert
  with check (bucket_id = 'restaurant-images' and is_staff());
create policy "staff write menu-images" on storage.objects for insert
  with check (bucket_id = 'menu-images' and is_staff());
create policy "staff write gallery-images" on storage.objects for insert
  with check (bucket_id = 'gallery-images' and is_staff());

create policy "staff update own uploads" on storage.objects for update
  using (is_staff()) with check (is_staff());
create policy "staff delete uploads" on storage.objects for delete
  using (is_staff());
