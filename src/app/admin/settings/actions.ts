"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSettings(formData: FormData) {
  const supabase = createClient();
  await supabase
    .from("restaurant_settings")
    .update({
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      opening_hours: formData.get("opening_hours") as string,
    })
    .eq("id", 1);
  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");
}
