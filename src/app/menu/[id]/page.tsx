import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Leaf, Flame } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CuisineSwatch from "@/components/CuisineSwatch";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function DishPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: dish } = await supabase
    .from("menu_items")
    .select("*, cuisines(name)")
    .eq("id", params.id)
    .single();

  if (!dish) notFound();

  const { data: related } = await supabase
    .from("menu_items")
    .select("id, name, cuisines(name)")
    .eq("cuisine_id", (dish as any).cuisine_id)
    .neq("id", (dish as any).id)
    .limit(3);

  const d = dish as any;
  const relatedList = (related as any[]) ?? [];

  return (
    <>
      <Header />

      <div className="pt-24 pb-8 bg-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm text-stone hover:text-ink transition-colors duration-300"
          >
            <ArrowLeft size={14} /> Back to menu
          </Link>
        </div>
      </div>

      <section className="pb-20 bg-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="aspect-square overflow-hidden">
              <CuisineSwatch cuisine={d.cuisines?.name ?? ""} className="w-full h-full" />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">
                {d.cuisines?.name}
              </span>
              <h1 className="font-display text-display-sm text-ink mt-4">
                {d.name}
              </h1>
              <p className="text-2xl text-saffron mt-4 font-display">
                ${Number(d.price).toFixed(2)}
              </p>
              <p className="text-stone leading-relaxed mt-6">
                {d.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {d.is_vegetarian && (
                  <span className="text-xs px-3 py-1 border border-olive/30 text-olive flex items-center gap-1.5">
                    <Leaf size={12} /> Vegetarian
                  </span>
                )}
                {d.is_spicy && (
                  <span className="text-xs px-3 py-1 border border-clay/30 text-clay flex items-center gap-1.5">
                    <Flame size={12} /> Spicy
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-8 mt-10 pt-8 border-t border-stone/20">
                <div>
                  <h3 className="text-xs text-saffron tracking-widest uppercase mb-3">
                    Ingredients
                  </h3>
                  <p className="text-sm text-stone leading-relaxed">
                    {d.ingredients || "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs text-saffron tracking-widest uppercase mb-3">
                    Allergens
                  </h3>
                  <p className="text-sm text-stone leading-relaxed">
                    {d.allergens || "None declared"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {relatedList.length > 0 && (
            <div className="mt-20 pt-12 border-t border-stone/20">
              <h2 className="font-display text-2xl text-ink mb-8">
                More {d.cuisines?.name}
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {relatedList.map((r: any) => (
                  <Link
                    key={r.id}
                    href={`/menu/${r.id}`}
                    className="group block card-hover"
                  >
                    <div className="aspect-square overflow-hidden">
                      <CuisineSwatch
                        cuisine={r.cuisines?.name ?? ""}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-luxury"
                      />
                    </div>
                    <p className="text-sm text-ink mt-3 group-hover:text-saffron transition-colors duration-300">
                      {r.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
