"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X, ChevronDown, ChevronUp, Search, Image } from "lucide-react";

const STORAGE_KEY = "gebal_menu_items";

const CUISINES = ["Lebanese", "Oriental", "Chinese", "Italian", "Sandwiches", "Drinks", "Alcoholic Beverages", "Chicha", "Desserts"];

const CATEGORIES: Record<string, string[]> = {
  Lebanese: ["Mezze", "Grills", "Bakery", "Salads", "Soups"],
  Oriental: ["Grills", "Rice & Grains", "Mezze", "Salads", "Soups"],
  Chinese: ["Wok", "Small Plates", "Dim Sum", "Soups", "Rice & Noodles"],
  Italian: ["Pizza", "Pasta", "Risotto", "Starters", "Salads"],
  Sandwiches: ["Lebanese Wraps", "Oriental Wraps", "Chinese Wraps", "Italian Panini"],
  Drinks: ["Fresh Juices", "Smoothies", "Hot Beverages", "Cold Beverages", "Traditional Drinks", "Milkshakes"],
  "Alcoholic Beverages": ["Lebanese Wines", "Arak", "Cocktails", "Beer", "Spirits"],
  Chicha: ["Fruit Flavors", "Mint & Sweet", "Berry & Citrus", "Classic", "Premium", "Exotic"],
  Desserts: ["Lebanese Sweets", "Oriental Sweets", "Chinese Sweets", "Italian Sweets", "Ice Cream", "Pastries"],
};

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_spicy: boolean;
  is_featured: boolean;
  cuisine: string;
  category: string;
  image?: string;
};

// Image mapping for each item
const ITEM_IMAGES: Record<string, string> = {
  // Lebanese
  l1: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400&h=300&fit=crop",
  l2: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
  l3: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop",
  l4: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
  l5: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
  l6: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  l7: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
  l8: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
  l9: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop",
  l10: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
  l11: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop",
  l12: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
  // Oriental
  o1: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
  o2: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
  o3: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
  o4: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
  o5: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
  o6: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  o7: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop",
  o8: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
  o9: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop",
  // Chinese
  c1: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop",
  c2: "https://images.unsplash.com/photo-1582452919280-85adbc856546?w=400&h=300&fit=crop",
  c3: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
  c4: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
  c5: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop",
  c6: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop",
  c7: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop",
  c8: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop",
  c9: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop",
  c10: "https://images.unsplash.com/photo-1582452919280-85adbc856546?w=400&h=300&fit=crop",
  // Italian
  i1: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
  i2: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
  i3: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  i4: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
  i5: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
  i6: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
  i7: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
  i8: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
  i9: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop",
  i10: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
  i11: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
  // Drinks
  d1: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
  d2: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop",
  d3: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop",
  d4: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop",
  d5: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop",
  d6: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop",
  d7: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
  d8: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  d9: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  d10: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  d11: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  d12: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  d13: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  d14: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  d15: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  // Alcoholic
  a1: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a2: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a3: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a4: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a5: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a6: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a7: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a8: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a9: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a10: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a11: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  a12: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
  // Chicha
  h1: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h2: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h3: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h4: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h5: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h6: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h7: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h8: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h9: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h10: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h11: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h12: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h13: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h14: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h15: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h16: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h17: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h18: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  h19: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  // Desserts
  de1: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de2: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de3: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de4: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de5: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de6: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de7: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de8: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de9: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de10: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de11: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de12: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de13: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop",
  de14: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de15: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de16: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de17: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de18: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de19: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de20: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de21: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de22: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de23: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de24: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  de25: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
};

