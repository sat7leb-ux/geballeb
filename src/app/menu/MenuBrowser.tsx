"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Leaf, Flame, Star } from "lucide-react";
import CuisineSwatch from "@/components/CuisineSwatch";

type Item = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_spicy: boolean;
  is_featured: boolean;
  cuisines: { name: string } | null;
};

export default function MenuBrowser({ items, cuisineNames }: { items: Item[]; cuisineNames: string[] }) {
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [dietOnly, setDietOnly] = useState<"veg" | "vegan" | null>(null);

  const filtered = useMemo(() => {
    return items.filter((m) => {
      if (cuisineFilter !== "All" && m.cuisines?.name !== cuisineFilter) return false;
      if (dietOnly === "veg" && !m.is_vegetarian) return false;
      if (dietOnly === "vegan" && !m.is_vegan) return false;
      if (query && !`${m.name} ${m.description ?? ""}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [items, cuisineFilter, query, dietOnly]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["All", ...cuisineNames].map((c) => (
          <button
            key={c}
            onClick={() => setCuisineFilter(c)}
            className={`text-xs px-4 py-2 border transition-all duration-300 ${
              cuisineFilter === c
                ? "bg-ink text-parchment border-ink"
                : "border-ink/20 text-ink hover:border-ink/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Search & Diet */}
      <div className="flex flex-wrap gap-3 mt-4 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] border border-ink/20 px-4 py-2.5">
          <Search size={14} className="text-stone" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes…"
            className="text-sm outline-none w-full bg-transparent"
          />
        </div>
        <button
          onClick={() => setDietOnly(dietOnly === "veg" ? null : "veg")}
          className={`text-xs px-4 py-2.5 border transition-all duration-300 ${
            dietOnly === "veg"
              ? "bg-olive/10 border-olive/40 text-olive"
              : "border-olive/30 text-olive hover:bg-olive/5"
          }`}
        >
          Vegetarian
        </button>
        <button
          onClick={() => setDietOnly(dietOnly === "vegan" ? null : "vegan")}
          className={`text-xs px-4 py-2.5 border transition-all duration-300 ${
            dietOnly === "vegan"
              ? "bg-olive/10 border-olive/40 text-olive"
              : "border-olive/30 text-olive hover:bg-olive/5"
          }`}
        >
          Vegan
        </button>
      </div>

      {/* Menu Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filtered.map((d) => (
          <Link
            key={d.id}
            href={`/menu/${d.id}`}
            className="group block card-hover bg-white border border-stone/10"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <CuisineSwatch
                cuisine={d.cuisines?.name ?? ""}
                className="w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-luxury"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg text-ink group-hover:text-saffron transition-colors duration-300">
                  {d.name}
                </h3>
                <span className="text-sm text-saffron whitespace-nowrap font-medium">
                  ${Number(d.price).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-stone mt-2 leading-relaxed line-clamp-2">
                {d.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {d.is_vegetarian && (
                  <span className="text-[10px] px-2 py-0.5 border border-olive/30 text-olive flex items-center gap-1">
                    <Leaf size={9} /> Veg
                  </span>
                )}
                {d.is_spicy && (
                  <span className="text-[10px] px-2 py-0.5 border border-clay/30 text-clay flex items-center gap-1">
                    <Flame size={9} /> Spicy
                  </span>
                )}
                {d.is_featured && (
                  <span className="text-[10px] px-2 py-0.5 border border-saffron/30 text-saffron flex items-center gap-1">
                    <Star size={9} /> Featured
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center text-sm text-stone">
            Nothing matches that search. Try a different cuisine or clear the filters.
          </div>
        )}
      </div>
    </div>
  );
}
