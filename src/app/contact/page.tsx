import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Contact" };
export const revalidate = 60;

export default async function ContactPage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from("restaurant_settings").select("*").eq("id", 1).single();

  const settingsData = settings as any;

  return (
    <>
      <Header />

      <section className="pt-32 pb-16 bg-ink text-parchment">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-saffron" />
              <span className="text-xs text-saffron tracking-[0.2em] uppercase">Contact</span>
            </div>
            <h1 className="font-display text-display-lg text-parchment">
              Get in touch
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-ink/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-saffron" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-ink">Address</h3>
                    <p className="text-sm text-stone mt-1">
                      {settingsData?.address || "Sea Road, Sidon, Lebanon"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-ink/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-saffron" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-ink">Phone</h3>
                    <p className="text-sm text-stone mt-1">
                      {settingsData?.phone || "+961 7 123 456"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-ink/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-saffron" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-ink">Email</h3>
                    <p className="text-sm text-stone mt-1">
                      {settingsData?.email || "hello@gebal-restaurant.com"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-ink/20 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-saffron" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-ink">Opening Hours</h3>
                    <p className="text-sm text-stone mt-1">
                      {settingsData?.opening_hours || "Mon–Thu 12:00–23:00, Fri–Sun 12:00–00:30"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 aspect-[4/3] bg-ink border border-stone/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-saffron mx-auto mb-3" />
                  <p className="text-xs text-parchment/60">
                    {settingsData?.address || "Sea Road, Sidon, Lebanon"}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      settingsData?.address || "Sea Road, Sidon, Lebanon"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs text-saffron border-b border-saffron/30 pb-1 hover:border-saffron transition-colors duration-300"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink mb-2">Send us a message</h2>
              <p className="text-sm text-stone mb-8">
                Have a question, feedback, or special request? We&apos;d love to hear from you.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settingsData} />
    </>
  );
}
