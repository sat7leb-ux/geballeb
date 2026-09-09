"use client";

import { Check, XCircle } from "lucide-react";
import { setReservationStatus } from "./actions";
import type { Reservation } from "@/lib/types";

const STATUS_COLOR: Record<string, string> = {
  pending: "text-saffron",
  confirmed: "text-olive",
  cancelled: "text-clay",
  completed: "text-stone",
};

export default function ReservationsList({ reservations }: { reservations: Reservation[] }) {
  return (
    <div className="flex flex-col gap-3 mt-6">
      {reservations.map((r) => (
        <div key={r.id} className="bg-white border border-stone/20 p-4 flex flex-wrap items-center gap-4 justify-between">
          <div className="text-sm">
            <div>{r.name} · {r.guests} guests</div>
            <div className="text-xs text-stone mt-0.5">
              {r.reservation_date} at {r.reservation_time} {r.occasion ? `· ${r.occasion}` : ""}
            </div>
            <div className="text-xs text-stone mt-0.5">{r.phone} · {r.email}</div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs capitalize ${STATUS_COLOR[r.status]}`}>{r.status}</span>
            {r.status === "pending" && (
              <>
                <button onClick={() => setReservationStatus(r.id, "confirmed")} title="Confirm">
                  <Check size={16} className="text-olive hover:scale-110 transition-transform" />
                </button>
                <button onClick={() => setReservationStatus(r.id, "cancelled")} title="Cancel">
                  <XCircle size={16} className="text-clay hover:scale-110 transition-transform" />
                </button>
              </>
            )}
            {r.status === "confirmed" && (
              <button onClick={() => setReservationStatus(r.id, "completed")} className="text-xs text-stone hover:text-ink transition-colors">
                Mark completed
              </button>
            )}
          </div>
        </div>
      ))}
      {reservations.length === 0 && (
        <div className="text-sm text-stone py-10 text-center">No reservations yet.</div>
      )}
    </div>
  );
}
