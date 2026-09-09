const GRADIENTS: Record<string, string> = {
  Lebanese: "linear-gradient(135deg, #8B4513 0%, #CD853F 50%, #DEB887 100%)",
  Oriental: "linear-gradient(135deg, #2F4F2F 0%, #556B2F 50%, #8FBC8F 100%)",
  Chinese: "linear-gradient(135deg, #8B0000 0%, #CD5C5C 50%, #F08080 100%)",
  Italian: "linear-gradient(135deg, #2E4A2E 0%, #5C6B4F 50%, #8FBC8F 100%)",
};

// Stand-in for a real dish/cuisine photo until images are uploaded via the
// admin panel — swap for a Supabase Storage-backed <Image> once available.
export default function CuisineSwatch({ cuisine, className = "" }: { cuisine: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: GRADIENTS[cuisine] ?? "#5C6B4F" }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 40%)",
        }}
      />
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>
    </div>
  );
}
