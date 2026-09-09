import ReservationsList from "./ReservationsList";
import { createClient } from "@/lib/supabase/server";
import type { Reservation } from "@/lib/types";

export default async function AdminReservationsPage() {
  const supabase = createClient();
  const { data: reservations } = await supabase
    .from("reservations")
    .select("*")
    .order("reservation_date", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl">Reservations</h1>
      <p className="text-sm text-stone mt-1">Manage booking requests and confirmations.</p>
      <ReservationsList reservations={(reservations as Reservation[] ?? [])} />
    </div>
  );
}
