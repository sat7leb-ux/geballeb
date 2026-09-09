import type { RestaurantSettings } from "@/lib/types";

export function RestaurantJsonLd({ settings }: { settings?: Partial<RestaurantSettings> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: settings?.name || "GEBAL",
    description:
      "GEBAL is a culinary destination where Lebanese heritage, Oriental hospitality, Chinese artistry and Italian elegance converge in Sidon, Lebanon.",
    servedCuisine: ["Lebanese", "Oriental", "Chinese", "Italian"],
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address || "Sea Road, Sidon, Lebanon",
      addressLocality: "Sidon",
      addressCountry: "LB",
    },
    telephone: settings?.phone || "+961 7 123 456",
    email: settings?.email || "hello@gebal-restaurant.com",
    openingHours: ["Mo-Th 12:00-23:00", "Fr-Su 12:00-00:30"],
    priceRange: "$$",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
