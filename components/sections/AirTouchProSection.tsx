import Link from "next/link";
import Image from "next/image";
import {
  Gauge,
  Sliders,
  Radio,
  Cpu,
  Zap,
  Bookmark,
} from "lucide-react";
import { AIRTOUCH_PRO_FEATURES, AIRTOUCH_PRO_SPECS } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  gauge: Gauge,
  sliders: Sliders,
  radio: Radio,
  cpu: Cpu,
  zap: Zap,
  bookmark: Bookmark,
};

export default function AirTouchProSection() {
  return (
    <section id="airtouch-pro" className="bg-[#fbfbfe] py-24 overflow-hidden">
      <div className="container-max">

        {/* Launch Badge */}
        <div className="flex items-center gap-4 mb-10">
          <div className="inline-flex items-center gap-2 border border-[#ED3E00] px-4 py-1.5 rounded-full bg-[#ED3E00]/5">
            <span className="w-2 h-2 rounded-full bg-[#ED3E00] animate-pulse" />
            <span className="text-[#ED3E00] text-xs font-bold tracking-[0.15em] uppercase">
              New Launch — AirTouch Pro
            </span>
          </div>
        </div>

        {/* Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-5xl md:text-6xl font-black text-[#040316] leading-tight">
              AirTouch
              <br />
              <span className="text-[#ED3E00]">Pro</span>
            </h2>
            <p className="mt-6 text-lg text-[#040316]/60 leading-relaxed">
              The most advanced air suspension management system we&apos;ve ever
              engineered. AirTouch Pro combines digital precision with wireless
              control, giving you total command over every aspect of your
              vehicle&apos;s stance and performance.
            </p>
            <p className="mt-4 text-[#040316]/60 leading-relaxed">
              Equipped with our signature GameBox wireless handheld controller in 4 custom anodized finishes, featuring dedicated height presets and instant valve response.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <a
                href="#contact"
                className="btn-primary"
              >
                Inquire About Pro
              </a>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#040316] px-4 py-2.5 rounded-lg border border-[#040316]/15 hover:border-[#040316] transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>

          {/* Pro visual - Featuring the newly added GameBox Remote */}
          <div className="relative group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#040316] border border-white/10 shadow-2xl">
              <Image
                src="/images/airtouch-pro-remote.jpg"
                alt="AirTouch Pro GameBox Wireless Handheld Controller"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Overlay accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040316]/80 via-transparent to-transparent pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 bg-[#040316]/85 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-white/15">
                GameBox Wireless Controller
              </div>
              <div className="absolute top-4 right-4 bg-[#ED3E00] text-white text-xs font-black px-3 py-1.5 rounded-md tracking-wider shadow-sm">
                PRO
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-[#040316]/85 backdrop-blur-md border border-white/10 text-xs text-white">
                <div>
                  <p className="font-bold text-white">4 Anodized Finishes</p>
                  <p className="text-white/60 text-[11px]">Black • Titanium • Orange • Purple</p>
                </div>
                <span className="text-[#ffeb20] font-bold text-[11px] bg-white/10 px-2 py-1 rounded-md">
                  Presets 1-3 + LOW
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="mb-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="section-label">Key Features</span>
              <h3 className="mt-2 text-3xl font-black text-[#040316]">
                Built Different
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AIRTOUCH_PRO_FEATURES.map((feature) => {
              const Icon = ICON_MAP[feature.icon] ?? Gauge;
              return (
                <div
                  key={feature.title}
                  className="bg-white p-8 rounded-2xl border border-[#040316]/8 hover:border-[#ED3E00]/30 hover:bg-[#040316] hover:text-white group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl border border-[#ED3E00]/30 flex items-center justify-center mb-5 bg-[#ED3E00]/5 group-hover:border-[#ED3E00] group-hover:bg-[#ED3E00]/10 transition-colors">
                    <Icon
                      size={20}
                      className="text-[#ED3E00]"
                    />
                  </div>
                  <h4 className="font-bold text-[#040316] group-hover:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-[#040316]/60 group-hover:text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specs & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Image gallery */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: "/images/airtouch-pro-remote.jpg", label: "GameBox Remote" },
              { src: "/images/Air Managements106.webp", label: "Pro Manifold" },
              { src: "/images/Air Managements107.webp", label: "Digital Gauge" },
              { src: "/images/Air Managements109.webp", label: "Complete Setup" },
            ].map((item, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-[#0a0a0a] border border-black/5 group shadow-sm">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Specs table */}
          <div className="bg-white p-8 rounded-2xl border border-[#040316]/8 shadow-sm">
            <span className="section-label">Specifications</span>
            <h3 className="mt-2 text-3xl font-black text-[#040316] mb-6">
              Technical Details
            </h3>

            <div className="border-t border-[#040316]/10 divide-y divide-[#040316]/10">
              {AIRTOUCH_PRO_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between py-3.5 text-sm"
                >
                  <span className="text-[#040316]/50 font-medium">
                    {spec.label}
                  </span>
                  <span className="font-bold text-[#040316]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="bg-[#040316] p-10 md:p-14 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-white/5">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Experience AirTouch Pro
            </h3>
            <p className="mt-2 text-white/50 text-sm max-w-md">
              Contact our team to learn how AirTouch Pro can transform your
              vehicle. Custom installation available for all makes and models.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={getWhatsAppUrl("مرحباً، أود الاستفسار وطلب جهاز ريموت AirTouch Pro (GameBox Remote) ومعرفة الأسعار والتفاصيل.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap"
            >
              Request a Quote
            </a>
            <a href="#contact" className="btn-secondary whitespace-nowrap">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
