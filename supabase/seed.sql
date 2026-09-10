-- Sample data for local development. Run after 0001–0003.
-- Safe to re-run: it wipes and re-inserts catalog + gallery content.

truncate table menu_item_images, menu_items, categories, cuisines, gallery restart identity cascade;

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

-- Categories
insert into categories (cuisine_id, name, sort_order)
select id, cat, 1 from cuisines, unnest(array['Mezze','Grills','Bakery','Salads','Soups']) as cat where slug = 'lebanese'
union all
select id, cat, 1 from cuisines, unnest(array['Grills','Rice & Grains','Mezze','Salads','Soups']) as cat where slug = 'oriental'
union all
select id, cat, 1 from cuisines, unnest(array['Wok','Small Plates','Dim Sum','Soups','Rice & Noodles']) as cat where slug = 'chinese'
union all
select id, cat, 1 from cuisines, unnest(array['Pizza','Pasta','Risotto','Starters','Salads']) as cat where slug = 'italian'
union all
select id, cat, 1 from cuisines, unnest(array['Lebanese Wraps','Oriental Wraps','Chinese Wraps','Italian Panini']) as cat where slug = 'sandwiches'
union all
select id, cat, 1 from cuisines, unnest(array['Fresh Juices','Smoothies','Hot Beverages','Cold Beverages','Traditional Drinks','Milkshakes']) as cat where slug = 'drinks'
union all
select id, cat, 1 from cuisines, unnest(array['Lebanese Wines','Arak','Cocktails','Beer','Spirits']) as cat where slug = 'alcoholic-beverages'
union all
select id, cat, 1 from cuisines, unnest(array['Fruit Flavors','Mint & Sweet','Berry & Citrus','Classic','Premium','Exotic']) as cat where slug = 'chicha'
union all
select id, cat, 1 from cuisines, unnest(array['Lebanese Sweets','Oriental Sweets','Chinese Sweets','Italian Sweets','Ice Cream','Pastries']) as cat where slug = 'desserts';

