import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin, Clock, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CuisineSwatch from "@/components/CuisineSwatch";
import { createClient } from "@/lib/supabase/server";
import type { Cuisine, MenuItem, RestaurantSettings } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = createClient();
  const [{ data: cuisines }, { data: featured }, { data: settings }] = await Promise.all([
    supabase.from("cuisines").select("*").order("sort_order"),
    supabase
      .from("menu_items")
      .select("*, cuisines(name)")
      .eq("is_featured", true)
      .eq("is_available", true)
      .limit(4),
    supabase.from("restaurant_settings").select("*").eq("id", 1).single(),
  ]);

  const cuisineList = (cuisines as Cuisine[] ?? []);
  const featuredList = (featured as any[] ?? []);
  const settingsData = (settings as RestaurantSettings | null) ?? undefined;

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-screen min-h-[700px] bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-in">
                <div className="w-12 h-px bg-saffron" />
                <span className="text-saffron text-xs tracking-[0.3em] uppercase">
                  Lebanese · Oriental · Chinese · Italian
                </span>
              </div>

              <h1 className="font-display text-display-xl text-parchment opacity-0 animate-fade-up delay-200">
                Where cultures
                <br />
                <span className="italic font-light">meet at the table.</span>
              </h1>

              <p className="text-lg md:text-xl text-parchment/70 mt-6 max-w-xl leading-relaxed opacity-0 animate-fade-up delay-400">
                A culinary destination where four kitchens work side by side —
                each one honest to its own tradition, all of them sharing the same table.
              </p>

              <div className="flex flex-wrap gap-4 mt-10 opacity-0 animate-fade-up delay-600">
                <Link
                  href="/reservations"
                  className="px-8 py-4 bg-saffron text-ink text-sm tracking-wide hover:bg-saffronLight transition-all duration-500 ease-luxury flex items-center gap-2"
                >
                  Reserve a Table <ArrowRight size={16} />
                </Link>
                <Link
                  href="/menu"
                  className="px-8 py-4 border border-parchment/30 text-parchment text-sm tracking-wide hover:bg-parchment/10 transition-all duration-500 ease-luxury"
                >
                  Explore the Menu
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in delay-800">
            <span className="text-[10px] text-parchment/40 tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-saffron/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-paper">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <div className="w-12 h-px bg-saffron mx-auto mb-8" />
          <h2 className="font-display text-display-md text-ink text-balance">
            Four kitchens that stopped competing
          </h2>
          <p className="text-lg text-stone mt-8 leading-relaxed max-w-2xl mx-auto">
            Gebal began with one simple idea: <strong className="text-ink">why choose just one cuisine when a family table can hold them all?</strong> Inspired by a lifelong love of food and by the culinary traditions passed down through generations, I created Gebal as a place where different worlds of cooking could come together under one roof.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-ink overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974')",
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-saffron/30" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-saffron" />
                <span className="text-xs text-saffron tracking-[0.2em] uppercase">Our Story</span>
              </div>
              <h2 className="font-display text-display-md text-ink">
                A journey through kitchens and traditions
              </h2>
              <div className="mt-8 space-y-5 text-stone leading-relaxed">
                <p>
                  My journey took me through different kitchens and traditions. I learned the soul of Italian cooking, where fresh pasta is made by hand and simplicity is treated as an art. I discovered the depth of Sichuan cuisine, where the wok must stay fiercely hot and every spice has its purpose. I returned to the traditions of our own table — Lebanese mezze, Oriental grills, charcoal, and the mixed spices our grandfather once ground by hand.
                </p>
                <p>
                  Instead of choosing between them, I brought them together. At Gebal, Lebanese mezze follows recipes that have been carried through three generations. Our Oriental grills are prepared over charcoal, keeping alive the method that has always given them their character. The wok stays hot enough to sear rather than steam, while our pasta is rolled fresh, the way it should be.
                </p>
                <p>
                  But Gebal is more than four kitchens or four culinary traditions. It is my interpretation of what a family table has always meant to me: <strong className="text-ink">good food made properly, served warm, and shared generously.</strong> Because in our family, there was always room for one more.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-sm text-ink border-b border-ink pb-1 hover:text-saffron hover:border-saffron transition-colors duration-300"
              >
                Read our full story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Four Culinary Worlds */}
      <section className="section-padding bg-ink text-parchment">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-saffron" />
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">The Cuisines</span>
              <div className="w-8 h-px bg-saffron" />
            </div>
            <h2 className="font-display text-display-md text-parchment">
              Four culinary worlds, one destination
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cuisineList.map((c, i) => (
              <Link
                key={c.id}
                href="/menu"
                className="group relative block overflow-hidden"
              >
                <div className="aspect-[3/4] relative">
                  <CuisineSwatch cuisine={c.name} className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-[10px] text-saffron tracking-widest uppercase mb-2">
                      {["I", "II", "III", "IV"][i]}
                    </span>
                    <h3 className="font-display text-2xl text-parchment">{c.name}</h3>
                    <p className="text-xs text-parchment/60 mt-2 leading-relaxed">
                      {c.tagline}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Explore <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="section-padding bg-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-saffron" />
                <span className="text-xs text-saffron tracking-[0.2em] uppercase">Signature</span>
              </div>
              <h2 className="font-display text-display-md text-ink">
                On the table this week
              </h2>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-sm text-ink border-b border-ink/30 pb-1 hover:text-saffron hover:border-saffron transition-colors duration-300"
            >
              View full menu <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredList.map((d: any) => (
              <Link
                key={d.id}
                href={`/menu/${d.id}`}
                className="group block card-hover"
              >
                <div className="aspect-square bg-ink overflow-hidden">
                  <CuisineSwatch
                    cuisine={d.cuisines?.name ?? ""}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-luxury"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-lg text-ink group-hover:text-saffron transition-colors duration-300">
                    {d.name}
                  </h3>
                  <p className="text-sm text-stone mt-1 line-clamp-2">{d.description}</p>
                  <p className="text-sm text-saffron mt-2 font-medium">
                    ${Number(d.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section-padding bg-ink text-parchment relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070')",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-ink/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-px bg-saffron mb-6" />
              <h3 className="font-display text-2xl text-parchment">Atmosphere</h3>
              <p className="text-sm text-parchment/60 mt-4 leading-relaxed">
                Warm light, natural textures, and the quiet hum of a dining room that knows how to
                hold a conversation. Every detail considered, nothing overdone.
              </p>
            </div>
            <div>
              <div className="w-12 h-px bg-saffron mb-6" />
              <h3 className="font-display text-2xl text-parchment">Hospitality</h3>
              <p className="text-sm text-parchment/60 mt-4 leading-relaxed">
                The kind of welcome that made our grandmother&apos;s table the one everyone showed up to.
                Genuine, unhurried, and always with one extra place set.
              </p>
            </div>
            <div>
              <div className="w-12 h-px bg-saffron mb-6" />
              <h3 className="font-display text-2xl text-parchment">Craft</h3>
              <p className="text-sm text-parchment/60 mt-4 leading-relaxed">
                Four kitchens, each one honest to its own tradition. The wok fires stay hot enough
                to sear. The pasta gets rolled fresh. The mezze comes from recipes that haven&apos;t
                changed in three generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-24 md:py-32 bg-paper relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center relative z-10">
          <div className="w-12 h-px bg-saffron mx-auto mb-8" />
          <h2 className="font-display text-display-md text-ink text-balance">
            Reserve your evening at Gebal
          </h2>
          <p className="text-lg text-stone mt-6 max-w-xl mx-auto leading-relaxed">
            Whether it&apos;s an intimate dinner for two or a celebration with the whole table,
            we&apos;ll make sure the evening is one to remember.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              href="/reservations"
              className="px-8 py-4 bg-ink text-parchment text-sm tracking-wide hover:bg-charcoal transition-all duration-500 ease-luxury"
            >
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="px-8 py-4 border border-ink/20 text-ink text-sm tracking-wide hover:bg-ink hover:text-parchment transition-all duration-500 ease-luxury"
            >
              Explore the Menu
            </Link>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-saffron/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-saffron/5 rounded-full" />
      </section>

      {/* Location */}
      <section className="section-padding bg-ink text-parchment">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="aspect-square md:aspect-auto bg-charcoal border border-parchment/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-saffron mx-auto mb-4" />
                <p className="text-sm text-parchment/60">
                  {settingsData?.address || "Sea Road, Sidon, Lebanon"}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    settingsData?.address || "Sea Road, Sidon, Lebanon"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-xs text-saffron border-b border-saffron/30 pb-1 hover:border-saffron transition-colors duration-300"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-saffron" />
                <span className="text-xs text-saffron tracking-[0.2em] uppercase">Find Us</span>
              </div>
              <h2 className="font-display text-display-sm text-parchment">
                Visit us in Sidon
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-saffron mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-parchment/80">
                    {settingsData?.address || "Sea Road, Sidon, Lebanon"}
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={18} className="text-saffron mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-parchment/80">
                    {settingsData?.opening_hours || "Mon–Thu 12:00–23:00, Fri–Sun 12:00–00:30"}
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-saffron mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-parchment/80">
                    {settingsData?.phone || "+961 76 784 433"}
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-10 text-sm text-saffron border-b border-saffron/30 pb-1 hover:border-saffron transition-colors duration-300 w-fit"
              >
                Get in touch <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settingsData} />
    </>
  );
}
