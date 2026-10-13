import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, MessageSquare, HelpCircle } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import { SITE_INFO, FAQS } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Contact Us | Start Your Project",
  description:
    "Connect with CascadeTech Solutions in Vidya-Nagar, Hubballi, Karnataka. Discuss custom software development, Next.js web applications, or AI chatbot implementations.",
};

export default function ContactPage() {
  return (
    <div className="relative pt-24">
      {/* Contact Section containing form, email and Hubballi address */}
      <ContactSection />

      {/* Frequently Asked Questions Section */}
      <section className="py-20 bg-[#05070e] border-t border-white/[0.06] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[#00F2FE] text-xs font-mono uppercase font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-400">
              Clear answers regarding our agile process, IP ownership, and project turnaround.
            </p>
          </div>

          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#090e17]/80 border border-white/[0.08] p-6 sm:p-8 space-y-2.5 hover:border-cyan-400/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-white flex items-start gap-3">
                  <span className="text-xs font-mono text-[#00F2FE] mt-1 font-semibold">
                    Q0{idx + 1}.
                  </span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
