export default function AdminOverviewPage() {
  const menuCount = 199; // Static count for now
  const featuredCount = 12;
  const pendingReservations = 0;

  return (
    <div>
      <h1 className="font-display text-2xl">Overview</h1>
      <p className="text-sm text-stone mt-1">Welcome to the GEBAL admin dashboard.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
        <Stat label="Menu items" value={menuCount} />
        <Stat label="Featured dishes" value={featuredCount} />
        <Stat label="Reservations (recent)" value={0} />
        <Stat label="Pending confirmations" value={pendingReservations} />
      </div>
      <div className="bg-white border border-stone/20 mt-8 p-5">
        <div className="text-sm mb-2.5">Quick Actions</div>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/menu" className="text-sm px-4 py-2 bg-ink text-parchment hover:bg-charcoal transition-colors">
            Manage Menu
          </a>
          <a href="/admin/gallery" className="text-sm px-4 py-2 border border-stone/20 hover:bg-stone/5 transition-colors">
            Manage Gallery
          </a>
          <a href="/admin/settings" className="text-sm px-4 py-2 border border-stone/20 hover:bg-stone/5 transition-colors">
            Settings
          </a>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-stone/20 p-5">
      <div className="text-xs text-stone">{label}</div>
      <div className="font-display text-3xl mt-1.5">{value}</div>
    </div>
  );
}
