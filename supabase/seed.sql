-- Sample data for local development. Run after 0001–0003.
-- Safe to re-run: it wipes and re-inserts catalog + gallery content.

truncate table menu_item_images, menu_items, categories, cuisines, gallery restart identity cascade;

insert into cuisines (name, slug, tagline, sort_order) values
  ('Lebanese', 'lebanese', 'The table our family built', 1),
  ('Oriental', 'oriental', 'Grills, mezze, and slow-cooked rice', 2),
  ('Chinese', 'chinese', 'Wok-fired classics, done properly', 3),
  ('Italian', 'italian', 'Pasta and pizza, no shortcuts', 4);

-- Categories
insert into categories (cuisine_id, name, sort_order)
select id, cat, 1 from cuisines, unnest(array['Mezze','Grills','Bakery']) as cat where slug = 'lebanese'
union all
select id, cat, 1 from cuisines, unnest(array['Grills','Rice & Grains','Mezze']) as cat where slug = 'oriental'
union all
select id, cat, 1 from cuisines, unnest(array['Wok','Small Plates']) as cat where slug = 'chinese'
union all
select id, cat, 1 from cuisines, unnest(array['Pizza','Pasta','Risotto','Starters']) as cat where slug = 'italian';

-- Menu items (a representative ~30; add more from the admin panel)
insert into menu_items (cuisine_id, category_id, name, description, price, ingredients, allergens, is_vegetarian, is_vegan, is_spicy, is_featured)
select c.id, cat.id, v.name, v.description, v.price, v.ingredients, v.allergens, v.veg, v.vegan, v.spicy, v.featured
from (values
  ('lebanese','Mezze','Hummus Jebal','Slow-cooked chickpeas, tahini from Baalbek, olive oil, pine nuts.',8.00,'Chickpeas, tahini, lemon, garlic, olive oil, pine nuts','Sesame',true,true,false,true),
  ('lebanese','Mezze','Fattoush','Toasted bread, sumac, and whatever''s ripest that morning.',9.00,'Romaine, radish, tomato, cucumber, sumac, fried bread','Gluten',true,true,false,false),
  ('lebanese','Mezze','Kibbeh Nayyeh','Lean cut, heavy on the mint.',14.00,'Lamb, bulgur, onion, mint, spices','None',false,false,false,true),
  ('lebanese','Grills','Mixed Grill Jebal','Kafta, shish taouk, and lamb kebab with garlic toum.',26.00,'Lamb, chicken, beef, garlic, sumac onions','None',false,false,false,true),
  ('lebanese','Bakery','Manakish Zaatar','Baked to order, thyme worked into the dough.',7.00,'Flour, zaatar, olive oil','Gluten, Sesame',true,true,false,false),
  ('oriental','Grills','Shish Taouk Plate','Yogurt-marinated chicken with garlic sauce and pickled turnip.',19.00,'Chicken, yogurt, garlic, spices','Dairy',false,false,false,false),
  ('oriental','Rice & Grains','Freekeh with Lamb','Smoked green wheat, braised lamb, toasted almonds.',21.00,'Freekeh, lamb, almonds, onion','Tree nuts',false,false,false,false),
  ('oriental','Mezze','Oriental Mezze Board','Six small plates built for sharing.',24.00,'Rotating selection','Gluten, Dairy, Sesame',true,false,true,true),
  ('chinese','Wok','Kung Pao Chicken','Roasted peanuts, dried chili, proper Sichuan heat.',18.00,'Chicken, peanuts, chili, Sichuan pepper, scallion','Peanuts, Soy',false,false,true,true),
  ('chinese','Wok','Sweet & Sour Chicken','Crisp-battered chicken, pineapple, bell pepper.',17.00,'Chicken, pineapple, bell pepper, vinegar, sugar','Gluten, Soy',false,false,false,false),
  ('chinese','Small Plates','Vegetable Dumplings','Hand-folded, pan-seared then steamed.',12.00,'Cabbage, mushroom, carrot, ginger, dough','Gluten, Soy',true,true,false,false),
  ('chinese','Wok','Chow Mein','High-heat noodles, char at the edges.',16.00,'Noodles, cabbage, carrot, soy, scallion','Gluten, Soy',true,true,false,false),
  ('italian','Pizza','Margherita Pizza','San Marzano tomato, fior di latte, basil, wood-fired.',15.00,'Dough, tomato, mozzarella, basil, olive oil','Gluten, Dairy',true,false,false,true),
  ('italian','Pasta','Tagliatelle al Ragù','Slow ragù, egg pasta rolled fresh.',20.00,'Beef, pork, tomato, egg pasta, parmesan','Gluten, Dairy, Egg',false,false,false,false),
  ('italian','Risotto','Risotto ai Funghi','Carnaroli rice, wild mushroom, aged parmesan.',19.00,'Rice, mushroom, parmesan, white wine, butter','Dairy',true,false,false,false),
  ('italian','Starters','Bruschetta Trio','Tomato-basil, mushroom, white bean.',11.00,'Bread, tomato, mushroom, white bean, basil','Gluten',true,true,false,false)
) as v(cuisine_slug, category_name, name, description, price, ingredients, allergens, veg, vegan, spicy, featured)
join cuisines c on c.slug = v.cuisine_slug
join categories cat on cat.cuisine_id = c.id and cat.name = v.category_name;

insert into gallery (storage_path, caption, category, sort_order) values
  ('gallery-images/placeholder-1.jpg', 'The dining room at dusk', 'Interior', 1),
  ('gallery-images/placeholder-2.jpg', 'Charcoal grill, mid-service', 'Kitchen', 2),
  ('gallery-images/placeholder-3.jpg', 'Mixed grill for the table', 'Food', 3),
  ('gallery-images/placeholder-4.jpg', 'Terrace seating, north side', 'Exterior', 4);

update restaurant_settings set
  name = 'Jebal',
  phone = '+961 7 123 456',
  email = 'hello@jebal-restaurant.com',
  address = 'Sea Road, Sidon, Lebanon',
  opening_hours = 'Mon–Thu 12:00–23:00, Fri–Sun 12:00–00:30'
where id = 1;
