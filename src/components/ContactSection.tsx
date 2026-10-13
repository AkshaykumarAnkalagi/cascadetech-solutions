"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Sparkles,
} from "lucide-react";
import { SITE_INFO } from "@/data/siteData";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit form.");
      }

      setStatus("success");
      setFeedbackMessage(
        data.message ||
          "Thank you! Your message has been received. Our engineering team will follow up promptly."
      );
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setFeedbackMessage(errorMessage);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#030509]">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, Company Info, Address, Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[#00F2FE] text-xs font-mono font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start The Conversation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Build <span className="text-gradient-cyan">Intelligent</span>, Scalable Systems?
              </h2>
              <p className="text-base text-zinc-300 leading-relaxed">
                Whether you need a custom website, enterprise software platform, or applied AI engine, let&rsquo;s engineer your technical roadmap together.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              {/* Email */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00F2FE] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Direct Email
                  </h4>
                  <a
                    href={`mailto:${SITE_INFO.email}`}
                    className="text-sm sm:text-base font-semibold text-white hover:text-[#00F2FE] transition-colors break-all"
                  >
                    {SITE_INFO.email}
                  </a>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Guaranteed response within 24 business hours
                  </p>
                </div>
              </div>

              {/* Physical Address */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Headquarters
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {SITE_INFO.address}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Karnataka, India
                  </p>
                </div>
              </div>

              {/* SLA badge */}
              <div className="flex items-center gap-2 text-xs text-zinc-300 pt-2 px-1">
                <Clock className="w-4 h-4 text-[#00F2FE]" />
                <span>Active Sprint Capacity Available for Q2/Q3 2026</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Working Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-[#090e17]/90 border border-white/[0.09] p-8 sm:p-10 backdrop-blur-xl shadow-2xl shadow-black/80">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-8">
                Tell us about your project requirements, target timeline, or architectural challenges.
              </p>

              {/* Form Component */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-medium"
                    >
                      Your Name <span className="text-[#00F2FE]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-medium"
                    >
                      Work Email <span className="text-[#00F2FE]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all"
                    />
                  </div>
                </div>

                {/* Company (Optional) */}
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="company"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-medium"
                  >
                    Company / Organization <span className="text-zinc-500 text-[10px] lowercase">(optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Acme Tech Global"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-medium"
                  >
                    Project Details & Scope <span className="text-[#00F2FE]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe what you're building, desired technologies, or existing systems to upgrade..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all resize-none"
                  />
                </div>

                {/* Status Feedback Banners */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-start gap-3 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Inquiry Dispatched Successfully!</p>
                      <p className="text-xs text-emerald-400/90 mt-0.5">{feedbackMessage}</p>
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 flex items-start gap-3 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unable to Send Message</p>
                      <p className="text-xs text-red-400/90 mt-0.5">{feedbackMessage}</p>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base text-black bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-blue-500 hover:shadow-[0_0_24px_rgba(0,242,254,0.4)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-zinc-500 text-center pt-2">
                  We respect NDA confidentiality and prioritize project privacy.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
