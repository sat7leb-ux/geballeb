"use client";

import { useState } from "react";
import { Check, Calendar, Clock, Users, User, Phone, Mail, MessageSquare } from "lucide-react";

export default function ReservationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: 2,
    occasion: "",
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      const { error } = await res.json();
      setError(error || "Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 border border-olive/30 flex items-center justify-center mb-6">
          <Check size={28} className="text-olive" />
        </div>
        <h2 className="font-display text-2xl text-ink">Reservation request sent</h2>
        <p className="text-sm text-stone mt-3 max-w-sm leading-relaxed">
          We&apos;ll confirm your table for {form.guests} on {form.date || "the requested date"} by phone or email shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={submit}>
      {/* Name */}
      <div>
        <label className="flex items-center gap-2 text-xs text-stone tracking-wide mb-2">
          <User size={12} className="text-saffron" /> Full name
        </label>
        <input
          required
          value={form.name}
          onChange={set("name")}
          className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
        />
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-xs text-stone tracking-wide mb-2">
            <Phone size={12} className="text-saffron" /> Phone
          </label>
          <input
            required
            value={form.phone}
            onChange={set("phone")}
            className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs text-stone tracking-wide mb-2">
            <Mail size={12} className="text-saffron" /> Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
          />
        </div>
      </div>

      {/* Date, Time, Guests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="flex items-center gap-2 text-xs text-stone tracking-wide mb-2">
            <Calendar size={12} className="text-saffron" /> Date
          </label>
          <input
            required
            type="date"
            value={form.date}
            onChange={set("date")}
            className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs text-stone tracking-wide mb-2">
            <Clock size={12} className="text-saffron" /> Time
          </label>
          <input
            required
            type="time"
            value={form.time}
            onChange={set("time")}
            className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs text-stone tracking-wide mb-2">
            <Users size={12} className="text-saffron" /> Guests
          </label>
          <input
            required
            type="number"
            min={1}
            value={form.guests}
            onChange={set("guests")}
            className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
          />
        </div>
      </div>

      {/* Occasion */}
      <div>
        <label className="text-xs text-stone tracking-wide mb-2 block">
          Occasion (optional)
        </label>
        <input
          value={form.occasion}
          onChange={set("occasion")}
          placeholder="Birthday, anniversary, business dinner…"
          className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
        />
      </div>

      {/* Special Requests */}
      <div>
        <label className="flex items-center gap-2 text-xs text-stone tracking-wide mb-2">
          <MessageSquare size={12} className="text-saffron" /> Special requests
        </label>
        <textarea
          value={form.requests}
          onChange={set("requests")}
          rows={3}
          placeholder="Dietary requirements, seating preferences, allergies…"
          className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300 resize-none"
        />
      </div>

      {error && <div className="text-xs text-clay">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-ink text-parchment text-sm tracking-wide hover:bg-charcoal transition-all duration-500 ease-luxury disabled:opacity-50"
      >
        {loading ? "Sending request…" : "Request Reservation"}
      </button>
    </form>
  );
}
