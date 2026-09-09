import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  const staticRoutes = ["", "/menu", "/about", "/gallery", "/reservations", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  try {
    const supabase = createClient();
    const { data: items } = await supabase.from("menu_items").select("id").eq("is_available", true);
    
    const dishRoutes = (items as any[] ?? []).map((i: any) => ({
      url: `${base}/menu/${i.id}`,
      lastModified: new Date(),
    }));

    return [...staticRoutes, ...dishRoutes];
  } catch {
    return staticRoutes;
  }
}
