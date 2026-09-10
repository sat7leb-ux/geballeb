"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // Always render login page directly
  if (isLoginPage) {
    return <>{children}</>;
  }

  useEffect(() => {
    // Check auth on client side only
    const auth = localStorage.getItem("gebal_auth");
    setIsAuthenticated(auth === "authenticated");
    setAuthChecked(true);
  }, []);

  // Wait for auth check
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-stone text-sm">Loading…</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone text-sm mb-4">Redirecting to login…</p>
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