-- Menu items (expanded with famous dishes)
insert into menu_items (cuisine_id, category_id, name, description, price, ingredients, allergens, is_vegetarian, is_vegan, is_spicy, is_featured)
select c.id, cat.id, v.name, v.description, v.price, v.ingredients, v.allergens, v.veg, v.vegan, v.spicy, v.featured
from (values
  -- ========== LEBANESE ==========
  ('lebanese','Mezze','Hummus Jebal','Slow-cooked chickpeas, tahini from Baalbek, olive oil, pine nuts. Served with warm pita.',8.00,'Chickpeas, tahini, lemon, garlic, olive oil, pine nuts','Sesame',true,true,false,true),
  ('lebanese','Mezze','Tabbouleh','Finely chopped parsley, mint, tomato, bulgur, lemon juice, olive oil. Fresh and aromatic.',9.00,'Parsley, mint, tomato, bulgur, lemon, olive oil','Gluten',true,true,false,false),
  ('lebanese','Mezze','Baba Ghanoush','Smoky roasted eggplant blended with tahini, lemon, and garlic. A mezze essential.',8.50,'Eggplant, tahini, lemon, garlic, olive oil','Sesame',true,true,false,false),
  ('lebanese','Mezze','Fattoush','Toasted pita, mixed greens, tomato, cucumber, radish, sumac dressing. Crisp and refreshing.',9.50,'Pita, romaine, tomato, cucumber, radish, sumac','Gluten',true,true,false,false),
  ('lebanese','Mezze','Moutabal','Smoky eggplant dip with tahini, lemon, and garlic. Simpler than baba ghanoush.',8.00,'Eggplant, tahini, lemon, garlic','Sesame',true,true,false,false),
  ('lebanese','Mezze','Warak Enab','Stuffed grape leaves with rice, herbs, and tomatoes. Slow-cooked in lemon and olive oil.',10.00,'Grape leaves, rice, herbs, tomato, lemon','None',true,true,false,false),
  ('lebanese','Mezze','Labneh','Strained yogurt, olive oil, zaatar. Served with pita bread.',7.00,'Yogurt, olive oil, zaatar','Dairy, Sesame',true,false,false,false),
  ('lebanese','Mezze','Muhammara','Roasted red pepper, walnuts, breadcrumbs, chili. Sweet and spicy dip.',9.00,'Red pepper, walnuts, breadcrumbs, chili','Gluten, Tree nuts',true,false,true,false),
  ('lebanese','Grills','Mixed Grill Jebal','Kafta, shish taouk, and lamb kebab with garlic toum and pickled turnip.',26.00,'Lamb, chicken, beef, garlic, sumac onions','None',false,false,false,true),
  ('lebanese','Grills','Shish Taouk','Yogurt-marinated chicken skewers, grilled over charcoal. Served with garlic sauce.',19.00,'Chicken, yogurt, garlic, lemon, spices','Dairy',false,false,false,false),
  ('lebanese','Grills','Kafta Kebab','Ground lamb with parsley, onion, and spices. Grilled to perfection.',18.00,'Lamb, parsley, onion, spices','None',false,false,false,false),
  ('lebanese','Grills','Lamb Chops','Marinated lamb chills, grilled over charcoal. Served with roasted vegetables.',24.00,'Lamb, rosemary, garlic, olive oil','None',false,false,false,false),
  ('lebanese','Grills','Chicken Shawarma Plate','Marinated chicken, garlic sauce, rice, and salad.',18.00,'Chicken, rice, garlic, salad','None',false,false,false,false),
  ('lebanese','Bakery','Manakish Zaatar','Baked to order, thyme worked into the dough. The Lebanese breakfast.',7.00,'Flour, zaatar, olive oil','Gluten, Sesame',true,true,false,false),
  ('lebanese','Bakery','Cheese Manakish','Akkar cheese, sesame, baked until golden and bubbly.',8.50,'Flour, cheese, sesame','Gluten, Dairy, Sesame',true,false,false,false),
  ('lebanese','Bakery','Meat Manakish','Spiced ground lamb, tomato, onion. Saj-baked.',9.00,'Lamb, flour, tomato, onion','Gluten',false,false,false,false),
  ('lebanese','Bakery','Spinach Fatayer','Triangular pastries filled with spinach, onion, and sumac.',8.00,'Flour, spinach, onion, sumac','Gluten',true,true,false,false),
  ('lebanese','Salads','Shepherd Salad','Diced tomato, cucumber, onion, parsley, lemon, olive oil.',7.00,'Tomato, cucumber, onion, parsley, lemon','None',true,true,false,false),
  ('lebanese','Salads','Rocket Salad','Arugula, pomegranate, walnuts, balsamic.',9.00,'Arugula, pomegranate, walnuts, balsamic','Tree nuts',true,false,false,false),
  ('lebanese','Soups','Lentil Soup','Red lentils, onion, cumin, lemon. Hearty and warming.',6.00,'Lentils, onion, cumin, lemon','None',true,true,false,false),
  ('lebanese','Soups','Chicken Soup','Free-range chicken, rice, celery, lemon. Comfort in a bowl.',8.00,'Chicken, rice, celery, lemon','None',false,false,false,false),

  -- ========== ORIENTAL ==========
  ('oriental','Grills','Lamb Kabsa','Fragrant rice with tender lamb, raisins, almonds, and aromatic spices.',22.00,'Lamb, rice, raisins, almonds, spices','Tree nuts',false,false,false,true),
  ('oriental','Grills','Chicken Mandi','Slow-cooked chicken with spiced rice, caramelized onions, and toasted nuts.',20.00,'Chicken, rice, onions, nuts, spices','Tree nuts',false,false,false,false),
  ('oriental','Grills','Mixed Oriental Grill','Kafta, shish taouk, lamb chops, and chicken breast. A feast for the table.',28.00,'Lamb, chicken, beef, spices','None',false,false,false,true),
  ('oriental','Grills','Lamb Chops','Grilled lamb chills with rosemary and garlic. Served with rice.',26.00,'Lamb, rosemary, garlic, rice','None',false,false,false,false),
  ('oriental','Grills','Chicken Kabsa','Fragrant rice with spiced chicken, raisins, and almonds.',20.00,'Chicken, rice, raisins, almonds, spices','Tree nuts',false,false,false,false),
  ('oriental','Rice & Grains','Freekeh with Lamb','Smoked green wheat, braised lamb, toasted almonds, and pine nuts.',21.00,'Freekeh, lamb, almonds, pine nuts','Tree nuts',false,false,false,false),
  ('oriental','Rice & Grains','Mujadara','Lentils, rice, and caramelized onions. Humble, hearty, and deeply satisfying.',14.00,'Lentils, rice, onions','None',true,true,false,false),
  ('oriental','Rice & Grains','Biryani','Layered rice, spiced meat, saffron, and fried onions. Aromatic and rich.',22.00,'Rice, meat, saffron, onions, spices','None',false,false,false,false),
  ('oriental','Rice & Grains','Majadara','Green lentils, rice, and crispy onions. Vegetarian comfort food.',13.00,'Lentils, rice, onions','None',true,true,false,false),
  ('oriental','Mezze','Oriental Mezze Board','Six small plates built for sharing. Hummus, baba ghanoush, tabbouleh, and more.',24.00,'Rotating selection','Gluten, Dairy, Sesame',true,false,true,true),
  ('oriental','Mezze','Stuffed Grape Leaves','Vine leaves filled with rice, herbs, and tomatoes. Slow-cooked in lemon and olive oil.',12.00,'Grape leaves, rice, herbs, tomato','None',true,true,false,false),
  ('oriental','Mezze','Lamb Sfiha','Mini meat pies with spiced lamb, pine nuts, and tomato.',10.00,'Lamb, flour, pine nuts, tomato','Gluten, Tree nuts',false,false,false,false),
  ('oriental','Mezze','Foul Medames','Fava beans, tahini, lemon, olive oil. Egyptian breakfast classic.',8.00,'Fava beans, tahini, lemon, olive oil','Sesame',true,true,false,false),
  ('oriental','Salads','Fattoush','Toasted pita, mixed greens, sumac dressing. Crisp and tangy.',9.00,'Pita, greens, tomato, cucumber, sumac','Gluten',true,true,false,false),
  ('oriental','Salads','Tabbouleh','Parsley, mint, tomato, bulgur, lemon. Fresh and herbaceous.',8.00,'Parsley, mint, tomato, bulgur, lemon','Gluten',true,true,false,false),
  ('oriental','Soups','Lentil Soup','Red lentils, cumin, lemon. Smooth and warming.',6.00,'Lentils, cumin, lemon','None',true,true,false,false),
  ('oriental','Soups','Chicken Soup','Chicken, rice, celery, lemon. Comforting and light.',8.00,'Chicken, rice, celery, lemon','None',false,false,false,false),

  -- ========== CHINESE ==========
  ('chinese','Wok','Kung Pao Chicken','Roasted peanuts, dried chili, proper Sichuan heat. A classic done right.',18.00,'Chicken, peanuts, chili, Sichuan pepper, scallion','Peanuts, Soy',false,false,true,true),
  ('chinese','Wok','Mapo Tofu','Silky tofu, minced pork, fermented beans, and Sichuan pepper. Numbing and spicy.',16.00,'Tofu, pork, doubanjiang, Sichuan pepper','Soy',false,false,true,false),
  ('chinese','Wok','Sweet & Sour Chicken','Crisp-battered chicken, pineapple, bell pepper, tangy sauce.',17.00,'Chicken, pineapple, bell pepper, vinegar, sugar','Gluten, Soy',false,false,false,false),
  ('chinese','Wok','Beef Chow Mein','High-heat noodles, char at the edges. Tender beef and crisp vegetables.',17.00,'Noodles, beef, cabbage, carrot, soy','Gluten, Soy',false,false,false,false),
  ('chinese','Wok','Mongolian Beef','Tender beef, scallions, garlic, soy. Sizzling wok-fired.',19.00,'Beef, scallions, garlic, soy','Soy',false,false,false,false),
  ('chinese','Wok','Szechuan Shrimp','Shrimp, dried chili, Sichuan peppercorns. Fiery and bold.',20.00,'Shrimp, chili, Sichuan pepper, garlic','Shellfish, Soy',false,false,true,false),
  ('chinese','Wok','Cashew Chicken','Chicken, cashews, bell peppers, sweet soy sauce.',18.00,'Chicken, cashews, bell peppers, soy','Tree nuts, Soy',false,false,false,false),
  ('chinese','Small Plates','Vegetable Dumplings','Hand-folded, pan-seared then steamed. Cabbage, mushroom, carrot, ginger.',12.00,'Cabbage, mushroom, carrot, ginger, dough','Gluten, Soy',true,true,false,false),
  ('chinese','Small Plates','Spring Rolls','Crisp pastry filled with vegetables and glass noodles. Served with sweet chili sauce.',10.00,'Vegetables, glass noodles, pastry','Gluten, Soy',true,true,false,false),
  ('chinese','Small Plates','Crab Rangoon','Crispy wontons filled with cream cheese and crab.',12.00,'Wonton, cream cheese, crab','Gluten, Dairy, Shellfish',false,false,false,false),
  ('chinese','Small Plates','Edamame','Steamed soybeans, sea salt. Simple and addictive.',7.00,'Soybeans, sea salt','Soy',true,true,false,false),
  ('chinese','Dim Sum','Xiaolongbao','Soup dumplings filled with pork and rich broth. Delicate and flavorful.',14.00,'Pork, broth, dough','Gluten',false,false,false,true),
  ('chinese','Dim Sum','Char Siu Bao','Steamed BBQ pork buns. Fluffy, sweet, and savory.',11.00,'Pork, flour, oyster sauce','Gluten, Soy',false,false,false,false),
  ('chinese','Dim Sum','Shumai','Open-topped pork and shrimp dumplings. Steamed to perfection.',13.00,'Pork, shrimp, dough','Gluten, Shellfish',false,false,false,false),
  ('chinese','Soups','Hot & Sour Soup','Tofu, mushrooms, bamboo shoots, egg, chili, vinegar.',9.00,'Tofu, mushrooms, bamboo, egg, chili','Egg, Soy',false,false,true,false),
  ('chinese','Soups','Wonton Soup','Pork wontons, bok choy, ginger broth. Comforting and light.',10.00,'Pork, wonton, bok choy, ginger','Gluten',false,false,false,false),
  ('chinese','Rice & Noodles','Yang Chow Fried Rice','Shrimp, char siu, egg, peas, scallions. Wok hei flavor.',15.00,'Rice, shrimp, pork, egg, peas','Egg, Shellfish, Soy',false,false,false,false),
  ('chinese','Rice & Noodles','Lo Mein','Soft noodles, vegetables, soy sauce. Simple and satisfying.',14.00,'Noodles, cabbage, carrot, soy','Gluten, Soy',true,true,false,false),

  -- ========== ITALIAN ==========
  ('italian','Pizza','Margherita Pizza','San Marzano tomato, fior di latte, basil, wood-fired. The classic.',15.00,'Dough, tomato, mozzarella, basil, olive oil','Gluten, Dairy',true,false,false,true),
  ('italian','Pizza','Pizza Quattro Formaggi','Mozzarella, gorgonzola, parmesan, fontina. Rich and indulgent.',17.00,'Dough, mozzarella, gorgonzola, parmesan, fontina','Gluten, Dairy',true,false,false,false),
  ('italian','Pizza','Diavola Pizza','Spicy salami, tomato, mozzarella, chili flakes.',16.00,'Dough, salami, tomato, mozzarella, chili','Gluten, Dairy',false,false,true,false),
  ('italian','Pizza','Prosciutto e Rucola','Prosciutto di Parma, arugula, parmesan, balsamic.',18.00,'Prosciutto, arugula, parmesan, balsamic','Gluten, Dairy',false,false,false,false),
  ('italian','Pizza','Capricciosa','Mushrooms, artichokes, ham, olives. The works.',17.00,'Mushrooms, artichokes, ham, olives, mozzarella','Gluten, Dairy',false,false,false,false),
  ('italian','Pasta','Tagliatelle al Ragù','Slow ragù, egg pasta rolled fresh. Bolognese tradition.',20.00,'Beef, pork, tomato, egg pasta, parmesan','Gluten, Dairy, Egg',false,false,false,false),
  ('italian','Pasta','Spaghetti Carbonara','Guanciale, egg, pecorino, black pepper. Roman perfection.',19.00,'Spaghetti, guanciale, egg, pecorino','Gluten, Dairy, Egg',false,false,false,true),
  ('italian','Pasta','Pesto Genovese','Basil pesto, pine nuts, parmesan, trofie pasta. Ligurian sunshine.',18.00,'Basil, pine nuts, parmesan, garlic, pasta','Gluten, Tree nuts, Dairy',true,false,false,false),
  ('italian','Pasta','Penne Arrabbiata','Spicy tomato sauce, garlic, chili. Simple and fiery.',16.00,'Penne, tomato, garlic, chili','Gluten',true,false,true,false),
  ('italian','Pasta','Lobster Linguine','Fresh lobster, cherry tomatoes, white wine, garlic. Luxurious.',28.00,'Linguine, lobster, tomato, white wine','Gluten, Shellfish',false,false,false,false),
  ('italian','Pasta','Truffle Tagliatelle','Fresh tagliatelle, black truffle, parmesan, butter. Decadent.',26.00,'Tagliatelle, truffle, parmesan, butter','Gluten, Dairy',true,false,false,false),
  ('italian','Risotto','Risotto ai Funghi','Carnaroli rice, wild mushroom, aged parmesan, white wine, butter.',19.00,'Rice, mushroom, parmesan, white wine, butter','Dairy',true,false,false,false),
  ('italian','Risotto','Risotto alla Milanese','Saffron-infused risotto, bone marrow, parmesan. Golden and luxurious.',21.00,'Rice, saffron, bone marrow, parmesan, butter','Dairy',false,false,false,false),
  ('italian','Risotto','Seafood Risotto','Shrimp, mussels, calamari, saffron. Coastal Italian.',24.00,'Rice, shrimp, mussels, calamari, saffron','Shellfish, Dairy',false,false,false,false),
  ('italian','Starters','Bruschetta Trio','Tomato-basil, mushroom, white bean. Grilled bread, olive oil.',11.00,'Bread, tomato, mushroom, white bean, basil','Gluten',true,true,false,false),
  ('italian','Starters','Caprese Salad','Buffalo mozzarella, heirloom tomatoes, basil, balsamic.',13.00,'Mozzarella, tomato, basil, balsamic','Dairy',true,false,false,false),
  ('italian','Starters','Calamari Fritti','Crisp fried calamari, lemon, aioli. Light and golden.',14.00,'Calamari, flour, lemon, aioli','Gluten, Shellfish',false,false,false,false),
  ('italian','Starters','Burrata e Parma','Creamy burrata, prosciutto di Parma, arugula, balsamic.',16.00,'Burrata, prosciutto, arugula, balsamic','Dairy',false,false,false,false),
  ('italian','Salads','Caesar Salad','Romaine, parmesan, croutons, anchovies, Caesar dressing.',12.00,'Romaine, parmesan, croutons, anchovies','Gluten, Dairy, Fish',false,false,false,false),
  ('italian','Salads','Panzenella','Tuscan bread salad, tomato, cucumber, onion, basil.',11.00,'Bread, tomato, cucumber, onion, basil','Gluten',true,true,false,false),

  -- ========== SANDWICHES ==========
  ('sandwiches','Lebanese Wraps','Shawarma Chicken Wrap','Marinated chicken, garlic toum, pickles, lettuce in fresh pita.',10.00,'Chicken, pita, garlic, pickles, lettuce','Gluten',false,false,false,true),
  ('sandwiches','Lebanese Wraps','Shawarma Beef Wrap','Thinly sliced beef, tahini sauce, tomato, onion, parsley.',11.00,'Beef, pita, tahini, tomato, onion','Gluten, Sesame',false,false,false,false),
  ('sandwiches','Lebanese Wraps','Falafel Sandwich','Crispy falafel, tahini, tomato, lettuce, pickled turnip in pita.',9.00,'Chickpeas, pita, tahini, vegetables','Gluten, Sesame',true,true,false,false),
  ('sandwiches','Lebanese Wraps','Kafta Wrap','Grilled kafta, hummus, tomato, onion, parsley in saj bread.',10.00,'Lamb, saj bread, hummus, tomato','Gluten',false,false,false,false),
  ('sandwiches','Oriental Wraps','Shish Tawook Wrap','Grilled chicken, garlic sauce, pickles, tomato in saj bread.',10.00,'Chicken, saj bread, garlic, tomato','Gluten',false,false,false,false),
  ('sandwiches','Oriental Wraps','Kofta Wrap','Spiced ground lamb, grilled vegetables, tahini in pita.',10.00,'Lamb, pita, tahini, vegetables','Gluten, Sesame',false,false,false,false),
  ('sandwiches','Oriental Wraps','Shawarma Lamb Wrap','Slow-roasted lamb, toum, tomato, onion, pickles.',12.00,'Lamb, pita, toum, tomato, onion','Gluten',false,false,false,false),
  ('sandwiches','Chinese Wraps','Rou Jia Mo','Chinese braised pork burger with cilantro and chili. Xi''an street food.',12.00,'Pork, bread, cilantro, chili','Gluten',false,false,true,false),
  ('sandwiches','Chinese Wraps','Scallion Pancake Wrap','Crispy layered pancake with egg, scallion, and hoisin.',10.00,'Flour, scallion, egg, hoisin','Gluten, Egg, Soy',true,false,false,false),
  ('sandwiches','Chinese Wraps','Char Siu Bao Wrap','Steamed BBQ pork buns. Fluffy, sweet, and savory.',11.00,'Pork, flour, oyster sauce','Gluten, Soy',false,false,false,false),
  ('sandwiches','Italian Panini','Chicken Pesto Panini','Grilled chicken, pesto, mozzarella, sun-dried tomato, ciabatta.',13.00,'Chicken, pesto, mozzarella, tomato, ciabatta','Gluten, Dairy',false,false,false,false),
  ('sandwiches','Italian Panini','Caprese Panini','Fresh mozzarella, tomato, basil, balsamic on focaccia.',12.00,'Mozzarella, tomato, basil, balsamic, focaccia','Gluten, Dairy',true,false,false,false),
  ('sandwiches','Italian Panini','Meatball Marinara Panini','House meatballs, marinara, parmesan, provolone.',14.00,'Beef, pork, marinara, parmesan, bread','Gluten, Dairy',false,false,false,false),

  -- ========== DRINKS ==========
  ('drinks','Fresh Juices','Orange Juice','Freshly squeezed Valencia oranges.',5.00,'Fresh oranges','None',true,true,false,false),
  ('drinks','Fresh Juices','Pomegranate Juice','Sweet pomegranate, a Lebanese favorite.',6.00,'Fresh pomegranate','None',true,true,false,false),
  ('drinks','Fresh Juices','Mango Juice','Alphonso mango, creamy and tropical.',6.00,'Fresh mango','None',true,true,false,false),
  ('drinks','Fresh Juices','Lemonade','Fresh lemon, mint, sugar. Classic refreshment.',4.00,'Lemon, mint, sugar','None',true,true,false,false),
  ('drinks','Fresh Juices','Carrot Juice','Fresh carrots, ginger, orange. Sweet and earthy.',5.00,'Carrots, ginger, orange','None',true,true,false,false),
  ('drinks','Fresh Juices','Watermelon Juice','Fresh watermelon, mint, lime. Summer in a glass.',5.00,'Watermelon, mint, lime','None',true,true,false,false),
  ('drinks','Fresh Juices','Grapefruit Juice','Fresh grapefruit, tangy and refreshing.',5.00,'Fresh grapefruit','None',true,true,false,false),
  ('drinks','Smoothies','Avocado Smoothie','Avocado, milk, honey, cardamom.',7.00,'Avocado, milk, honey, cardamom','Dairy',true,false,false,false),
  ('drinks','Smoothies','Date Smoothie','Dates, milk, vanilla, almond.',7.00,'Dates, milk, vanilla, almond','Dairy, Tree nuts',true,false,false,false),
  ('drinks','Smoothies','Mango Lassi','Mango, yogurt, cardamom, honey. Indian-inspired.',7.00,'Mango, yogurt, cardamom, honey','Dairy',true,false,false,false),
  ('drinks','Smoothie','Berry Blast','Strawberry, blueberry, banana, yogurt.',8.00,'Strawberry, blueberry, banana, yogurt','Dairy',true,false,false,false),
  ('drinks','Hot Beverages','Turkish Coffee','Finely ground coffee, cardamom, served in finjan.',4.00,'Coffee, cardamom','None',true,true,false,false),
  ('drinks','Hot Beverages','Moroccan Tea','Green tea, fresh mint, sugar. Refreshing and aromatic.',4.00,'Green tea, mint, sugar','None',true,true,false,false),
  ('drinks','Hot Beverages','Sahlab','Warm milk, orchid powder, cinnamon, nuts. Winter comfort.',5.00,'Milk, orchid powder, cinnamon, nuts','Dairy, Tree nuts',true,false,false,false),
  ('drinks','Hot Beverages','Espresso','Single shot of premium espresso.',3.00,'Coffee','None',true,true,false,false),
  ('drinks','Hot Beverages','Cappuccino','Espresso, steamed milk, foam. Italian classic.',5.00,'Coffee, milk','Dairy',true,false,false,false),
  ('drinks','Hot Beverages','Hot Chocolate','Belgian chocolate, whipped cream. Rich and indulgent.',5.00,'Chocolate, milk, cream','Dairy',true,false,false,false),
  ('drinks','Hot Beverages','Chai Latte','Spiced tea, steamed milk, honey. Aromatic and warming.',5.00,'Tea, milk, spices, honey','Dairy',true,false,false,false),
  ('drinks','Cold Beverages','Ayran','Yogurt, salt, water. Refreshing and light.',4.00,'Yogurt, salt, water','Dairy',true,false,false,false),
  ('drinks','Cold Beverages','Soft Drink','Coca-Cola, Sprite, Fanta, or Pepsi.',3.00,'Carbonated beverage','None',true,true,false,false),
  ('drinks','Cold Beverages','Mineral Water','Still or sparkling.',2.00,'Water','None',true,true,false,false),
  ('drinks','Cold Beverages','Iced Tea','Black tea, lemon, mint. Refreshing.',4.00,'Tea, lemon, mint','None',true,true,false,false),
  ('drinks','Cold Beverages','Iced Coffee','Cold brew, milk, ice. Smooth and strong.',5.00,'Coffee, milk, ice','Dairy',true,false,false,false),
  ('drinks','Traditional Drinks','Jallab','Molasses, rose water, pine nuts, raisins. Levantine classic.',5.00,'Molasses, rose water, pine nuts, raisins','Tree nuts',true,true,false,false),
  ('drinks','Traditional Drinks','Tamarind Juice','Sweet and tangy, served chilled.',5.00,'Tamarind, sugar','None',true,true,false,false),
  ('drinks','Traditional Drinks','Laban','Drinkable yogurt, refreshing and probiotic.',4.00,'Yogurt, water, salt','Dairy',true,false,false,false),
  ('drinks','Traditional Drinks','Sobia','Rice, coconut, vanilla, ice. Ramadan favorite.',5.00,'Rice, coconut, vanilla, ice','None',true,true,false,false),
  ('drinks','Milkshakes','Chocolate Milkshake','Chocolate ice cream, milk, whipped cream.',7.00,'Chocolate, milk, cream','Dairy',true,false,false,false),
  ('drinks','Milkshakes','Vanilla Milkshake','Vanilla ice cream, milk, whipped cream.',7.00,'Vanilla, milk, cream','Dairy',true,false,false,false),
  ('drinks','Milkshakes','Strawberry Milkshake','Strawberry ice cream, milk, whipped cream.',7.00,'Strawberry, milk, cream','Dairy',true,false,false,false),

  -- ========== ALCOHOLIC BEVERAGES ==========
  ('alcoholic-beverages','Lebanese Wines','Château Musar Red','Iconic Lebanese red, Bordeaux-style blend.',65.00,'Cabernet, Cinsault, Carignan','Sulfites',true,true,false,false),
  ('alcoholic-beverages','Lebanese Wines','Château Musar White','Lebanese white blend, age-worthy.',60.00,'Vermentino, Viognier, Chardonnay','Sulfites',true,true,false,false),
  ('alcoholic-beverages','Lebanese Wines','Domaine des Tourelles Red','Organic Bekaa Valley red.',45.00,'Syrah, Cabernet','Sulfites',true,true,false,false),
  ('alcoholic-beverages','Lebanese Wines','Ixsir Rose','Provencal-style rose from Lebanon.',35.00,'Syrah, Caladoc','Sulfites',true,true,false,false),
  ('alcoholic-beverages','Lebanese Wines','Château Ksara Red','Lebanese classic, medium-bodied.',40.00,'Cabernet, Merlot','Sulfites',true,true,false,false),
  ('alcoholic-beverages','Lebanese Wines','Château Ksara Blanc','Crisp and refreshing white.',35.00,'Chardonnay, Sauvignon Blanc','Sulfites',true,true,false,false),
  ('alcoholic-beverages','Arak','Arak Touma','Triple-distilled, anise-flavored Lebanese spirit.',30.00,'Anise, grapes','None',true,true,false,false),
  ('alcoholic-beverages','Arak','Arak Brun','Premium arak, aged in clay jars.',40.00,'Anise, grapes','None',true,true,false,false),
  ('alcoholic-beverages','Arak','Arak with Water & Ice','Traditional preparation.',12.00,'Arak, water, ice','None',true,true,false,false),
  ('alcoholic-beverages','Cocktails','Arak Sour','Arak, lemon, sugar, egg white.',14.00,'Arak, lemon, sugar, egg white','Egg',false,false,false,false),
  ('alcoholic-beverages','Cocktails','Lebanese Mojito','Arak, mint, lime, soda.',13.00,'Arak, mint, lime, soda','None',true,true,false,false),
  ('alcoholic-beverages','Cocktails','Jallab Cocktail','Jallab, arak, pine nuts.',14.00,'Jallab, arak, pine nuts','Tree nuts',true,false,false,false),
  ('alcoholic-beverages','Cocktails','Negroni','Gin, campari, vermouth.',14.00,'Gin, campari, vermouth','None',true,true,false,false),
  ('alcoholic-beverages','Cocktails','Aperol Spritz','Aperol, prosecco, soda. Italian classic.',13.00,'Aperol, prosecco, soda','None',true,true,false,false),
  ('alcoholic-beverages','Cocktails','Mojito','Rum, mint, lime, soda. Cuban classic.',12.00,'Rum, mint, lime, soda','None',true,true,false,false),
  ('alcoholic-beverages','Cocktails','Margarita','Tequila, triple sec, lime. Classic.',13.00,'Tequila, triple sec, lime','None',true,true,false,false),
  ('alcoholic-beverages','Beer','Almaza Pilsner','Lebanese classic, crisp and refreshing.',6.00,'Barley, hops, water','Gluten',true,true,false,false),
  ('alcoholic-beverages','Beer','961 White Ale','Lebanese craft, citrus and coriander.',8.00,'Wheat, orange peel, coriander','Gluten',true,true,false,false),
  ('alcoholic-beverages','Beer','961 Pilsner','Lebanese craft, hoppy and crisp.',8.00,'Barley, hops','Gluten',true,true,false,false),
  ('alcoholic-beverages','Beer','Heineken','Dutch lager, internationally loved.',7.00,'Barley, hops','Gluten',true,true,false,false),
  ('alcoholic-beverages','Spirits','Johnnie Walker Black','Scotch whisky, 12 years aged.',12.00,'Whisky','None',true,true,false,false),
  ('alcoholic-beverages','Spirits','Hennessy VSOP','Cognac, smooth and complex.',15.00,'Cognac','None',true,true,false,false),
  ('alcoholic-beverages','Spirits','Grey Goose','Premium French vodka.',12.00,'Vodka','None',true,true,false,false),
  ('alcoholic-beverages','Spirits','Bacardi Superior','White rum, smooth and versatile.',10.00,'Rum','None',true,true,false,false),

  -- ========== CHICHA ==========
  ('chicha','Fruit Flavors','Al Fakher Double Apple','Classic anise and apple, sweet and aromatic.',15.00,'Tobacco, molasses, flavoring','Nicotine',false,false,false,false),
  ('chicha','Fruit Flavors','Al Fakher Grape','Sweet Concord grape with mint undertones.',15.00,'Tobacco, molasses, grape flavoring','Nicotine',false,false,false,false),
  ('chicha','Fruit Flavors','Al Fakher Mango','Tropical mango, rich and fruity.',15.00,'Tobacco, molasses, mango flavoring','Nicotine',false,false,false,false),
  ('chicha','Fruit Flavors','Al Fakher Watermelon','Summer watermelon, light and sweet.',15.00,'Tobacco, molasses, watermelon flavoring','Nicotine',false,false,false,false),
  ('chicha','Fruit Flavors','Al Fakher Melon','Sweet cantaloupe, smooth smoke.',15.00,'Tobacco, molasses, melon flavoring','Nicotine',false,false,false,false),
  ('chicha','Fruit Flavors','Al Fakher Peach','Sweet summer peach, juicy and smooth.',15.00,'Tobacco, molasses, peach flavoring','Nicotine',false,false,false,false),
  ('chicha','Fruit Flavors','Al Fakher Banana','Creamy banana, sweet and mellow.',15.00,'Tobacco, molasses, banana flavoring','Nicotine',false,false,false,false),
  ('chicha','Mint & Sweet','Al Fakher Mint','Cool mint, refreshing classic.',15.00,'Tobacco, molasses, mint flavoring','Nicotine',false,false,false,false),
  ('chicha','Mint & Sweet','Al Fakher Blueberry Mint','Blueberry and mint, sweet and cool.',15.00,'Tobacco, molasses, blueberry, mint','Nicotine',false,false,false,false),
  ('chicha','Mint & Sweet','Starbuzz Blue Mist','Blueberry and mint, the flagship flavor.',18.00,'Tobacco, molasses, blueberry, mint','Nicotine',false,false,false,false),
  ('chicha','Mint & Sweet','Starbuzz Mint','Double mint, extra cool.',18.00,'Tobacco, molasses, mint','Nicotine',false,false,false,false),
  ('chicha','Mint & Sweet','Al Fakher Gum Mint','Spearmint and gum, unique blend.',15.00,'Tobacco, molasses, gum, mint','Nicotine',false,false,false,false),
  ('chicha','Berry & Citrus','Al Fakher Cherry','Sweet cherry, rich and bold.',15.00,'Tobacco, molasses, cherry flavoring','Nicotine',false,false,false,false),
  ('chicha','Berry & Citrus','Al Fakher Orange','Citrus orange, bright and tangy.',15.00,'Tobacco, molasses, orange flavoring','Nicotine',false,false,false,false),
  ('chicha','Berry & Citrus','Starbuzz Pirates Cave','Coconut, pineapple, tropical mix.',18.00,'Tobacco, molasses, coconut, pineapple','Nicotine',false,false,false,false),
  ('chicha','Berry & Citrus','Al Fakher Lemon Mint','Lemon and mint, refreshing citrus.',15.00,'Tobacco, molasses, lemon, mint','Nicotine',false,false,false,false),
  ('chicha','Berry & Citrus','Al Fakher Strawberry','Sweet strawberry, summer in every puff.',15.00,'Tobacco, molasses, strawberry flavoring','Nicotine',false,false,false,false),
  ('chicha','Classic','Al Fakher Tobacco','Pure tobacco, no flavoring.',15.00,'Tobacco, molasses','Nicotine',false,false,false,false),
  ('chicha','Classic','Nakhla Two Apples','Traditional double apple, anise forward.',18.00,'Tobacco, molasses, apple, anise','Nicotine',false,false,false,false),
  ('chicha','Classic','Al Fakher Cappuccino','Coffee and cream, smooth and aromatic.',15.00,'Tobacco, molasses, coffee, cream flavoring','Nicotine',false,false,false,false),
  ('chicha','Premium','Tangiers Noir Cane Mint','Intense mint, long-lasting.',22.00,'Tobacco, molasses, mint','Nicotine',false,false,false,false),
  ('chicha','Premium','Fumari Ambrosia','Orange, cherry, pineapple, marshmallow.',20.00,'Tobacco, molasses, citrus, fruit','Nicotine',false,false,false,false),
  ('chicha','Premium','Social Smoke Absolute Zero','Cool mint, extreme freshness.',20.00,'Tobacco, molasses, mint','Nicotine',false,false,false,false),
  ('chicha','Exotic','Al Fakher Passion Fruit','Tropical passion fruit, tangy and sweet.',16.00,'Tobacco, molasses, passion fruit','Nicotine',false,false,false,false),
  ('chicha','Exotic','Al Fakher Pomegranate','Sweet pomegranate, Middle Eastern classic.',16.00,'Tobacco, molasses, pomegranate','Nicotine',false,false,false,false),
  ('chicha','Exotic','Starbuzz Sex on the Beach','Peach, orange, cranberry. Cocktail-inspired.',18.00,'Tobacco, molasses, peach, orange','Nicotine',false,false,false,false),

  -- ========== DESSERTS ==========
  ('desserts','Lebanese Sweets','Baklava','Layered phyllo, walnuts, rose water syrup. Flaky and decadent.',8.00,'Phyllo, walnuts, sugar, rose water','Gluten, Tree nuts',true,false,false,true),
  ('desserts','Lebanese Sweets','Knafeh','Crispy semolina, sweet cheese, orange blossom syrup.',9.00,'Semolina, cheese, sugar, orange blossom','Gluten, Dairy',true,false,false,false),
  ('desserts','Lebanese Sweets','Maamoul','Date-filled semolina cookies, aromatic and buttery.',7.00,'Semolina, dates, butter, orange blossom','Gluten, Dairy',true,false,false,false),
  ('desserts','Lebanese Sweets','Atayef','Stuffed pancakes with cream or nuts, fried and sweet.',8.00,'Flour, cream, nuts, sugar','Gluten, Dairy, Tree nuts',false,false,false,false),
  ('desserts','Lebanese Sweets','Osmaliyi','Shredded phyllo, cream, pistachios, rose syrup.',10.00,'Phyllo, cream, pistachios, rose water','Gluten, Dairy, Tree nuts',true,false,false,false),
  ('desserts','Lebanese Sweets','Muhallabia','Rose-scented milk pudding, elegant and silky.',6.00,'Milk, sugar, rose water, cornstarch','Dairy',true,false,false,false),
  ('desserts','Lebanese Sweets','Meghli','Car semolina pudding, spiced and warm.',6.00,'Semolina, caraway, anise, coconut','None',true,true,false,false),
  ('desserts','Oriental Sweets','Basbousa','Semolina cake, almond, coconut, syrup. Moist and sweet.',6.00,'Semolina, almond, coconut, sugar','Gluten, Tree nuts',true,false,false,false),
  ('desserts','Oriental Sweets','Luqmat al Qadi','Fried dough balls, rose syrup, sesame. Light and airy.',6.00,'Flour, yeast, rose syrup, sesame','Gluten, Sesame',true,false,false,false),
  ('desserts','Oriental Sweets','Halawet el Jibn','Sweet cheese rolls, cream filling, pistachio.',8.00,'Cheese, cream, sugar, pistachio','Dairy, Tree nuts',false,false,false,false),
  ('desserts','Oriental Sweets','Mamoul bil Tamar','Date-filled cookies, rich and satisfying.',7.00,'Semolina, dates, butter','Gluten, Dairy',true,false,false,false),
  ('desserts','Oriental Sweets','Shawabak','Sweet bread, cardamom, sugar. Warm comfort.',6.00,'Flour, sugar, cardamom, butter','Gluten, Dairy',true,false,false,false),
  ('desserts','Chinese Sweets','Mango Pudding','Silky mango, cream, and gelatin. Tropical and refreshing.',7.00,'Mango, cream, sugar, gelatin','Dairy',false,false,false,false),
  ('desserts','Chinese Sweets','Red Bean Soup','Sweet red bean, tangyuan in syrup. Warm and comforting.',6.00,'Red beans, rice flour, sugar','None',true,true,false,false),
  ('desserts','Chinese Sweets','Sesame Balls','Crispy fried dough, sweet red bean filling.',6.00,'Rice flour, sesame, red bean, sugar','Gluten, Sesame',true,true,false,false),
  ('desserts','Chinese Sweets','Egg Tart','Flaky pastry, custard filling, caramelized top.',5.00,'Flour, egg, milk, sugar','Gluten, Dairy, Egg',false,false,false,false),
  ('desserts','Chinese Sweets','Almond Jelly','Sweet almond jelly, fruit cocktail, refreshing.',6.00,'Almond extract, gelatin, fruit, sugar','None',true,true,false,false),
  ('desserts','Chinese Sweets','Baked Mooncake','Lotus paste, salted egg yolk, golden pastry.',8.00,'Flour, lotus paste, egg yolk, sugar','Gluten, Egg',false,false,false,false),
  ('desserts','Italian Sweets','Tiramisu','Espresso, mascarpone, cocoa. Classic Italian indulgence.',9.00,'Mascarpone, espresso, cocoa, ladyfingers','Gluten, Dairy, Egg',false,false,false,true),
  ('desserts','Italian Sweets','Panna Cotta','Vanilla cream, berry compote. Silky and elegant.',8.00,'Cream, vanilla, sugar, berries','Dairy',false,false,false,false),
  ('desserts','Italian Sweets','Cannoli','Crisp shells, sweet ricotta, chocolate chips. Sicilian classic.',8.00,'Flour, ricotta, chocolate, sugar','Gluten, Dairy',false,false,false,false),
  ('desserts','Italian Sweets','Affogato','Vanilla gelato drowned in espresso. Simple perfection.',7.00,'Gelato, espresso','Dairy',false,false,false,false),
  ('desserts','Italian Sweets','Gelato Trio','Three scoops: chocolate, pistachio, strawberry.',7.00,'Milk, cream, sugar, natural flavors','Dairy',false,false,false,false),
  ('desserts','Italian Sweets','Zabaglione','Warm custard, marsala wine, whipped cream. Decadent.',8.00,'Egg yolks, marsala wine, sugar','Egg, Alcohol',false,false,false,false),
  ('desserts','Italian Sweets','Sfogliatella','Laminated pastry, ricotta, citrus. Neapolitan specialty.',8.00,'Flour, ricotta, citrus, sugar','Gluten, Dairy',false,false,false,false),
  ('desserts','Ice Cream','Vanilla Bean','Madagascar vanilla, creamy and classic.',5.00,'Milk, cream, vanilla','Dairy',true,false,false,false),
  ('desserts','Ice Cream','Chocolate','Rich Belgian chocolate, dense and indulgent.',5.00,'Milk, cream, chocolate','Dairy',true,false,false,false),
  ('desserts','Ice Cream','Pistachio','Sicilian pistachio, nutty and luxurious.',6.00,'Milk, cream, pistachio','Dairy, Tree nuts',true,false,false,false),
  ('desserts','Ice Cream','Strawberry','Fresh strawberry, sweet and fruity.',5.00,'Milk, cream, strawberry','Dairy',true,false,false,false),
  ('desserts','Pastries','Croissant','Buttery, flaky, French classic. Plain or chocolate.',4.00,'Flour, butter, yeast','Gluten, Dairy',true,false,false,false),
  ('desserts','Pastries','Éclair','Choux pastry, chocolate filling, glazed.',6.00,'Flour, chocolate, cream','Gluten, Dairy',false,false,false,false),
  ('desserts','Pastries','Fruit Tart','Pastry cream, fresh fruits, glazed. Seasonal selection.',7.00,'Flour, cream, fruits','Gluten, Dairy',false,false,false,false),
  ('desserts','Pastries','Cheesecake','New York style, creamy and rich. Berry compote.',8.00,'Cream cheese, graham cracker, berries','Gluten, Dairy',false,false,false,false)
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
  phone = '+961 76 784 433',
  email = 'hello@jebal-restaurant.com',
  address = 'Mount Lebanon',
  opening_hours = 'Mon–Thu 12:00–23:00, Fri–Sun 12:00–00:30'
where id = 1;
