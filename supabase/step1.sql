-- Run this in Supabase SQL Editor
-- Step 1: Delete all existing menu items
DELETE FROM menu_items;

-- Step 2: Insert menu items one by one
INSERT INTO menu_items (cuisine_id, category_id, name, description, price, image, is_featured) 
SELECT c.id, cat.id, 'Hummus Jebal', 'Slow-cooked chickpeas, tahini, olive oil, pine nuts.', 8.00, 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop', true 
FROM cuisines c, categories cat WHERE c.slug = 'lebanese' AND cat.name = 'Mezze' AND cat.cuisine_id = c.id LIMIT 1;
