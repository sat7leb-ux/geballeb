"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoginPage = pathname === "/admin/login";

  // Always render login page directly
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Wait for hydration to check auth
  if (!mounted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-stone text-sm">Loading…</p>
      </div>
    );
  }

  // Check auth for other admin pages
  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("gebal_auth") === "authenticated";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone text-sm mb-4">Please log in to access the admin panel.</p>
          <a href="/admin/login" className="text-sm text-saffron hover:underline">Go to login</a>
        </div>
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
