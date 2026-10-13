import { MessageCircle, Phone, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export default function ConsultationCtaSection() {
  const whatsappUrl = getWhatsAppUrl(
    "مرحباً، أود استشارة فريق العمل بخصوص اختيار وتوافق نظام المساعدين الهوائية (Air Suspension) المناسب لسيارتي ومعرفة التكاليف."
  );

  return (
    <section className="bg-[#040316] py-20 text-white relative overflow-hidden border-t border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#ffeb20]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="bg-gradient-to-r from-[#0d0c1d] via-[#100f24] to-[#0a0a14] border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 border border-[#25D366]/30 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-[#25D366] text-xs font-bold tracking-wider uppercase">
                  Technical Consultation
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Need Help Choosing the Right{" "}
                <span className="text-[#ffeb20]">Air Suspension</span> Kit?
              </h2>

              <p className="mt-4 text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
                Every vehicle has unique axle weights, clearance requirements, and fitment considerations. Chat directly with our engineering specialists on WhatsApp for personalized kit matching, parts availability, and pricing.
              </p>

              {/* Guarantees / Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#ffeb20] flex-shrink-0">
                    <Clock size={16} />
                  </div>
                  <span className="text-xs text-white/70">
                    Quick response time during shop hours
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#ffeb20] flex-shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="text-xs text-white/70">
                    Verified fitment for 1,000+ car models
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Direct WhatsApp Inquiry
                </h3>
                <p className="text-xs text-white/50 mb-6 leading-relaxed">
                  Send us your car make, model, model year, and what you want to achieve with your ride height.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl text-sm font-bold bg-[#25D366] text-[#040316] hover:bg-[#20ba5a] transition-all duration-200 shadow-lg shadow-[#25D366]/20 group"
                >
                  <MessageCircle size={18} />
                  <span>Start WhatsApp Consultation</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, "")}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white/70 hover:text-white border border-white/10 hover:border-white/25 transition-colors"
                >
                  <Phone size={14} />
                  <span>Call Direct: {SITE_CONFIG.contact.phone}</span>
                </a>
              </div>

              <p className="text-[11px] text-white/35 text-center mt-4">
                Location: {SITE_CONFIG.contact.address} • Worldwide Parts Shipping Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
