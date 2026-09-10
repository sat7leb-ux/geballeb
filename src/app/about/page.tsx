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
          <div className="space-y-8">
            <p className="text-stone leading-relaxed">
              Gebal began with one simple idea: <strong className="text-ink">why choose just one cuisine when a family table can hold them all?</strong>
            </p>
            <p className="text-stone leading-relaxed">
              Inspired by a lifelong love of food and by the culinary traditions passed down through generations, I created Gebal as a place where different worlds of cooking could come together under one roof.
            </p>
            <p className="text-stone leading-relaxed">
              My journey took me through different kitchens and traditions. I learned the soul of Italian cooking, where fresh pasta is made by hand and simplicity is treated as an art. I discovered the depth of Sichuan cuisine, where the wok must stay fiercely hot and every spice has its purpose. I returned to the traditions of our own table — Lebanese mezze, Oriental grills, charcoal, and the mixed spices our grandfather once ground by hand.
            </p>
            <p className="text-stone leading-relaxed">
              Instead of choosing between them, I brought them together.
            </p>
            <p className="text-stone leading-relaxed">
              At Gebal, Lebanese mezze follows recipes that have been carried through three generations. Our Oriental grills are prepared over charcoal, keeping alive the method that has always given them their character. The wok stays hot enough to sear rather than steam, while our pasta is rolled fresh, the way it should be.
            </p>
            <p className="text-stone leading-relaxed">
              But Gebal is more than four kitchens or four culinary traditions.
            </p>
            <p className="text-stone leading-relaxed">
              It is my interpretation of what a family table has always meant to me: <strong className="text-ink">good food made properly, served warm, and shared generously.</strong>
            </p>
            <p className="text-stone leading-relaxed">
              Because in our family, there was always room for one more.
            </p>
          </div>

          {/* Values */}
          <div className="mt-20 pt-12 border-t border-stone/20">
            <h2 className="font-display text-2xl text-ink mb-10">What we believe</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-display text-lg text-ink mb-3">Honest ingredients</h3>
                <p className="text-stone leading-relaxed">
                  We source locally where we can, import where we must, and never cut corners
                  on the things that matter — the olive oil, the flour, the spice blend.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg text-ink mb-3">Slow preparation</h3>
                <p className="text-stone leading-relaxed">
                  Good food takes time. Our ragù simmers for hours. Our dough rests overnight.
                  Our broth is never from a packet.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg text-ink mb-3">Warm hospitality</h3>
                <p className="text-stone leading-relaxed">
                  You're not a table number. You're a guest in our home. We want you to feel
                  it from the moment you walk in.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg text-ink mb-3">Cultural respect</h3>
                <p className="text-stone leading-relaxed">
                  Each kitchen is run by someone who lived the tradition. We don't fuse for
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
