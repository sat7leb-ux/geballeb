import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="pt-40 pb-20 bg-paper min-h-[60vh] flex items-center">
        <div className="max-w-2xl mx-auto px-6 md:px-10 text-center">
          <div className="w-12 h-px bg-saffron mx-auto mb-8" />
          <h1 className="font-display text-display-md text-ink">Page not found</h1>
          <p className="text-stone mt-6 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-ink text-parchment text-sm tracking-wide hover:bg-charcoal transition-all duration-500 ease-luxury"
          >
            Return Home
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
