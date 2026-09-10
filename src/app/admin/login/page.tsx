"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email === "eliekhachane@gebal.com" && password === "@cc3pt3D2026") {
      localStorage.setItem("gebal_auth", "authenticated");
      router.push("/admin");
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto px-5 py-28">
      <div className="w-12 h-12 border border-saffron/30 flex items-center justify-center mb-6">
        <Lock size={20} className="text-saffron" />
      </div>
      <h1 className="font-display text-2xl">Staff sign in</h1>
      <p className="text-xs text-stone mt-2">GEBAL admin dashboard</p>
      <form className="mt-8 flex flex-col gap-4" onSubmit={submit}>
        <div>
          <label className="text-xs text-stone">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
          />
        </div>
        <div>
          <label className="text-xs text-stone">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-stone/30 bg-transparent py-3 text-sm outline-none focus:border-ink transition-colors duration-300"
          />
        </div>
        {error && <div className="text-xs text-clay">{error}</div>}
        <button
          disabled={loading}
          type="submit"
          className="bg-ink text-parchment text-sm py-3 mt-2 hover:bg-charcoal transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
