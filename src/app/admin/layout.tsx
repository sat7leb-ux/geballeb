"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("gebal_auth");
    if (auth !== "authenticated") {
      router.push("/admin/login");
    } else {
      setAuthed(true);
    }
  }, [router]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-stone text-sm">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
