import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Lock } from "lucide-react";
import type { RestaurantSettings } from "@/lib/types";

export default function Footer({ settings }: { settings?: Partial<RestaurantSettings> }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-parchment overflow-hidden">
      {/* Top contour divider */}
      <div className="contour-rule px-6 md:px-10 pt-12">
        <span className="bg-parchment/10" />
        <span className="bg-parchment/10" />
        <span className="bg-parchment/10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <h3 className="font-display text-3xl tracking-wide">GEBAL</h3>
            <p className="text-sm text-parchment/60 mt-4 leading-relaxed max-w-xs">
              A destination for food, culture and unforgettable evenings.
              Four kitchens, one table.
            </p>
            <div className="flex gap-4 mt-6">
              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-parchment/20 flex items-center justify-center hover:border-saffron hover:text-saffron transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
              {settings?.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-parchment/20 flex items-center justify-center hover:border-saffron hover:text-saffron transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-xs text-saffron tracking-widest uppercase mb-5">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/menu" className="text-sm text-parchment/70 hover:text-parchment transition-colors duration-300">
                Menu
              </Link>
              <Link href="/about" className="text-sm text-parchment/70 hover:text-parchment transition-colors duration-300">
                Our Story
              </Link>
              <Link href="/gallery" className="text-sm text-parchment/70 hover:text-parchment transition-colors duration-300">
                Gallery
              </Link>
              <Link href="/reservations" className="text-sm text-parchment/70 hover:text-parchment transition-colors duration-300">
                Reservations
              </Link>
              <Link href="/contact" className="text-sm text-parchment/70 hover:text-parchment transition-colors duration-300">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs text-saffron tracking-widest uppercase mb-5">
              Visit Us
            </h4>
            <div className="flex flex-col gap-3 text-sm text-parchment/70">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-saffron/70 flex-shrink-0" />
                <span>{settings?.address || "Sea Road, Sidon, Lebanon"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-saffron/70 flex-shrink-0" />
                <span>{settings?.phone || "+961 7 123 456"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-saffron/70 flex-shrink-0" />
                <span>{settings?.email || "hello@gebal-restaurant.com"}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="md:col-span-3">
            <h4 className="text-xs text-saffron tracking-widest uppercase mb-5">
              Opening Hours
            </h4>
            <p className="text-sm text-parchment/70 leading-relaxed">
              {settings?.opening_hours || "Mon–Thu 12:00–23:00, Fri–Sun 12:00–00:30"}
            </p>
            <Link
              href="/reservations"
              className="inline-block mt-6 px-5 py-2.5 border border-saffron/60 text-saffron text-xs tracking-widest uppercase hover:bg-saffron hover:text-ink transition-all duration-500 ease-luxury"
            >
              Reserve a Table
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-parchment/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-parchment/40">
            © {year} GEBAL Restaurant. All rights reserved.
          </p>
          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 text-xs text-parchment/30 hover:text-parchment/60 transition-colors duration-300"
          >
            <Lock size={11} /> Staff Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
