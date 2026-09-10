"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuBrowser from "./MenuBrowser";
import { MENU_ITEMS } from "@/lib/menu-data";

const STORAGE_KEY = "gebal_menu_items";

export default function MenuPage() {
  const [items, setItems] = useState(MENU_ITEMS);

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
        // ignore parse errors
      }
    };

    loadItems();
    window.addEventListener("storage", loadItems);
    return () => window.removeEventListener("storage", loadItems);
  }, []);

  return (
    <>
      <Header />
      <MenuBrowser items={items} />
      <Footer />
    </>
  );
}
