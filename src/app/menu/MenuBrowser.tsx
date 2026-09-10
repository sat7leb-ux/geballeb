"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Leaf, Flame, Star } from "lucide-react";
import CuisineSwatch from "@/components/CuisineSwatch";
import type { MenuItem } from "@/lib/menu-data";

const CUISINES = [
  { name: "Lebanese", icon: "🌿", tagline: "The table our family built", description: "Recipes unchanged in three generations.", bgGradient: "from-amber-50 to-orange-50", pattern: "cedar" },
  { name: "Oriental", icon: "🔥", tagline: "Grills, mezze, and slow-cooked rice", description: "Aromatic spices and charcoal grills.", bgGradient: "from-emerald-50 to-green-50", pattern: "arabesque" },
  { name: "Chinese", icon: "🥢", tagline: "Wok-fired classics", description: "High-heat wok cooking, hand-folded dumplings.", bgGradient: "from-red-50 to-rose-50", pattern: "dragon" },
  { name: "Italian", icon: "🍝", tagline: "Pasta and pizza, no shortcuts", description: "Fresh-rolled pasta, wood-fired pizza.", bgGradient: "from-green-50 to-emerald-50", pattern: "vine" },
  { name: "Sandwiches", icon: "🥙", tagline: "Wraps and handheld feasts", description: "From shawarma to panini.", bgGradient: "from-yellow-50 to-amber-50", pattern: "geometric" },
  { name: "Drinks", icon: "🥤", tagline: "Refreshment for every mood", description: "Fresh juices, smoothies, hot beverages.", bgGradient: "from-blue-50 to-cyan-50", pattern: "waves" },
  { name: "Alcoholic Beverages", icon: "🍷", tagline: "Wine, arak, cocktails", description: "Lebanese wines and premium arak.", bgGradient: "from-purple-50 to-rose-50", pattern: "grapes" },
  { name: "Chicha", icon: "💨", tagline: "Hookah and shisha", description: "Premium shisha tobacco.", bgGradient: "from-gray-50 to-slate-50", pattern: "smoke" },
  { name: "Desserts", icon: "🍰", tagline: "Sweet endings", description: "Baklava, tiramisu, knafeh.", bgGradient: "from-pink-50 to-rose-50", pattern: "sweet" },
];

function getPattern(pattern: string): string {
  const patterns: Record<string, string> = {
    cedar: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 55 L5 55 Z' fill='none' stroke='%23C4944A' stroke-width='1'/%3E%3C/svg%3E")`,
    arabesque: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%235C6B4F' stroke-width='1'/%3E%3C/svg%3E")`,
    dragon: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 30 Q30 10 50 30 Q30 50 10 30' fill='none' stroke='%238B2E2E' stroke-width='1'/%3E%3C/svg%3E")`,
    vine: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 50 Q30 10 50 50' fill='none' stroke='%233D5A45' stroke-width='1'/%3E%3C/svg%3E")`,
    geometric: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10' y='10' width='40' height='40' fill='none' stroke='%23B8860B' stroke-width='1' transform='rotate(45 30 30)'/%3E%3C/svg%3E")`,
    waves: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q15 10 30 30 Q45 50 60 30' fill='none' stroke='%234682B4' stroke-width='1'/%3E%3C/svg%3E")`,
    grapes: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='20' r='8' fill='none' stroke='%237B2D8E' stroke-width='1'/%3E%3Ccircle cx='20' cy='40' r='8' fill='none' stroke='%237B2D8E' stroke-width='1'/%3E%3C/svg%3E")`,
    smoke: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 50 Q20 30 30 10 Q40 30 30 50' fill='none' stroke='%235A5A5A' stroke-width='1'/%3E%3C/svg%3E")`,
    sweet: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='15' fill='none' stroke='%23C71585' stroke-width='1'/%3E%3C/svg%3E")`,
  };
  return patterns[pattern] || "none";
}

