"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ReservationStatus } from "@/lib/types";

export async function setReservationStatus(id: string, status: ReservationStatus) {
  const supabase = createClient();
  await supabase.from("reservations").update({ status }).eq("id", id);
  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
}
