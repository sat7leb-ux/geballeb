-- Add all menu items to the database
-- Lebanese
insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan, is_featured)
select c.id, cat.id, 'Hummus Jebal', 'Slow-cooked chickpeas, tahini from Baalbek, olive oil, pine nuts. Served with warm pita.', 8.00, 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop', true, true, true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Tabbouleh', 'Finely chopped parsley, mint, tomato, bulgur, lemon juice, olive oil. Fresh and aromatic.', 9.00, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Baba Ghanoush', 'Smoky roasted eggplant blended with tahini, lemon, and garlic. A mezze essential.', 8.50, 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Fattoush', 'Toasted pita, mixed greens, tomato, cucumber, radish, sumac dressing. Crisp and refreshing.', 9.50, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Moutabal', 'Smoky eggplant dip with tahini, lemon, and garlic.', 8.00, 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Warak Enab', 'Stuffed grape leaves with rice, herbs, and tomatoes.', 10.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Labneh', 'Strained yogurt, olive oil, zaatar. Served with pita bread.', 7.00, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_spicy)
select c.id, cat.id, 'Muhammara', 'Roasted red pepper, walnuts, breadcrumbs, chili. Sweet and spicy dip.', 9.00, 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Mixed Grill Jebal', 'Kafta, shish taouk, and lamb kebab with garlic toum and pickled turnip.', 26.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Grills' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Shish Taouk', 'Yogurt-marinated chicken skewers, grilled over charcoal.', 19.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Grills' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Kafta Kebab', 'Ground lamb with parsley, onion, and spices. Grilled to perfection.', 18.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Grills' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Lamb Chops', 'Marinated lamb chops, grilled over charcoal.', 24.00, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Grills' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Manakish Zaatar', 'Baked to order, thyme worked into the dough.', 7.00, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Bakery' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Cheese Manakish', 'Akkar cheese, sesame, baked until golden.', 8.50, 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Bakery' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Meat Manakish', 'Spiced ground lamb, tomato, onion. Saj-baked.', 9.00, 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Bakery' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Lentil Soup', 'Red lentils, onion, cumin, lemon. Hearty and warming.', 6.00, 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'lebanese' and cat.name = 'Soups' and cat.cuisine_id = c.id limit 1;

-- Oriental
insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Lamb Kabsa', 'Fragrant rice with tender lamb, raisins, almonds, and aromatic spices.', 22.00, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'oriental' and cat.name = 'Grills' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Chicken Mandi', 'Slow-cooked chicken with spiced rice, caramelized onions.', 20.00, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'oriental' and cat.name = 'Grills' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Mixed Oriental Grill', 'Kafta, shish taouk, lamb chops, and chicken breast.', 28.00, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'oriental' and cat.name = 'Grills' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Mujadara', 'Lentils, rice, and caramelized onions. Humble and hearty.', 14.00, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'oriental' and cat.name = 'Rice & Grains' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_spicy, is_featured)
select c.id, cat.id, 'Oriental Mezze Board', 'Six small plates for sharing. Hummus, baba ghanoush, tabbouleh.', 24.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', true, true, true
from cuisines c, categories cat where c.slug = 'oriental' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Stuffed Grape Leaves', 'Vine leaves with rice, herbs, tomatoes. Slow-cooked.', 12.00, 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'oriental' and cat.name = 'Mezze' and cat.cuisine_id = c.id limit 1;

