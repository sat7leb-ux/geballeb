import MenuTable from "./MenuTable";
import { createClient } from "@/lib/supabase/server";

export default async function AdminMenuPage() {
  const supabase = createClient();
  const [{ data: items }, { data: cuisines }] = await Promise.all([
    supabase.from("menu_items").select("*, cuisines(name)").order("name"),
    supabase.from("cuisines").select("id, name").order("sort_order"),
  ]);

  return <MenuTable items={(items as any) ?? []} cuisines={cuisines ?? []} />;
}
