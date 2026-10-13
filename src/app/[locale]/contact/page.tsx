import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import ContactSection from "@/components/ContactSection";
import { HelpCircle } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-20">
      <ContactSection />
      <ContactFaq />
    </div>
  );
}

function ContactFaq() {
  const faqs = [
    {
      q: "How fast do CascadeTech engineering consultants respond?",
      a: "All project inquiries received through our contact form or direct email (cascadetechnologiessolutions@gmail.com) receive a technical scoping response within 24 business hours.",
    },
    {
      q: "Where is CascadeTech Solutions physically located?",
      a: "Our core engineering office is located at Vidya-Nagar, Hubballi, Karnataka, India – 580021. We consult both locally across India and globally for international clients.",
    },
    {
      q: "Do you sign Mutual Non-Disclosure Agreements (NDAs)?",
      a: "Yes. We strictly respect confidentiality and routinely sign mutual NDAs before reviewing proprietary architectures, pitch decks, or codebase repositories.",
    },
    {
      q: "Can you take over and modernize existing codebases?",
      a: "Absolutely. Beyond greenfield product builds, we specialize in legacy modernization, refactoring monoliths into Next.js 15 micro-frontends, and integrating custom AI/LLM pipelines into operational systems.",
    },
  ];

  return (
    <section className="py-20 bg-[#04060b] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#00F2FE]">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Everything You Need to Know Before Engaging
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/30 transition-colors"
            >
              <h3 className="text-base font-bold text-white mb-2">
                {faq.q}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
