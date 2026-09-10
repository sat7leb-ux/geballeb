"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GalleryItem {
  id: string;
  src: string;
  category: string;
  caption: string;
  size: string;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  { id: "g1", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=800&fit=crop", category: "Interior", caption: "The dining room at dusk", size: "large" },
  { id: "g2", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop", category: "Food", caption: "Charcoal grill at work", size: "wide" },
  { id: "g3", src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop", category: "Ambiance", caption: "Terrace seating", size: "small" },
  { id: "g4", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=600&fit=crop", category: "Food", caption: "Mixed grill platter", size: "tall" },
  { id: "g5", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop", category: "Behind the Scenes", caption: "Chef preparing mezze", size: "wide" },
  { id: "g6", src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=800&fit=crop", category: "Bar", caption: "Cocktails & spirits", size: "large" },
  { id: "g7", src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop", category: "Food", caption: "Fresh hummus", size: "small" },
  { id: "g8", src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop", category: "Food", caption: "Wood-fired pizza", size: "small" },
  { id: "g9", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=600&fit=crop", category: "Interior", caption: "Main dining area", size: "tall" },
  { id: "g10", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop", category: "Ambiance", caption: "Evening atmosphere", size: "wide" },
  { id: "g11", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop", category: "Food", caption: "Signature dish", size: "small" },
  { id: "g12", src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=800&fit=crop", category: "Behind the Scenes", caption: "Kitchen at service", size: "large" },
];

const CATEGORIES = ["All", "Interior", "Food", "Ambiance", "Bar", "Behind the Scenes"];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("gebal_gallery");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // Use defaults
      }
    }
  }, []);

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setVisibleItems((prev) => [...new Set([...prev, id])]);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    itemRefs.current.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [filteredItems]);

  const setItemRef = (el: HTMLDivElement | null, id: string) => {
    if (el) {
      itemRefs.current.set(id, el);
    }
  };

  const getGridClass = (size: string) => {
    switch (size) {
      case "large": return "sm:col-span-2 sm:row-span-2 aspect-square";
      case "wide": return "sm:col-span-2 aspect-[2/1]";
      case "tall": return "sm:row-span-2 aspect-[1/1] sm:aspect-auto";
      default: return "aspect-square";
    }
  };

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-ink text-parchment">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-saffron" />
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">Gallery</span>
            </div>
            <h1 className="font-display text-display-lg text-parchment">
              Around the restaurant
            </h1>
            <p className="text-lg text-parchment/60 mt-6 leading-relaxed">
              From the charcoal grill to the wok, from fresh pasta to hand-folded dumplings — 
              every corner tells a story.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-paper border-b border-stone/10 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap text-xs px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-ink text-parchment"
                    : "bg-white border border-stone/20 text-stone hover:border-saffron/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] sm:auto-rows-[250px]">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => setItemRef(el, item.id)}
                data-id={item.id}
                className={`group relative overflow-hidden rounded-sm cursor-pointer transition-all duration-700 ${getGridClass(item.size)} ${
                  visibleItems.includes(item.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setLightboxId(item.id)}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                    hoveredId === item.id ? "scale-110" : "scale-100"
                  }`}
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-opacity duration-500 ${
                  hoveredId === item.id ? "opacity-100" : "opacity-60"
                }`} />
                
                {/* Category Badge */}
                <div className={`absolute top-3 left-3 transition-all duration-500 ${
                  hoveredId === item.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}>
                  <span className="text-[10px] px-2 py-1 bg-saffron/90 text-ink rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                
                {/* Caption */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
                  hoveredId === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <p className="text-sm text-parchment font-medium">{item.caption}</p>
                  <p className="text-xs text-parchment/60 mt-1">Tap to view</p>
                </div>

                {/* Expand Icon */}
                <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                  hoveredId === item.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}>
                  <svg className="w-4 h-4 text-parchment" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxId && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-4"
          onClick={() => setLightboxId(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setLightboxId(null)}
          >
            <svg className="w-6 h-6 text-parchment" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {(() => {
            const item = items.find((i) => i.id === lightboxId);
            if (!item) return null;
            return (
              <div className="max-w-4xl max-h-[80vh] relative" onClick={(e) => e.stopPropagation()}>
                <img
                  src={item.src}
                  alt={item.caption}
                  className="max-w-full max-h-[80vh] object-contain rounded-sm"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/80 to-transparent">
                  <span className="text-xs text-saffron uppercase tracking-wider">{item.category}</span>
                  <p className="text-lg text-parchment mt-1">{item.caption}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Stats Section */}
      <section className="bg-ink text-parchment py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-display text-4xl text-saffron">4</div>
              <div className="text-sm text-parchment/60 mt-1">Cuisines</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl text-saffron">50+</div>
              <div className="text-sm text-parchment/60 mt-1">Dishes</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl text-saffron">3</div>
              <div className="text-sm text-parchment/60 mt-1">Dining Rooms</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl text-saffron">1</div>
              <div className="text-sm text-parchment/60 mt-1">Terrace</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
