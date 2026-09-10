"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Leaf, Flame } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CuisineSwatch from "@/components/CuisineSwatch";
import { MENU_ITEMS } from "@/lib/menu-data";
import type { MenuItem } from "@/lib/menu-data";

const STORAGE_KEY = "gebal_menu_items";

export default function DishDetail({ dish: initialDish, related: initialRelated }: { dish: MenuItem; related: MenuItem[] }) {
  const [dish, setDish] = useState(initialDish);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for updated dish data
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const found = parsed.find((item: MenuItem) => item.id === initialDish.id);
          if (found) {
            setDish(found);
          }
        }
      }
    } catch {
      // ignore
    }
  }, [initialDish.id]);

  return (
    <>
      <Header />
      <div className="pt-24 pb-8 bg-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Link href="/menu" className="inline-flex items-center gap-2 text-sm text-stone hover:text-ink transition-colors duration-300">
            <ArrowLeft size={14} /> Back to menu
          </Link>
        </div>
      </div>

      <section className="pb-20 bg-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="max-h-[500px] overflow-hidden flex items-center justify-center">
              <CuisineSwatch cuisine={dish.cuisine} className="max-h-[500px] w-auto object-contain" image={dish.image} />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">{dish.cuisine}</span>
              <h1 className="font-display text-display-sm text-ink mt-4">{dish.name}</h1>
              <p className="text-2xl text-saffron mt-4 font-display">${Number(dish.price).toFixed(2)}</p>
              <p className="text-stone leading-relaxed mt-6">{dish.description}</p>

              <div className="flex flex-wrap gap-2 mt-6">
                {dish.is_vegetarian && (
                  <span className="text-xs px-3 py-1 border border-olive/30 text-olive flex items-center gap-1.5">
                    <Leaf size={12} /> Vegetarian
                  </span>
                )}
                {dish.is_spicy && (
                  <span className="text-xs px-3 py-1 border border-clay/30 text-clay flex items-center gap-1.5">
                    <Flame size={12} /> Spicy
                  </span>
                )}
              </div>
            </div>
          </div>

          {initialRelated.length > 0 && (
            <div className="mt-20 pt-12 border-t border-stone/20">
              <h2 className="font-display text-2xl text-ink mb-8">More {dish.cuisine}</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {initialRelated.map((r) => (
                  <Link key={r.id} href={`/menu/${r.id}`} className="group block">
                    <div className="aspect-square overflow-hidden">
                      <CuisineSwatch cuisine={r.cuisine} className="w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-luxury" image={r.image} />
                    </div>
                    <p className="text-sm text-ink mt-3 group-hover:text-saffron transition-colors duration-300">{r.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
