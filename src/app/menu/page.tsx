"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuBrowser from "./MenuBrowser";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_spicy: boolean;
  is_featured: boolean;
  cuisine_id: string;
  category_id: string;
  image?: string;
  cuisine: string;
  category: string;
}

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      if (data.menuItems) {
        setItems(data.menuItems);
      }
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-paper flex items-center justify-center">
          <p className="text-stone text-sm">Loading menu...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <MenuBrowser items={items} />
      <Footer />
    </>
  );
}
