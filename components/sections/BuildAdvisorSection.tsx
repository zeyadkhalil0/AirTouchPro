"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

interface BuildProfile {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  summary: string;
  bestFor: string;
  recommendedComponents: { name: string; categoryParam: string; note: string }[];
  inquiryText: string;
}

const BUILD_PROFILES: BuildProfile[] = [
  {
    id: "daily",
    name: "Daily Comfort & Practicality",
    badge: "Most Popular",
    tagline: "Smooth highway cruising with instant bump-clearing lift",
    summary:
      "Engineered for daily-driven vehicles requiring supple road absorption, noise isolation, and effortless height clearance when encountering speed bumps or steep driveways.",
    bestFor: "Daily commuters, family sedans, luxury cruisers, and highway drivers",
    recommendedComponents: [
      {
        name: "Progressive Sleeve / Double-Bellow Air Bags",
        categoryParam: "Air Bags",
        note: "Supple ride characteristics designed to absorb pavement cracks and road expansion joints.",
      },
      {
        name: "Air Management with Digital Presets",
        categoryParam: "Air Managements",
        note: "Simple 3-button memory presets for Daily, Lift (obstacles), and Park modes.",
      },
      {
        name: "High-Output Single 480C Compressor",
        categoryParam: "Air Compressors",
        note: "Reliable 100% duty-cycle unit with low operating noise levels.",
      },
      {
        name: "3-Gallon Seamless Aluminum Tank",
        categoryParam: "Air Tanks",
        note: "Compact footprint leaving full luggage space in the trunk.",
      },
      {
        name: "Inline Brass Element Water Trap",
        categoryParam: "Water Trap",
        note: "Continuous moisture elimination for zero valve maintenance.",
      },
    ],
    inquiryText:
      "مرحباً، أود استشارة فريق AirTouch Stance بخصوص تركيبة Air Suspension مخصصة للاستخدام اليومي والراحة (Daily Comfort & Versatility Setup) لسيارتي.",
  },
  {
    id: "stance",
    name: "Show Stance & Extreme Drop",
    badge: "Aggressive",
    tagline: "Maximum ground-drop, aggressive camber, and fast show presets",
    summary:
      "Built for drivers demanding millimeter-precise fender-to-lip fitment, extreme air-out parking posture, and ultra-fast height adjustments powered by dual high-output compressors.",
    bestFor: "Show builds, custom wheel fitments, automotive exhibitions, and stance enthusiasts",
    recommendedComponents: [
      {
        name: "Double-Bellow Bags & Adjustable Camber Plates",
        categoryParam: "Air Bags",
        note: "Allows negative camber tuning to tuck oversized wheel lips inside fender arches.",
      },
      {
        name: "AirTouch Pro GameBox Wireless Controller",
        categoryParam: "Air Managements",
        note: "Handheld handheld controller with 4 custom presets and instant valve response.",
      },
      {
        name: "Dual 480C / 580C Rapid Compressors",
        categoryParam: "Air Compressors",
        note: "Cuts tank recharge time in half for rapid successive air-up cycles.",
      },
      {
        name: "4-Gallon Seamless Aluminum Tank",
        categoryParam: "Air Tanks",
        note: "Maximum air volume for immediate simultaneous 4-wheel lift.",
      },
      {
        name: "Dual High-Efficiency Water Separators",
        categoryParam: "Water Trap",
        note: "Enhanced moisture capture for high-volume pneumatic cycling.",
      },
    ],
    inquiryText:
      "مرحباً، أود استشارة فريق AirTouch Stance بخصوص تركيبة Stance ووضعيات الركن المنخفضة (Show Stance & Extreme Drop Setup) لسيارتي.",
  },
  {
    id: "sport",
    name: "Dynamic Sport & Performance",
    badge: "Track & Handling",
    tagline: "Firm damping, reduced body roll, and balanced axle control",
    summary:
      "Tuned for drivers who love spirited driving. Combines 32-way rebound damping shock absorbers with heavy-duty anti-roll bars to prevent body roll while retaining ride-height versatility.",
    bestFor: "Hot hatches, sports coupes, aggressive canyon carving, and track-day versatility",
    recommendedComponents: [
      {
        name: "Threaded Struts with 32-Way Damping Adjusters",
        categoryParam: "Struts & Arms",
        note: "Allows fine-tuning shock valving stiffness to eliminate float and pitch.",
      },
      {
        name: "High-Tensile Anti-Roll Sway Bars",
        categoryParam: "Sway Bar",
        note: "Torsional stiffness reduction preventing vehicle chassis roll during hard cornering.",
      },
      {
        name: "Multi-Piston Big Brake Kit",
        categoryParam: "Brake",
        note: "High-friction floating rotors and forged calipers for fade-free stopping power.",
      },
      {
        name: "Heavy-Duty Reinforced Air Bags",
        categoryParam: "Air Bags",
        note: "Thicker rubber wall construction resisting high-G lateral forces.",
      },
      {
        name: "Independent 4-Corner Digital Pressure Control",
        categoryParam: "Air Managements",
        note: "Maintains exact corner-weight balance across left and right axles.",
      },
    ],
    inquiryText:
      "مرحباً، أود استشارة فريق AirTouch Stance بخصوص تركيبة رياضية وثبات عالي للسيارة (Dynamic Sport & Performance Setup) لسيارتي.",
  },
];

