import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReservationForm from "./ReservationForm";

export const metadata = { title: "Reservations" };

export default function ReservationsPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-ink text-parchment">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-saffron" />
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">Reservations</span>
            </div>
            <h1 className="font-display text-display-lg text-parchment">
              Reserve your table
            </h1>
            <p className="text-lg text-parchment/60 mt-6 leading-relaxed">
              Whether it&apos;s an intimate dinner for two or a celebration with the whole table,
              we&apos;ll make sure the evening is one to remember.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-paper">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <ReservationForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
