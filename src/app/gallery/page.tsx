import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CuisineSwatch from "@/components/CuisineSwatch";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;
export const metadata = { title: "Gallery" };

const FALLBACK_CUISINES = ["Lebanese", "Oriental", "Chinese", "Italian"];

export default async function GalleryPage() {
  const supabase = createClient();
  const { data: gallery } = await supabase.from("gallery").select("*").order("sort_order");

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-ink text-parchment">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-saffron" />
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">Gallery</span>
            </div>
            <h1 className="font-display text-display-lg text-parchment">
              Around the restaurant
            </h1>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {((gallery as any[]) ?? []).map((g: any, i: number) => (
              <div
                key={g.id}
                className={`group relative overflow-hidden ${
                  i % 5 === 0 ? "sm:col-span-2 aspect-[2/1]" : "aspect-square"
                }`}
              >
                <CuisineSwatch
                  cuisine={FALLBACK_CUISINES[i % 4]}
                  className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-luxury"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm text-parchment">{g.caption}</p>
                  {g.category && (
                    <p className="text-xs text-parchment/60 mt-1">{g.category}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
