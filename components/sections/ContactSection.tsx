"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(SITE_CONFIG.contact.formspree, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: SITE_CONFIG.contact.address,
      href: SITE_CONFIG.contact.addressUrl,
    },
    {
      icon: Phone,
      label: "Phone",
      value: SITE_CONFIG.contact.phone,
      href: `tel:${SITE_CONFIG.contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: SITE_CONFIG.contact.email,
      href: `mailto:${SITE_CONFIG.contact.email}`,
    },
  ];

  return (
    <section id="contact" className="bg-[#fbfbfe] py-24">
      <div className="container-max">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Contact Us</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#040316]">
            Get In Touch
          </h2>
          <p className="mt-4 text-[#040316]/50">
            Have questions or need help choosing the right suspension system?
            Our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.label === "Location" ? "_blank" : undefined}
                    rel={info.label === "Location" ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#040316] flex items-center justify-center flex-shrink-0 group-hover:bg-[#ED3E00] transition-colors shadow-xs">
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#040316]/40 tracking-wider uppercase mb-1">
                        {info.label}
                      </div>
                      <div className="text-[#040316] text-sm font-medium group-hover:text-[#ED3E00] transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* WhatsApp */}
            <div className="mt-10 p-6 bg-[#040316] rounded-2xl shadow-lg border border-white/5">
              <p className="text-white/60 text-sm mb-4">
                Prefer to chat? Reach us directly on WhatsApp for quick
                responses.
              </p>
              <a
                href={getWhatsAppUrl("مرحباً، أود التواصل مع فريق خدمة عملاء AirTouch والاستفسار عن الخدمات والمنتجات المتاحة.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Open WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 p-16 border border-[#040316]/10 rounded-2xl text-center bg-white shadow-sm">
                <CheckCircle size={40} className="text-green-500" />
                <h3 className="text-xl font-bold text-[#040316]">Message Sent!</h3>
                <p className="text-[#040316]/50 text-sm max-w-xs">
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-primary mt-4 text-sm"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-[#040316]/50 uppercase tracking-wider mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3.5 bg-transparent border border-[#040316]/15 rounded-xl text-[#040316] placeholder:text-[#040316]/30 text-sm focus:outline-none focus:border-[#040316] transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-[#040316]/50 uppercase tracking-wider mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 bg-transparent border border-[#040316]/15 rounded-xl text-[#040316] placeholder:text-[#040316]/30 text-sm focus:outline-none focus:border-[#040316] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-[#040316]/50 uppercase tracking-wider mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your vehicle and what you need..."
                    className="w-full px-4 py-3.5 bg-transparent border border-[#040316]/15 rounded-xl text-[#040316] placeholder:text-[#040316]/30 text-sm focus:outline-none focus:border-[#040316] transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm">
                    Something went wrong. Please try again or contact us
                    directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
