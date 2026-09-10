import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
