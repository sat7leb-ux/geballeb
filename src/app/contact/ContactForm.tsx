"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 border border-olive/30 flex items-center justify-center mb-5">
          <Check size={24} className="text-olive" />
        </div>
        <h3 className="font-display text-xl text-ink">Message sent</h3>
        <p className="text-sm text-stone mt-2 max-w-xs">
          Thank you for reaching out. We&apos;ll get back to you within a day.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={submit}>
      <div>
        <label className="text-xs text-stone tracking-wide">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
        />
      </div>
      <div>
        <label className="text-xs text-stone tracking-wide">Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
        />
      </div>
      <div>
        <label className="text-xs text-stone tracking-wide">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300 resize-none"
        />
      </div>
      {error && <div className="text-xs text-clay">{error}</div>}
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-parchment text-sm tracking-wide hover:bg-charcoal transition-all duration-500 ease-luxury w-fit"
      >
        <Send size={14} /> Send Message
      </button>
    </form>
  );
}
