import { createClient } from "@/lib/supabase/server";
import type { Reservation } from "@/lib/types";

export default async function AdminOverviewPage() {
  const supabase = createClient();
  const [{ count: menuCount }, { count: featuredCount }, { data: reservations }] = await Promise.all([
    supabase.from("menu_items").select("*", { count: "exact", head: true }),
    supabase.from("menu_items").select("*", { count: "exact", head: true }).eq("is_featured", true),
    supabase.from("reservations").select("*").order("created_at", { ascending: false }).limit(6),
  ]);

  const reservationList = (reservations as Reservation[] ?? []);
  const pending = reservationList.filter((r: Reservation) => r.status === "pending").length;

  return (
    <div>
      <h1 className="font-display text-2xl">Overview</h1>
      <p className="text-sm text-stone mt-1">Welcome to the GEBAL admin dashboard.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
        <Stat label="Menu items" value={menuCount ?? 0} />
        <Stat label="Featured dishes" value={featuredCount ?? 0} />
        <Stat label="Reservations (recent)" value={reservationList.length} />
        <Stat label="Pending confirmations" value={pending} />
      </div>
      <div className="bg-white border border-stone/20 mt-8 p-5">
        <div className="text-sm mb-2.5">Recent reservation requests</div>
        {reservationList.map((r: Reservation) => (
          <div key={r.id} className="flex items-center justify-between py-2 border-t border-stone/10 text-xs">
            <span>{r.name}</span>
            <span className="text-stone">{r.reservation_date} · {r.guests} guests</span>
            <span className="capitalize">{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-stone/20 p-5">
      <div className="text-xs text-stone">{label}</div>
      <div className="font-display text-3xl mt-1.5">{value}</div>
    </div>
  );
}
