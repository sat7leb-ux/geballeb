const GRADIENTS: Record<string, string> = {
  Lebanese: "linear-gradient(135deg, #8B4513 0%, #CD853F 50%, #DEB887 100%)",
  Oriental: "linear-gradient(135deg, #2F4F2F 0%, #556B2F 50%, #8FBC8F 100%)",
  Chinese: "linear-gradient(135deg, #8B0000 0%, #CD5C5C 50%, #F08080 100%)",
  Italian: "linear-gradient(135deg, #2E4A2E 0%, #5C6B4F 50%, #8FBC8F 100%)",
  Sandwiches: "linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #F0E68C 100%)",
  Drinks: "linear-gradient(135deg, #1E3A5F 0%, #4682B4 50%, #87CEEB 100%)",
  "Alcoholic Beverages": "linear-gradient(135deg, #4A0E4E 0%, #7B2D8E 50%, #C77DFF 100%)",
  Chicha: "linear-gradient(135deg, #2C2C2C 0%, #5A5A5A 50%, #8A8A8A 100%)",
  Desserts: "linear-gradient(135deg, #C71585 0%, #FF69B4 50%, #FFB6C1 100%)",
};

export default function CuisineSwatch({ cuisine, className = "", image }: { cuisine: string; className?: string; image?: string }) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={image}
          alt={cuisine}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

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