export default function MenuBrowser({ items }: { items: MenuItem[] }) {
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [query, setQuery] = useState("");
  const [dietOnly, setDietOnly] = useState<"veg" | "vegan" | null>(null);

  // Compute counts per cuisine directly from items
  const cuisineCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      counts[item.cuisine] = (counts[item.cuisine] || 0) + 1;
    });
    return counts;
  }, [items]);

  // Filter items based on active cuisine, search, and dietary filters
  const filtered = useMemo(() => {
    return items.filter((m) => {
      if (activeCuisine !== "All" && m.cuisine !== activeCuisine) return false;
      if (dietOnly === "veg" && !m.is_vegetarian) return false;
      if (dietOnly === "vegan" && !m.is_vegan) return false;
      if (query && !`${m.name} ${m.description}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [items, activeCuisine, query, dietOnly]);

  // Group filtered items by cuisine
  const groupedItems = useMemo(() => {
    const grouped: Record<string, MenuItem[]> = {};
    CUISINES.forEach((c) => {
      const cuisineItems = filtered.filter((i) => i.cuisine === c.name);
      if (cuisineItems.length > 0) {
        grouped[c.name] = cuisineItems;
      }
    });
    return grouped;
  }, [filtered]);

  const featuredItem = items.find((i) => i.is_featured) || items[0];

  return (
    <div>
      {/* Menu Hero */}
      <section className="bg-ink text-parchment py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-saffron/20 via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-saffron" />
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">The Menu</span>
            </div>
            <h1 className="font-display text-display-lg text-parchment">
              Four kitchens, one table
            </h1>
            <p className="text-lg text-parchment/60 mt-6 leading-relaxed">
              From the charcoal grill to the wok, from fresh pasta to hand-folded dumplings — 
              every dish is prepared with the same care and respect for tradition.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Dish */}
      {featuredItem && (
        <section className="bg-paper py-12 border-b border-stone/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex items-center gap-3 mb-6">
              <Star size={16} className="text-saffron" />
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">Chef's Pick</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white border border-stone/20 overflow-hidden">
              <div className="aspect-square md:aspect-auto md:h-80">
                <CuisineSwatch cuisine={featuredItem.cuisine} className="w-full h-full" image={featuredItem.image} />
              </div>
              <div className="p-8">
                <div className="text-xs text-rust tracking-wide uppercase mb-2">{featuredItem.cuisine}</div>
                <h2 className="font-display text-3xl text-ink">{featuredItem.name}</h2>
                <p className="text-2xl text-saffron mt-3 font-display">${Number(featuredItem.price).toFixed(2)}</p>
                <p className="text-stone leading-relaxed mt-4">{featuredItem.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {featuredItem.is_vegetarian && (
                    <span className="text-xs px-3 py-1 border border-olive/30 text-olive flex items-center gap-1.5">
                      <Leaf size={12} /> Vegetarian
                    </span>
                  )}
                  {featuredItem.is_spicy && (
                    <span className="text-xs px-3 py-1 border border-clay/30 text-clay flex items-center gap-1.5">
                      <Flame size={12} /> Spicy
                    </span>
                  )}
                </div>
                <Link href={`/menu/${featuredItem.id}`} className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-ink text-parchment text-sm hover:bg-charcoal transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cuisine Navigator */}
      <section className="bg-paper py-12 border-b border-stone/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2 className="text-xs text-saffron tracking-[0.2em] uppercase mb-6">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CUISINES.map((cuisine) => {
              const isActive = activeCuisine === cuisine.name;
              const count = cuisineCounts[cuisine.name] || 0;
              return (
                <button
                  key={cuisine.name}
                  onClick={() => setActiveCuisine(isActive ? "All" : cuisine.name)}
                  className={`group relative p-5 text-left transition-all duration-500 ${
                    isActive
                      ? "bg-ink text-parchment shadow-xl"
                      : "bg-white border border-stone/20 hover:border-saffron/30 hover:shadow-lg"
                  }`}
                >
                  <div className="text-3xl mb-3">{cuisine.icon}</div>
                  <h3 className={`font-display text-lg leading-tight ${isActive ? "text-parchment" : "text-ink"}`}>
                    {cuisine.name}
                  </h3>
                  <p className={`text-xs mt-1 ${isActive ? "text-parchment/60" : "text-stone"}`}>
                    {cuisine.tagline}
                  </p>
                  <div className={`mt-3 text-xs ${isActive ? "text-saffron" : "text-stone"}`}>
                    {count} items
                  </div>
                  {isActive && (
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-saffron" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-paper py-8 border-b border-stone/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-[240px] border border-ink/20 px-4 py-3 bg-white">
              <Search size={16} className="text-stone" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes, drinks, desserts…"
                className="text-sm outline-none w-full bg-transparent"
              />
            </div>
            <button
              onClick={() => setDietOnly(dietOnly === "veg" ? null : "veg")}
              className={`text-xs px-4 py-3 border transition-all duration-300 flex items-center gap-2 ${
                dietOnly === "veg"
                  ? "bg-olive/10 border-olive/40 text-olive"
                  : "border-olive/30 text-olive hover:bg-olive/5 bg-white"
              }`}
            >
              <Leaf size={14} /> Vegetarian
            </button>
            <button
              onClick={() => setDietOnly(dietOnly === "vegan" ? null : "vegan")}
              className={`text-xs px-4 py-3 border transition-all duration-300 flex items-center gap-2 ${
                dietOnly === "vegan"
                  ? "bg-olive/10 border-olive/40 text-olive"
                  : "border-olive/30 text-olive hover:bg-olive/5 bg-white"
              }`}
            >
              <Leaf size={14} /> Vegan
            </button>
          </div>
        </div>
      </section>

      {/* Menu Items by Cuisine */}
      <section className="bg-paper pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {activeCuisine === "All" ? (
            <div className="space-y-16">
              {CUISINES.map((cuisine) => {
                const cuisineItems = groupedItems[cuisine.name] || [];
                if (cuisineItems.length === 0) return null;
                return (
                  <div key={cuisine.name}>
                    <div className={`relative mb-8 p-8 bg-gradient-to-r ${cuisine.bgGradient} border border-stone/10 overflow-hidden`}>
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{ backgroundImage: getPattern(cuisine.pattern), backgroundSize: "60px 60px" }} />
                      </div>
                      <div className="relative flex items-center gap-6">
                        <div className="text-6xl">{cuisine.icon}</div>
                        <div className="flex-1">
                          <h2 className="font-display text-3xl text-ink">{cuisine.name}</h2>
                          <p className="text-stone mt-1">{cuisine.description}</p>
                        </div>
                        <div className="text-sm text-stone/60">{cuisineItems.length} dishes</div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cuisineItems.map((d) => (
                        <DishCard key={d.id} dish={d} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="mb-10">
                <div className="text-5xl mb-4">{CUISINES.find((c) => c.name === activeCuisine)?.icon}</div>
                <h2 className="font-display text-3xl text-ink">{activeCuisine}</h2>
                <p className="text-stone mt-2">{CUISINES.find((c) => c.name === activeCuisine)?.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(groupedItems[activeCuisine] || []).map((d) => (
                  <DishCard key={d.id} dish={d} />
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <Star size={48} className="text-stone/30 mx-auto mb-4" />
              <p className="text-stone text-lg">No items found</p>
              <p className="text-stone/60 text-sm mt-2">Try a different search or filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function DishCard({ dish }: { dish: MenuItem }) {
  return (
    <Link
      href={`/menu/${dish.id}`}
      className="group block bg-white border border-stone/10 hover:border-saffron/30 hover:shadow-lg transition-all duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <CuisineSwatch
          cuisine={dish.cuisine}
          className="w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-luxury"
          image={dish.image}
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg text-ink group-hover:text-saffron transition-colors duration-300">
            {dish.name}
          </h3>
          <span className="text-sm text-saffron whitespace-nowrap font-medium">
            ${Number(dish.price).toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-stone mt-2 leading-relaxed line-clamp-2">{dish.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {dish.is_vegetarian && (
            <span className="text-[10px] px-2 py-0.5 border border-olive/30 text-olive flex items-center gap-1">
              <Leaf size={9} /> Veg
            </span>
          )}
          {dish.is_spicy && (
            <span className="text-[10px] px-2 py-0.5 border border-clay/30 text-clay flex items-center gap-1">
              <Flame size={9} /> Spicy
            </span>
          )}
          {dish.is_featured && (
            <span className="text-[10px] px-2 py-0.5 border border-saffron/30 text-saffron flex items-center gap-1">
              <Star size={9} /> Featured
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
