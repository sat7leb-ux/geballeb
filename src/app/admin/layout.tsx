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

  // Only check auth after hydration (client-side)
  const isAuthenticated = mounted && typeof window !== "undefined" && localStorage.getItem("gebal_auth") === "authenticated";
  const isLoginPage = pathname === "/admin/login";

  // Don't show loading state during SSR or on login page
  if (!mounted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-stone text-sm">Loading…</p>
      </div>
    );
  }

  // On login page, just render children
  if (isLoginPage) {
    return <>{children}</>;
  }

  // On other admin pages, check auth
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
