"use client";

import { useState, useEffect } from "react";
import { MENU_ITEMS } from "@/lib/menu-data";
import type { MenuItem } from "@/lib/menu-data";

const STORAGE_KEY = "gebal_menu_items";

export default function MenuPageClient({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);

  useEffect(() => {
    const loadItems = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed);
          }
        }
      } catch {
        // ignore
      }
    };

    loadItems();
    window.addEventListener("storage", loadItems);
    return () => window.removeEventListener("storage", loadItems);
  }, []);

  // Clone children and pass items prop
  return (
    <>
      {Array.isArray(children)
        ? children.map((child, i) =>
            child && typeof child === "object" && "type" in child
              ? { ...child, props: { ...(child as any).props, items } }
              : child
          )
        : children}
    </>
  );
}
