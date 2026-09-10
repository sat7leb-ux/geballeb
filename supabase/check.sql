-- Check what exists
SELECT 'cuisines' as table_name, count(*) as count FROM cuisines
UNION ALL
SELECT 'categories', count(*) FROM categories
UNION ALL
SELECT 'menu_items', count(*) FROM menu_items;