-- Chinese
insert into menu_items (cuisine_id, category_id, name, description, price, image, is_spicy, is_featured)
select c.id, cat.id, 'Kung Pao Chicken', 'Roasted peanuts, dried chili, proper Sichuan heat.', 18.00, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'chinese' and cat.name = 'Wok' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_spicy)
select c.id, cat.id, 'Mapo Tofu', 'Silky tofu, minced pork, fermented beans, Sichuan pepper.', 16.00, 'https://images.unsplash.com/photo-1582452919280-85adbc856546?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'chinese' and cat.name = 'Wok' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Sweet & Sour Chicken', 'Crisp-battered chicken, pineapple, bell pepper.', 17.00, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit-crop'
from cuisines c, categories cat where c.slug = 'chinese' and cat.name = 'Wok' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Beef Chow Mein', 'High-heat noodles, char at the edges.', 17.00, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'chinese' and cat.name = 'Wok' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Vegetable Dumplings', 'Hand-folded, pan-seared then steamed.', 12.00, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'chinese' and cat.name = 'Small Plates' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Spring Rolls', 'Crisp pastry with vegetables and glass noodles.', 10.00, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'chinese' and cat.name = 'Small Plates' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Xiaolongbao', 'Soup dumplings with pork and rich broth.', 14.00, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'chinese' and cat.name = 'Dim Sum' and cat.cuisine_id = c.id limit 1;

-- Italian
insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_featured)
select c.id, cat.id, 'Margherita Pizza', 'San Marzano tomato, fior di latte, basil, wood-fired.', 15.00, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'italian' and cat.name = 'Pizza' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Pizza Quattro Formaggi', 'Mozzarella, gorgonzola, parmesan, fontina.', 17.00, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'italian' and cat.name = 'Pizza' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_spicy)
select c.id, cat.id, 'Diavola Pizza', 'Spicy salami, tomato, mozzarella, chili flakes.', 16.00, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'italian' and cat.name = 'Pizza' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Spaghetti Carbonara', 'Guanciale, egg, pecorino, black pepper.', 19.00, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'italian' and cat.name = 'Pasta' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Pesto Genovese', 'Basil pesto, pine nuts, parmesan, trofie pasta.', 18.00, 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'italian' and cat.name = 'Pasta' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Risotto ai Funghi', 'Carnaroli rice, wild mushroom, aged parmesan.', 19.00, 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'italian' and cat.name = 'Risotto' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Bruschetta Trio', 'Tomato-basil, mushroom, white bean.', 11.00, 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'italian' and cat.name = 'Starters' and cat.cuisine_id = c.id limit 1;

-- Sandwiches
insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Shawarma Chicken Wrap', 'Marinated chicken, garlic toum, pickles, lettuce.', 10.00, 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'sandwiches' and cat.name = 'Lebanese Wraps' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Shawarma Beef Wrap', 'Thinly sliced beef, tahini sauce, tomato, onion.', 11.00, 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit-crop'
from cuisines c, categories cat where c.slug = 'sandwiches' and cat.name = 'Lebanese Wraps' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Falafel Sandwich', 'Crispy falafel, tahini, tomato, lettuce, pickled turnip.', 9.00, 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'sandwiches' and cat.name = 'Lebanese Wraps' and cat.cuisine_id = c.id limit 1;

-- Drinks
insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Orange Juice', 'Freshly squeezed Valencia oranges.', 5.00, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'drinks' and cat.name = 'Fresh Juices' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Pomegranate Juice', 'Sweet pomegranate, a Lebanese favorite.', 6.00, 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'drinks' and cat.name = 'Fresh Juices' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Mango Juice', 'Alphonso mango, creamy and tropical.', 6.00, 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'drinks' and cat.name = 'Fresh Juices' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Lemonade', 'Fresh lemon, mint, sugar. Classic refreshment.', 4.00, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'drinks' and cat.name = 'Fresh Juices' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Turkish Coffee', 'Finely ground coffee, cardamom.', 4.00, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'drinks' and cat.name = 'Hot Beverages' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Sahlab', 'Warm milk, orchid powder, cinnamon, nuts.', 5.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'drinks' and cat.name = 'Hot Beverages' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Jallab', 'Molasses, rose water, pine nuts, raisins.', 5.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'drinks' and cat.name = 'Traditional Drinks' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Chocolate Milkshake', 'Chocolate ice cream, milk, whipped cream.', 7.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'drinks' and cat.name = 'Milkshakes' and cat.cuisine_id = c.id limit 1;