const DEFAULT_ITEMS: MenuItem[] = [
  { id: "l1", name: "Hummus Jebal", description: "Slow-cooked chickpeas, tahini from Baalbek, olive oil, pine nuts.", price: 8.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: true, cuisine: "Lebanese", category: "Mezze", image: ITEM_IMAGES.l1 },
  { id: "l2", name: "Tabbouleh", description: "Finely chopped parsley, mint, tomato, bulgur, lemon juice, olive oil.", price: 9.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Mezze", image: ITEM_IMAGES.l2 },
  { id: "l3", name: "Baba Ghanoush", description: "Smoky roasted eggplant blended with tahini, lemon, and garlic.", price: 8.50, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Mezze", image: ITEM_IMAGES.l3 },
  { id: "l4", name: "Fattoush", description: "Toasted pita, mixed greens, tomato, cucumber, radish, sumac dressing.", price: 9.50, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Mezze", image: ITEM_IMAGES.l4 },
  { id: "l5", name: "Mixed Grill Jebal", description: "Kafta, shish taouk, and lamb kebab with garlic toum.", price: 26.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: true, cuisine: "Lebanese", category: "Grills", image: ITEM_IMAGES.l5 },
  { id: "l6", name: "Shish Taouk", description: "Yogurt-marinated chicken skewers, grilled over charcoal.", price: 19.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Grills", image: ITEM_IMAGES.l6 },
  { id: "l7", name: "Kafta Kebab", description: "Ground lamb with parsley, onion, and spices.", price: 18.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Grills", image: ITEM_IMAGES.l7 },
  { id: "l8", name: "Manakish Zaatar", description: "Baked to order, thyme worked into the dough.", price: 7.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Bakery", image: ITEM_IMAGES.l8 },
  { id: "l9", name: "Cheese Manakish", description: "Akkar cheese, sesame, baked until golden.", price: 8.50, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Bakery", image: ITEM_IMAGES.l9 },
  { id: "l10", name: "Shawarma Chicken Wrap", description: "Marinated chicken, garlic toum, pickles, lettuce in pita.", price: 10.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Sandwiches", image: ITEM_IMAGES.l10 },
  { id: "l11", name: "Falafel Sandwich", description: "Crispy falafel, tahini, tomato, lettuce, pickled turnip.", price: 9.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Sandwiches", image: ITEM_IMAGES.l11 },
  { id: "l12", name: "Lentil Soup", description: "Red lentils, onion, cumin, lemon. Hearty and warming.", price: 6.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Soups", image: ITEM_IMAGES.l12 },
  { id: "o1", name: "Lamb Kabsa", description: "Fragrant rice with tender lamb, raisins, almonds, spices.", price: 22.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: true, cuisine: "Oriental", category: "Grills", image: ITEM_IMAGES.o1 },
  { id: "o2", name: "Chicken Mandi", description: "Slow-cooked chicken with spiced rice, caramelized onions.", price: 20.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Oriental", category: "Grills", image: ITEM_IMAGES.o2 },
  { id: "o3", name: "Mixed Oriental Grill", description: "Kafta, shish taouk, lamb chops, chicken breast.", price: 28.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: true, cuisine: "Oriental", category: "Grills", image: ITEM_IMAGES.o3 },
  { id: "o4", name: "Freekeh with Lamb", description: "Smoked green wheat, braised lamb, toasted almonds.", price: 21.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Oriental", category: "Rice & Grains", image: ITEM_IMAGES.o4 },
  { id: "o5", name: "Mujadara", description: "Lentils, rice, caramelized onions. Humble and hearty.", price: 14.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Oriental", category: "Rice & Grains", image: ITEM_IMAGES.o5 },
  { id: "o6", name: "Oriental Mezze Board", description: "Six small plates for sharing. Hummus, baba ghanoush, tabbouleh.", price: 24.00, is_vegetarian: true, is_vegan: false, is_spicy: true, is_featured: true, cuisine: "Oriental", category: "Mezze", image: ITEM_IMAGES.o6 },
  { id: "o7", name: "Stuffed Grape Leaves", description: "Vine leaves with rice, herbs, tomatoes. Slow-cooked.", price: 12.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Oriental", category: "Mezze", image: ITEM_IMAGES.o7 },
  { id: "o8", name: "Shish Tawook Wrap", description: "Grilled chicken, garlic sauce, pickles in saj bread.", price: 10.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Oriental", category: "Sandwiches", image: ITEM_IMAGES.o8 },
  { id: "o9", name: "Kofta Wrap", description: "Spiced ground lamb, grilled vegetables, tahini.", price: 10.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Oriental", category: "Sandwiches", image: ITEM_IMAGES.o9 },
  { id: "c1", name: "Kung Pao Chicken", description: "Roasted peanuts, dried chili, proper Sichuan heat.", price: 18.00, is_vegetarian: false, is_vegan: false, is_spicy: true, is_featured: true, cuisine: "Chinese", category: "Wok", image: ITEM_IMAGES.c1 },
  { id: "c2", name: "Mapo Tofu", description: "Silky tofu, minced pork, fermented beans, Sichuan pepper.", price: 16.00, is_vegetarian: false, is_vegan: false, is_spicy: true, is_featured: false, cuisine: "Chinese", category: "Wok", image: ITEM_IMAGES.c2 },
  { id: "c3", name: "Sweet & Sour Chicken", description: "Crisp-battered chicken, pineapple, bell pepper.", price: 17.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chinese", category: "Wok", image: ITEM_IMAGES.c3 },
  { id: "c4", name: "Beef Chow Mein", description: "High-heat noodles, char at the edges. Tender beef.", price: 17.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chinese", category: "Wok", image: ITEM_IMAGES.c4 },
  { id: "c5", name: "Vegetable Dumplings", description: "Hand-folded, pan-seared then steamed.", price: 12.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Chinese", category: "Small Plates", image: ITEM_IMAGES.c5 },
  { id: "c6", name: "Spring Rolls", description: "Crisp pastry with vegetables and glass noodles.", price: 10.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Chinese", category: "Small Plates", image: ITEM_IMAGES.c6 },
  { id: "c7", name: "Xiaolongbao", description: "Soup dumplings with pork and rich broth.", price: 14.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: true, cuisine: "Chinese", category: "Dim Sum", image: ITEM_IMAGES.c7 },
  { id: "c8", name: "Char Siu Bao", description: "Steamed BBQ pork buns. Fluffy, sweet, savory.", price: 11.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chinese", category: "Dim Sum", image: ITEM_IMAGES.c8 },
  { id: "c9", name: "Rou Jia Mo", description: "Chinese braised pork burger with cilantro and chili.", price: 12.00, is_vegetarian: false, is_vegan: false, is_spicy: true, is_featured: false, cuisine: "Chinese", category: "Sandwiches", image: ITEM_IMAGES.c9 },
  { id: "c10", name: "Hot & Sour Soup", description: "Tofu, mushrooms, bamboo shoots, egg, chili.", price: 9.00, is_vegetarian: false, is_vegan: false, is_spicy: true, is_featured: false, cuisine: "Chinese", category: "Soups", image: ITEM_IMAGES.c10 },
  { id: "i1", name: "Margherita Pizza", description: "San Marzano tomato, fior di latte, basil, wood-fired.", price: 15.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: true, cuisine: "Italian", category: "Pizza", image: ITEM_IMAGES.i1 },
  { id: "i2", name: "Pizza Quattro Formaggi", description: "Mozzarella, gorgonzola, parmesan, fontina.", price: 17.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Italian", category: "Pizza", image: ITEM_IMAGES.i2 },
  { id: "i3", name: "Diavola Pizza", description: "Spicy salami, tomato, mozzarella, chili flakes.", price: 16.00, is_vegetarian: false, is_vegan: false, is_spicy: true, is_featured: false, cuisine: "Italian", category: "Pizza", image: ITEM_IMAGES.i3 },
  { id: "i4", name: "Tagliatelle al Ragù", description: "Slow ragù, egg pasta rolled fresh. Bolognese tradition.", price: 20.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Italian", category: "Pasta", image: ITEM_IMAGES.i4 },
  { id: "i5", name: "Spaghetti Carbonara", description: "Guanciale, egg, pecorino, black pepper. Roman perfection.", price: 19.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: true, cuisine: "Italian", category: "Pasta", image: ITEM_IMAGES.i5 },
  { id: "i6", name: "Pesto Genovese", description: "Basil pesto, pine nuts, parmesan, trofie pasta.", price: 18.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Italian", category: "Pasta", image: ITEM_IMAGES.i6 },
  { id: "i7", name: "Risotto ai Funghi", description: "Carnaroli rice, wild mushroom, aged parmesan.", price: 19.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Italian", category: "Risotto", image: ITEM_IMAGES.i7 },
  { id: "i8", name: "Risotto alla Milanese", description: "Saffron risotto, bone marrow, parmesan. Golden.", price: 21.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Italian", category: "Risotto", image: ITEM_IMAGES.i8 },
  { id: "i9", name: "Bruschetta Trio", description: "Tomato-basil, mushroom, white bean.", price: 11.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Italian", category: "Starters", image: ITEM_IMAGES.i9 },
  { id: "i10", name: "Caprese Salad", description: "Buffalo mozzarella, heirloom tomatoes, basil.", price: 13.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Italian", category: "Starters", image: ITEM_IMAGES.i10 },
  { id: "i11", name: "Chicken Pesto Panini", description: "Grilled chicken, pesto, mozzarella, ciabatta.", price: 13.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Italian", category: "Sandwiches", image: ITEM_IMAGES.i11 },
  { id: "d1", name: "Orange Juice", description: "Freshly squeezed Valencia oranges.", price: 5.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Fresh Juices", image: ITEM_IMAGES.d1 },
  { id: "d2", name: "Pomegranate Juice", description: "Sweet pomegranate, a Lebanese favorite.", price: 6.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Fresh Juices", image: ITEM_IMAGES.d2 },
  { id: "d3", name: "Mango Juice", description: "Alphonso mango, creamy and tropical.", price: 6.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Fresh Juices", image: ITEM_IMAGES.d3 },
  { id: "d4", name: "Lemonade", description: "Fresh lemon, mint, sugar. Classic refreshment.", price: 4.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Fresh Juices", image: ITEM_IMAGES.d4 },
  { id: "d5", name: "Avocado Smoothie", description: "Avocado, milk, honey, cardamom.", price: 7.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Smoothies", image: ITEM_IMAGES.d5 },
  { id: "d6", name: "Date Smoothie", description: "Dates, milk, vanilla, almond.", price: 7.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Smoothies", image: ITEM_IMAGES.d6 },
  { id: "d7", name: "Turkish Coffee", description: "Finely ground coffee, cardamom, served in finjan.", price: 4.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Hot Beverages", image: ITEM_IMAGES.d7 },
  { id: "d8", name: "Moroccan Tea", description: "Green tea, fresh mint, sugar.", price: 4.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Hot Beverages", image: ITEM_IMAGES.d8 },
  { id: "d9", name: "Sahlab", description: "Warm milk, orchid powder, cinnamon, nuts.", price: 5.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Hot Beverages", image: ITEM_IMAGES.d9 },
  { id: "d10", name: "Ayran", description: "Yogurt, salt, water. Refreshing and light.", price: 4.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Cold Beverages", image: ITEM_IMAGES.d10 },
  { id: "d11", name: "Soft Drink", description: "Coca-Cola, Sprite, Fanta, or Pepsi.", price: 3.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Cold Beverages", image: ITEM_IMAGES.d11 },
  { id: "d12", name: "Mineral Water", description: "Still or sparkling.", price: 2.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Cold Beverages", image: ITEM_IMAGES.d12 },
  { id: "d13", name: "Jallab", description: "Molasses, rose water, pine nuts, raisins.", price: 5.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Traditional Drinks", image: ITEM_IMAGES.d13 },
  { id: "d14", name: "Tamarind Juice", description: "Sweet and tangy, served chilled.", price: 5.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Traditional Drinks", image: ITEM_IMAGES.d14 },
  { id: "d15", name: "Chocolate Milkshake", description: "Chocolate ice cream, milk, whipped cream.", price: 7.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Drinks", category: "Milkshakes", image: ITEM_IMAGES.d15 },
  { id: "a1", name: "Château Musar Red", description: "Iconic Lebanese red, Bordeaux-style blend.", price: 65.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Lebanese Wines", image: ITEM_IMAGES.a1 },
  { id: "a2", name: "Château Musar White", description: "Lebanese white blend, age-worthy.", price: 60.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Lebanese Wines", image: ITEM_IMAGES.a2 },
  { id: "a3", name: "Domaine des Tourelles Red", description: "Organic Bekaa Valley red.", price: 45.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Lebanese Wines", image: ITEM_IMAGES.a3 },
  { id: "a4", name: "Ixsir Rose", description: "Provencal-style rose from Lebanon.", price: 35.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Lebanese Wines", image: ITEM_IMAGES.a4 },
  { id: "a5", name: "Arak Touma", description: "Triple-distilled, anise-flavored Lebanese spirit.", price: 30.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Arak", image: ITEM_IMAGES.a5 },
  { id: "a6", name: "Arak Brun", description: "Premium arak, aged in clay jars.", price: 40.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Arak", image: ITEM_IMAGES.a6 },
  { id: "a7", name: "Arak with Water & Ice", description: "Traditional preparation.", price: 12.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Arak", image: ITEM_IMAGES.a7 },
  { id: "a8", name: "Arak Sour", description: "Arak, lemon, sugar, egg white.", price: 14.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Cocktails", image: ITEM_IMAGES.a8 },
  { id: "a9", name: "Lebanese Mojito", description: "Arak, mint, lime, soda.", price: 13.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Cocktails", image: ITEM_IMAGES.a9 },
  { id: "a10", name: "Negroni", description: "Gin, campari, vermouth.", price: 14.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Cocktails", image: ITEM_IMAGES.a10 },
  { id: "a11", name: "Almaza Pilsner", description: "Lebanese classic, crisp and refreshing.", price: 6.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Beer", image: ITEM_IMAGES.a11 },
  { id: "a12", name: "961 White Ale", description: "Lebanese craft, citrus and coriander.", price: 8.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Alcoholic Beverages", category: "Beer", image: ITEM_IMAGES.a12 },
  { id: "h1", name: "Al Fakher Double Apple", description: "Classic anise and apple, sweet and aromatic.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Fruit Flavors", image: ITEM_IMAGES.h1 },
  { id: "h2", name: "Al Fakher Grape", description: "Sweet Concord grape with mint undertones.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Fruit Flavors", image: ITEM_IMAGES.h2 },
  { id: "h3", name: "Al Fakher Mango", description: "Tropical mango, rich and fruity.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Fruit Flavors", image: ITEM_IMAGES.h3 },
  { id: "h4", name: "Al Fakher Watermelon", description: "Summer watermelon, light and sweet.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Fruit Flavors", image: ITEM_IMAGES.h4 },
  { id: "h5", name: "Al Fakher Melon", description: "Sweet cantaloupe, smooth smoke.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Fruit Flavors", image: ITEM_IMAGES.h5 },
  { id: "h6", name: "Al Fakher Peach", description: "Sweet summer peach, juicy and smooth.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Fruit Flavors", image: ITEM_IMAGES.h6 },
  { id: "h7", name: "Al Fakher Mint", description: "Cool mint, refreshing classic.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Mint & Sweet", image: ITEM_IMAGES.h7 },
  { id: "h8", name: "Al Fakher Blueberry Mint", description: "Blueberry and mint, sweet and cool.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Mint & Sweet", image: ITEM_IMAGES.h8 },
  { id: "h9", name: "Starbuzz Blue Mist", description: "Blueberry and mint, the flagship flavor.", price: 18.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Mint & Sweet", image: ITEM_IMAGES.h9 },
  { id: "h10", name: "Al Fakher Cherry", description: "Sweet cherry, rich and bold.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Berry & Citrus", image: ITEM_IMAGES.h10 },
  { id: "h11", name: "Al Fakher Orange", description: "Citrus orange, bright and tangy.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Berry & Citrus", image: ITEM_IMAGES.h11 },
  { id: "h12", name: "Al Fakher Lemon Mint", description: "Lemon and mint, refreshing citrus.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Berry & Citrus", image: ITEM_IMAGES.h12 },
  { id: "h13", name: "Al Fakher Tobacco", description: "Pure tobacco, no flavoring.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Classic", image: ITEM_IMAGES.h13 },
  { id: "h14", name: "Nakhla Two Apples", description: "Traditional double apple, anise forward.", price: 18.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Classic", image: ITEM_IMAGES.h14 },
  { id: "h15", name: "Al Fakher Cappuccino", description: "Coffee and cream, smooth and aromatic.", price: 15.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Classic", image: ITEM_IMAGES.h15 },
  { id: "h16", name: "Tangiers Noir Cane Mint", description: "Intense mint, long-lasting.", price: 22.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Premium", image: ITEM_IMAGES.h16 },
  { id: "h17", name: "Fumari Ambrosia", description: "Orange, cherry, pineapple, marshmallow.", price: 20.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Premium", image: ITEM_IMAGES.h17 },
  { id: "h18", name: "Al Fakher Passion Fruit", description: "Tropical passion fruit, tangy and sweet.", price: 16.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Exotic", image: ITEM_IMAGES.h18 },
  { id: "h19", name: "Al Fakher Pomegranate", description: "Sweet pomegranate, Middle Eastern classic.", price: 16.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Chicha", category: "Exotic", image: ITEM_IMAGES.h19 },
  { id: "de1", name: "Baklava", description: "Layered phyllo, walnuts, rose water syrup.", price: 8.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: true, cuisine: "Desserts", category: "Lebanese Sweets", image: ITEM_IMAGES.de1 },
  { id: "de2", name: "Knafeh", description: "Crispy semolina, sweet cheese, orange blossom syrup.", price: 9.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Lebanese Sweets", image: ITEM_IMAGES.de2 },
  { id: "de3", name: "Maamoul", description: "Date-filled semolina cookies, aromatic and buttery.", price: 7.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Lebanese Sweets", image: ITEM_IMAGES.de3 },
  { id: "de4", name: "Atayef", description: "Stuffed pancakes with cream or nuts, fried and sweet.", price: 8.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Lebanese Sweets", image: ITEM_IMAGES.de4 },
  { id: "de5", name: "Osmaliyi", description: "Shredded phyllo, cream, pistachios, rose syrup.", price: 10.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Lebanese Sweets", image: ITEM_IMAGES.de5 },
  { id: "de6", name: "Muhallabia", description: "Rose-scented milk pudding, elegant and silky.", price: 6.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Lebanese Sweets", image: ITEM_IMAGES.de6 },
  { id: "de7", name: "Basbousa", description: "Semolina cake, almond, coconut, syrup.", price: 6.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Oriental Sweets", image: ITEM_IMAGES.de7 },
  { id: "de8", name: "Luqmat al Qadi", description: "Fried dough balls, rose syrup, sesame.", price: 6.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Oriental Sweets", image: ITEM_IMAGES.de8 },
  { id: "de9", name: "Halawet el Jibn", description: "Sweet cheese rolls, cream filling, pistachio.", price: 8.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Oriental Sweets", image: ITEM_IMAGES.de9 },
  { id: "de10", name: "Mango Pudding", description: "Silky mango, cream, and gelatin.", price: 7.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Chinese Sweets", image: ITEM_IMAGES.de10 },
  { id: "de11", name: "Red Bean Soup", description: "Sweet red bean, tangyuan in syrup.", price: 6.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Chinese Sweets", image: ITEM_IMAGES.de11 },
  { id: "de12", name: "Sesame Balls", description: "Crispy fried dough, sweet red bean filling.", price: 6.00, is_vegetarian: true, is_vegan: true, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Chinese Sweets", image: ITEM_IMAGES.de12 },
  { id: "de13", name: "Egg Tart", description: "Flaky pastry, custard filling, caramelized top.", price: 5.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Chinese Sweets", image: ITEM_IMAGES.de13 },
  { id: "de14", name: "Tiramisu", description: "Espresso, mascarpone, cocoa. Classic Italian.", price: 9.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: true, cuisine: "Desserts", category: "Italian Sweets", image: ITEM_IMAGES.de14 },
  { id: "de15", name: "Panna Cotta", description: "Vanilla cream, berry compote. Silky and elegant.", price: 8.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Italian Sweets", image: ITEM_IMAGES.de15 },
  { id: "de16", name: "Cannoli", description: "Crisp shells, sweet ricotta, chocolate chips.", price: 8.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Italian Sweets", image: ITEM_IMAGES.de16 },
  { id: "de17", name: "Affogato", description: "Vanilla gelato drowned in espresso.", price: 7.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Italian Sweets", image: ITEM_IMAGES.de17 },
  { id: "de18", name: "Gelato Trio", description: "Three scoops: chocolate, pistachio, strawberry.", price: 7.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Italian Sweets", image: ITEM_IMAGES.de18 },
  { id: "de19", name: "Vanilla Bean", description: "Madagascar vanilla, creamy and classic.", price: 5.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Ice Cream", image: ITEM_IMAGES.de19 },
  { id: "de20", name: "Chocolate", description: "Rich Belgian chocolate, dense and indulgent.", price: 5.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Ice Cream", image: ITEM_IMAGES.de20 },
  { id: "de21", name: "Pistachio", description: "Sicilian pistachio, nutty and luxurious.", price: 6.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Ice Cream", image: ITEM_IMAGES.de21 },
  { id: "de22", name: "Croissant", description: "Buttery, flaky, French classic.", price: 4.00, is_vegetarian: true, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Pastries", image: ITEM_IMAGES.de22 },
  { id: "de23", name: "Éclair", description: "Choux pastry, chocolate filling, glazed.", price: 6.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Pastries", image: ITEM_IMAGES.de23 },
  { id: "de24", name: "Fruit Tart", description: "Pastry cream, fresh fruits, glazed.", price: 7.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Pastries", image: ITEM_IMAGES.de24 },
  { id: "de25", name: "Cheesecake", description: "New York style, creamy and rich.", price: 8.00, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Desserts", category: "Pastries", image: ITEM_IMAGES.de25 },
];

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(DEFAULT_ITEMS);
  const [editing, setEditing] = useState<MenuItem | "new" | null>(null);
  const [search, setSearch] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [expandedCuisine, setExpandedCuisine] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const saveToStorage = (newItems: MenuItem[]) => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      setItems(newItems);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleSave = (item: MenuItem) => {
    if (editing === "new") {
      const newItem = { ...item, id: `custom_${Date.now()}` };
      saveToStorage([...items, newItem]);
    } else {
      saveToStorage(items.map((i) => (i.id === item.id ? item : i)));
    }
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      saveToStorage(items.filter((i) => i.id !== id));
    }
  };

  const handleReset = () => {
    if (confirm("Reset all changes to default menu?")) {
      saveToStorage(DEFAULT_ITEMS);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-paper" />;
  }

  const filtered = items.filter((item) => {
    if (filterCuisine !== "All" && item.cuisine !== filterCuisine) return false;
    if (search && !`${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const grouped: Record<string, MenuItem[]> = {};
  CUISINES.forEach((c) => {
    const cuisineItems = filtered.filter((i) => i.cuisine === c);
    if (cuisineItems.length > 0) {
      grouped[c] = cuisineItems;
    }
  });

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="bg-ink text-parchment py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl">Menu Management</h1>
              <p className="text-sm text-parchment/60 mt-1">Add, edit, and organize your menu items</p>
            </div>
            <div className="flex items-center gap-3">
              {saved && (
                <span className="text-xs text-olive bg-olive/10 px-3 py-1 rounded">Saved!</span>
              )}
              <button
                onClick={handleReset}
                className="text-xs text-parchment/60 border border-parchment/20 px-3 py-2 hover:bg-parchment/10 transition-colors"
              >
                Reset to Default
              </button>
              <button
                onClick={() => setEditing("new")}
                className="flex items-center gap-2 px-4 py-2 bg-saffron text-ink text-sm hover:bg-saffronLight transition-colors"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-stone/10 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] border border-stone/20 px-3 py-2">
            <Search size={16} className="text-stone" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className="text-sm outline-none w-full bg-transparent"
            />
          </div>
          <select
            value={filterCuisine}
            onChange={(e) => setFilterCuisine(e.target.value)}
            className="text-sm border border-stone/20 px-3 py-2 bg-white"
          >
            <option value="All">All Cuisines</option>
            {CUISINES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="text-sm text-stone">
            {items.length} total items
          </span>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-ink text-parchment px-6 py-4 flex items-center justify-between">
              <h2 className="font-display text-lg">
                {editing === "new" ? "Add New Item" : "Edit Item"}
              </h2>
              <button onClick={() => setEditing(null)} className="p-1 hover:bg-parchment/10">
                <X size={20} />
              </button>
            </div>
            <ItemForm
              item={editing === "new" ? {
                id: "",
                name: "",
                description: "",
                price: 0,
                is_vegetarian: false,
                is_vegan: false,
                is_spicy: false,
                is_featured: false,
                cuisine: "Lebanese",
                category: "Mezze",
              } : editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {Object.entries(grouped).map(([cuisine, cuisineItems]) => (
          <div key={cuisine} className="mb-8">
            <button
              onClick={() => setExpandedCuisine(expandedCuisine === cuisine ? null : cuisine)}
              className="w-full flex items-center justify-between py-4 border-b border-stone/20 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {CUISINES.indexOf(cuisine) === 0 ? "🌿" : CUISINES.indexOf(cuisine) === 1 ? "🔥" : CUISINES.indexOf(cuisine) === 2 ? "🥢" : CUISINES.indexOf(cuisine) === 3 ? "🍝" : CUISINES.indexOf(cuisine) === 4 ? "🥙" : CUISINES.indexOf(cuisine) === 5 ? "🥤" : CUISINES.indexOf(cuisine) === 6 ? "🍷" : CUISINES.indexOf(cuisine) === 7 ? "💨" : "🍰"}
                </span>
                <h2 className="font-display text-xl text-ink">{cuisine}</h2>
                <span className="text-sm text-stone">({cuisineItems.length} items)</span>
              </div>
              {expandedCuisine === cuisine ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {(expandedCuisine === cuisine || expandedCuisine === null) && (
              <div className="mt-4 space-y-2">
                {cuisineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white border border-stone/10 p-4 hover:border-saffron/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-ink truncate">{item.name}</h3>
                          {item.is_featured && (
                            <span className="text-[10px] px-2 py-0.5 bg-saffron/10 text-saffron">Featured</span>
                          )}
                          {item.is_vegetarian && (
                            <span className="text-[10px] px-2 py-0.5 bg-olive/10 text-olive">Veg</span>
                          )}
                          {item.is_spicy && (
                            <span className="text-[10px] px-2 py-0.5 bg-clay/10 text-clay">Spicy</span>
                          )}
                        </div>
                        <p className="text-sm text-stone truncate">{item.description}</p>
                        <p className="text-xs text-stone/60 mt-1">{item.category} • ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setEditing(item)}
                        className="p-2 text-stone hover:text-ink hover:bg-stone/5 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-stone hover:text-clay hover:bg-clay/5 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemForm({ item, onSave, onCancel }: { item: MenuItem; onSave: (item: MenuItem) => void; onCancel: () => void }) {
  const [form, setForm] = useState<MenuItem>(item);

  const update = (field: keyof MenuItem, value: string | number | boolean) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(form); }}
      className="p-6 space-y-4"
    >
      <div>
        <label className="text-sm text-stone">Name *</label>
        <input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm"
        />
      </div>
      <div>
        <label className="text-sm text-stone">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={2}
          className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm resize-none"
        />
      </div>
      <div>
        <label className="text-sm text-stone">Image URL</label>
        <input
          value={form.image || ""}
          onChange={(e) => update("image", e.target.value)}
          placeholder="https://..."
          className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-stone">Cuisine *</label>
          <select
            value={form.cuisine}
            onChange={(e) => {
              const newCuisine = e.target.value;
              update("cuisine", newCuisine);
              update("category", CATEGORIES[newCuisine]?.[0] || "");
            }}
            className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm bg-white"
          >
            {CUISINES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-stone">Category *</label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm bg-white"
          >
            {(CATEGORIES[form.cuisine] || []).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm text-stone">Price ($) *</label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={form.price}
          onChange={(e) => update("price", parseFloat(e.target.value) || 0)}
          className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_vegetarian} onChange={(e) => update("is_vegetarian", e.target.checked)} />
          Vegetarian
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_vegan} onChange={(e) => update("is_vegan", e.target.checked)} />
          Vegan
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_spicy} onChange={(e) => update("is_spicy", e.target.checked)} />
          Spicy
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => update("is_featured", e.target.checked)} />
          Featured
        </label>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 bg-ink text-parchment text-sm hover:bg-charcoal transition-colors"
        >
          <Save size={16} /> Save Item
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-stone/20 text-sm hover:bg-stone/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
