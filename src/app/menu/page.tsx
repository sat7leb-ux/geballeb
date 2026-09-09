import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuBrowser from "./MenuBrowser";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;
export const metadata = { title: "Menu" };

export default async function MenuPage() {
  const supabase = createClient();
  const [{ data: items }, { data: cuisines }] = await Promise.all([
    supabase
      .from("menu_items")
      .select("id, name, description, price, is_vegetarian, is_vegan, is_spicy, is_featured, cuisines(name)")
      .eq("is_available", true)
      .order("sort_order"),
    supabase.from("cuisines").select("name").order("sort_order"),
  ]);

  return (
    <>
      <Header />
      
      <section className="pt-32 pb-16 bg-ink text-parchment">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-saffron" />
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">The Menu</span>
            </div>
            <h1 className="font-display text-display-lg text-parchment">
              Four kitchens, one table
            </h1>
            <p className="text-lg text-parchment/60 mt-6 leading-relaxed">
              From the charcoal grill to the wok, from fresh pasta to hand-folded dumplings — 
              every dish is prepared with the same care and respect for tradition.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <MenuBrowser items={(items as any) ?? []} cuisineNames={(cuisines as any[] ?? []).map((c: any) => c.name)} />
        </div>
      </section>

      <Footer />
    </>
  );
}