-- Alcoholic Beverages
insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Château Musar Red', 'Iconic Lebanese red, Bordeaux-style blend.', 65.00, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'alcoholic-beverages' and cat.name = 'Lebanese Wines' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Arak Touma', 'Triple-distilled, anise-flavored Lebanese spirit.', 30.00, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'alcoholic-beverages' and cat.name = 'Arak' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Negroni', 'Gin, campari, vermouth.', 14.00, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'alcoholic-beverages' and cat.name = 'Cocktails' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Almaza Pilsner', 'Lebanese classic, crisp and refreshing.', 6.00, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'alcoholic-beverages' and cat.name = 'Beer' and cat.cuisine_id = c.id limit 1;

-- Chicha
insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Al Fakher Double Apple', 'Classic anise and apple, sweet and aromatic.', 15.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'chicha' and cat.name = 'Fruit Flavors' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Al Fakher Grape', 'Sweet Concord grape with mint undertones.', 15.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'chicha' and cat.name = 'Fruit Flavors' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Al Fakher Mango', 'Tropical mango, rich and fruity.', 15.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'chicha' and cat.name = 'Fruit Flavors' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Al Fakher Mint', 'Cool mint, refreshing classic.', 15.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'chicha' and cat.name = 'Mint & Sweet' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Starbuzz Blue Mist', 'Blueberry and mint, the flagship flavor.', 18.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'chicha' and cat.name = 'Mint & Sweet' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Al Fakher Cherry', 'Sweet cherry, rich and bold.', 15.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'chicha' and cat.name = 'Berry & Citrus' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Tangiers Noir Cane Mint', 'Intense mint, long-lasting.', 22.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
from cuisines c, categories cat where c.slug = 'chicha' and cat.name = 'Premium' and cat.cuisine_id = c.id limit 1;

-- Desserts
insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_featured)
select c.id, cat.id, 'Baklava', 'Layered phyllo, walnuts, rose water syrup. Flaky and decadent.', 8.00, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop', true, true
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Lebanese Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Knafeh', 'Crispy semolina, sweet cheese, orange blossom syrup.', 9.00, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Lebanese Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Maamoul', 'Date-filled semolina cookies, aromatic and buttery.', 7.00, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Lebanese Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Atayef', 'Stuffed pancakes with cream or nuts, fried and sweet.', 8.00, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit-crop'
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Lebanese Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Muhallabia', 'Rose-scented milk pudding, elegant and silky.', 6.00, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop', true
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Lebanese Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Basbousa', 'Semolina cake, almond, coconut, syrup. Moist and sweet.', 6.00, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit-crop', true
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Oriental Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan)
select c.id, cat.id, 'Red Bean Soup', 'Sweet red bean, tangyuan in syrup.', 6.00, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit-crop', true, true
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Chinese Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_featured)
select c.id, cat.id, 'Tiramisu', 'Espresso, mascarpone, cocoa. Classic Italian indulgence.', 9.00, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit-crop', true
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Italian Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Panna Cotta', 'Vanilla cream, berry compote. Silky and elegant.', 8.00, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit-crop'
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Italian Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Cannoli', 'Crisp shells, sweet ricotta, chocolate chips.', 8.00, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit-crop'
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Italian Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Gelato Trio', 'Three scoops: chocolate, pistachio, strawberry.', 7.00, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit-crop'
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Italian Sweets' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image, is_vegetarian)
select c.id, cat.id, 'Croissant', 'Buttery, flaky, French classic.', 4.00, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit-crop', true
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Pastries' and cat.cuisine_id = c.id limit 1;

insert into menu_items (cuisine_id, category_id, name, description, price, image)
select c.id, cat.id, 'Cheesecake', 'New York style, creamy and rich. Berry compote.', 8.00, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit-crop'
from cuisines c, categories cat where c.slug = 'desserts' and cat.name = 'Pastries' and cat.cuisine_id = c.id limit 1;
