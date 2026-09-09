import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Public endpoint — anyone can submit a reservation request.
// RLS policy "reservations: anyone can submit" (see 0002_rls.sql) allows
// the insert; reading the list back requires staff auth.
export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, email, date, time, guests, occasion, requests } = body;

  if (!name || !phone || !email || !date || !time || !guests) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("reservations")
    .insert({
      name,
      phone,
      email,
      reservation_date: date,
      reservation_time: time,
      guests: Number(guests),
      occasion: occasion || null,
      special_requests: requests || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reservation: data }, { status: 201 });
}
