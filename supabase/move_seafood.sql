-- Run this in Supabase SQL Editor
-- Step 1: Create Seafood cuisine
INSERT INTO cuisines (name, slug, sort_order) 
VALUES ('Seafood', 'seafood', 10)
ON CONFLICT (slug) DO NOTHING;

-- Step 2: Create Seafood categories
INSERT INTO categories (cuisine_id, name, sort_order)
SELECT c.id, 'Fish Dishes', 1 FROM cuisines c WHERE c.slug = 'seafood'
ON CONFLICT DO NOTHING;

INSERT INTO categories (cuisine_id, name, sort_order)
SELECT c.id, 'Shellfish', 2 FROM cuisines c WHERE c.slug = 'seafood'
ON CONFLICT DO NOTHING;

INSERT INTO categories (cuisine_id, name, sort_order)
SELECT c.id, 'Mixed Seafood', 3 FROM cuisines c WHERE c.slug = 'seafood'
ON CONFLICT DO NOTHING;

-- Step 3: Move seafood items from Lebanese to Seafood cuisine
UPDATE menu_items 
SET cuisine_id = (SELECT id FROM cuisines WHERE slug = 'seafood'),
    category_id = (SELECT id FROM categories WHERE cuisine_id = (SELECT id FROM cuisines WHERE slug = 'seafood') AND name = 'Fish Dishes')
WHERE name IN ('Sayadieh', 'Samke Harra', 'Grilled Sea Bass');

UPDATE menu_items 
SET cuisine_id = (SELECT id FROM cuisines WHERE slug = 'seafood'),
    category_id = (SELECT id FROM categories WHERE cuisine_id = (SELECT id FROM cuisines WHERE slug = 'seafood') AND name = 'Shellfish')
WHERE name IN ('Shrimp Ajestic', 'Grilled Calamari');
