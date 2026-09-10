import type { Metadata } from "next";
import "./globals.css";
import { RestaurantJsonLd } from "@/components/RestaurantJsonLd";
import ChatWidget from "@/components/ChatWidget";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "GEBAL — Oriental, Lebanese, Chinese & Italian Restaurant",
    template: "%s — GEBAL",
  },
  description:
    "Gebal is a culinary destination where Lebanese heritage, Oriental hospitality, Chinese artistry and Italian elegance converge. Reserve your table for an unforgettable dining experience in Sidon, Lebanon.",
  keywords: [
    "restaurant",
    "Lebanese restaurant",
    "Oriental cuisine",
    "Chinese restaurant",
    "Italian restaurant",
    "Sidon",
    "Lebanon",
    "fine dining",
    "culinary experience",
    "Gebal",
  ],
  openGraph: {
    title: "GEBAL Restaurant",
    description:
      "Where cultures meet at the table. Lebanese · Oriental · Chinese · Italian — a complete culinary destination in Sidon, Lebanon.",
    type: "website",
    locale: "en_US",
    siteName: "GEBAL Restaurant",
  },
  twitter: {
    card: "summary_large_image",
    title: "GEBAL Restaurant",
    description:
      "Lebanese · Oriental · Chinese · Italian — a complete culinary destination.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: settings } = await supabase.from("restaurant_settings").select("*").eq("id", 1).single();

  return (
    <html lang="en">
      <body className="font-body antialiased">
        <RestaurantJsonLd settings={settings ?? undefined} />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
