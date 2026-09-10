-- Add image column to menu_items for direct image URLs
alter table menu_items add column if not exists image text;
