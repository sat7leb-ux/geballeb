import AdminSidebar from "@/components/AdminSidebar";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-paper">
      {user ? (
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex-1 p-6 md:p-10">{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
