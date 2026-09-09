import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Our Story" };

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-ink text-parchment">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-saffron" />
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">Our Story</span>
            </div>
            <h1 className="font-display text-display-lg text-parchment">
              Four kitchens that stopped competing
            </h1>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="section-padding bg-paper">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="space-y-8 text-lg text-stone leading-relaxed">
            <p className="first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-ink">
              Gebal opened because our family couldn&apos;t agree on what kind of restaurant to run.
              One of us trained in a trattoria outside Bologna. Another spent four years in a
              Sichuan kitchen learning to keep the numbing heat honest without burying it. A third
              never left the grill our grandfather built by hand — the same coals, the same mixed
              spice he ground himself.
            </p>

            <p>
              Rather than choose, we built one dining room with four kitchens working side by
              side. The Lebanese mezze comes from recipes that haven&apos;t changed in three
              generations. The Oriental grills use the same charcoal method as always. The wok
              fires stay hot enough to sear, not steam. The pasta gets rolled fresh, the way it&apos;s
              meant to.
            </p>

            <p>
              What holds it together isn&apos;t a gimmick — it&apos;s the same instinct that made our
              grandmother&apos;s table the one everyone showed up to uninvited: cook it properly, serve
              it warm, and always set one extra place.
            </p>
          </div>

          {/* Values */}
          <div className="mt-20 pt-12 border-t border-stone/20">
            <h2 className="font-display text-2xl text-ink mb-10">What we believe</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-display text-lg text-ink mb-3">Honest ingredients</h3>
                <p className="text-sm text-stone leading-relaxed">
                  We source locally where we can, import where we must, and never cut corners
                  on the things that matter — the olive oil, the flour, the spice blend.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg text-ink mb-3">Slow preparation</h3>
                <p className="text-sm text-stone leading-relaxed">
                  Good food takes time. Our ragù simmers for hours. Our dough rests overnight.
                  Our broth is never from a packet.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg text-ink mb-3">Warm hospitality</h3>
                <p className="text-sm text-stone leading-relaxed">
                  You&apos;re not a table number. You&apos;re a guest in our home. We want you to feel
                  it from the moment you walk in.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg text-ink mb-3">Cultural respect</h3>
                <p className="text-sm text-stone leading-relaxed">
                  Each kitchen is run by someone who lived the tradition. We don&apos;t fuse for
                  the sake of it — we let each cuisine speak for itself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
