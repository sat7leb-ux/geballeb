"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Pencil, CalendarDays, Images, Settings as SettingsIcon, LogOut } from "lucide-react";

const ITEMS = [
  ["/admin", "Overview", LayoutDashboard],
  ["/admin/menu", "Menu", Pencil],
  ["/admin/reservations", "Reservations", CalendarDays],
  ["/admin/gallery", "Gallery", Images],
  ["/admin/settings", "Settings", SettingsIcon],
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    // Clear any stored auth
    localStorage.removeItem("gebal_auth");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="hidden md:flex flex-col w-56 py-6 px-4 flex-shrink-0 bg-ink text-parchment min-h-screen">
      <div className="font-display text-xl px-2 mb-10">GEBAL</div>
      <nav className="flex flex-col gap-1">
        {ITEMS.map(([href, label, Icon]) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-300 ${
              pathname === href
                ? "text-saffron bg-saffron/10"
                : "text-parchment/70 hover:text-parchment hover:bg-parchment/5"
            }`}
          >
            <Icon size={15} /> {label}
          </Link>
        ))}
      </nav>
      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-2.5 mt-auto text-sm text-parchment/40 hover:text-parchment/70 transition-colors duration-300"
      >
        <LogOut size={15} /> Sign out
      </button>
    </div>
  );
}
