"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Server actions run with the signed-in user's session, so RLS policy
// "menu_items: staff write/update/delete" (0002_rls.sql) applies — a
// non-staff session will simply have these calls rejected by Postgres.

export async function upsertMenuItem(formData: FormData) {
  const supabase = createClient();
  const id = formData.get("id") as string | null;

  const payload = {
    name: formData.get("name") as string,
    cuisine_id: formData.get("cuisine_id") as string,
    category_id: (formData.get("category_id") as string) || null,
    price: Number(formData.get("price")),
    description: formData.get("description") as string,
    ingredients: formData.get("ingredients") as string,
    allergens: formData.get("allergens") as string,
    is_vegetarian: formData.get("is_vegetarian") === "on",
    is_vegan: formData.get("is_vegan") === "on",
    is_spicy: formData.get("is_spicy") === "on",
    is_featured: formData.get("is_featured") === "on",
    is_available: formData.get("is_available") === "on",
  };

  if (id) {
    await supabase.from("menu_items").update(payload).eq("id", id);
  } else {
    await supabase.from("menu_items").insert(payload);
  }
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function deleteMenuItem(id: string) {
  const supabase = createClient();
  await supabase.from("menu_items").delete().eq("id", id);
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}