export default function BuildAdvisorSection() {
  const [activeProfileId, setActiveProfileId] = useState("daily");
  const activeProfile =
    BUILD_PROFILES.find((p) => p.id === activeProfileId) || BUILD_PROFILES[0];

  const whatsappUrl = getWhatsAppUrl(activeProfile.inquiryText);

  return (
    <section className="bg-[#fbfbfe] py-24 border-t border-[#040316]/6">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#ED3E00]" />
            <span className="text-[#ED3E00] text-xs font-bold tracking-[0.2em] uppercase">
              Guided Setup Finder
            </span>
            <span className="w-6 h-px bg-[#ED3E00]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#040316] leading-tight">
            Find the Right Setup for Your{" "}
            <span className="text-[#ED3E00]">Build</span>
          </h2>
          <p className="mt-4 text-[#040316]/60 text-sm md:text-base leading-relaxed">
            Every vehicle build has distinct requirements. Select your primary driving objective below to explore the ideal hardware pairing.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {BUILD_PROFILES.map((profile) => {
            const isSelected = profile.id === activeProfileId;
            return (
              <button
                key={profile.id}
                onClick={() => setActiveProfileId(profile.id)}
                className={`relative px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#040316] ${
                  isSelected
                    ? "bg-[#040316] text-white border-[#040316] shadow-md -translate-y-0.5"
                    : "bg-white text-[#040316]/70 border-[#040316]/10 hover:border-[#040316]/30 hover:text-[#040316]"
                }`}
              >
                <span>{profile.name}</span>
                <span
                  className={`ml-2 text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                    isSelected
                      ? "bg-white/20 text-[#ffeb20]"
                      : "bg-[#040316]/5 text-[#040316]/50"
                  }`}
                >
                  {profile.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Profile Card Container */}
        <div className="bg-white rounded-3xl border border-[#040316]/10 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Description & Objective */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <span className="text-[11px] font-bold text-[#ED3E00] uppercase tracking-widest block mb-2">
                  Recommended Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#040316] leading-snug">
                  {activeProfile.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[#040316]/80 italic">
                  &ldquo;{activeProfile.tagline}&rdquo;
                </p>
                <p className="mt-4 text-xs sm:text-sm text-[#040316]/60 leading-relaxed">
                  {activeProfile.summary}
                </p>

                <div className="mt-6 p-4 rounded-xl bg-[#040316]/3 border border-[#040316]/6 text-xs text-[#040316]/70">
                  <span className="font-bold text-[#040316] block mb-1">
                    Ideal Fitment:
                  </span>
                  {activeProfile.bestFor}
                </div>
              </div>

              {/* CTA Action */}
              <div className="mt-8 pt-6 border-t border-[#040316]/8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-xs sm:text-sm shadow-md"
                >
                  <MessageCircle size={16} />
                  <span>Inquire About This Setup on WhatsApp</span>
                </a>
                <p className="text-[11px] text-[#040316]/40 text-center mt-2">
                  Direct consultation with our suspension technicians.
                </p>
              </div>
            </div>

            {/* Right Column: Recommended Hardware Stack */}
            <div className="lg:col-span-7 bg-[#f8f9fa] rounded-2xl p-6 sm:p-8 border border-[#040316]/6">
              <h4 className="text-xs font-bold text-[#040316]/50 uppercase tracking-wider mb-5">
                Recommended Component Pairing ({activeProfile.recommendedComponents.length} Parts)
              </h4>

              <div className="space-y-4">
                {activeProfile.recommendedComponents.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 border border-[#040316]/6 shadow-2xs hover:border-[#040316]/20 transition-all flex items-start justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        size={17}
                        className="text-[#ED3E00] mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-sm text-[#040316] group-hover:text-[#ED3E00] transition-colors">
                          {item.name}
                        </h5>
                        <p className="text-xs text-[#040316]/55 mt-1 leading-relaxed">
                          {item.note}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/products?category=${encodeURIComponent(item.categoryParam)}`}
                      className="text-[11px] font-bold text-[#040316]/40 hover:text-[#040316] flex items-center gap-1 flex-shrink-0 pt-0.5 transition-colors"
                      title={`Browse ${item.categoryParam}`}
                    >
                      <span>Browse</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
