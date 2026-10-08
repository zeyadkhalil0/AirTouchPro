"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ChevronRight } from "lucide-react";

const HERO_IMAGES = [
  "/images/desktop-hero1.webp",
  "/images/desktop-hero2.webp",
  "/images/desktop-hero3.webp",
  "/images/desktop-hero4.webp",
  "/images/desktop-hero5.webp",
];

const MOBILE_HERO_IMAGES = [
  "/images/mobile-hero-1.webp",
  "/images/mobile-hero-2.webp",
  "/images/mobile-hero-3.webp",
  "/images/mobile-hero-4.webp",
  "/images/mobile-hero-5.webp",
];

export default function HeroSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#040316]">
      {/* Desktop bg images */}
      {HERO_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`AirTouch Stance hero ${i + 1}`}
          fill
          className={`hidden md:block object-cover transition-opacity duration-1000 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
          sizes="100vw"
        />
      ))}

      {/* Mobile bg images */}
      {MOBILE_HERO_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`AirTouch Stance mobile hero ${i + 1}`}
          fill
          className={`block md:hidden object-cover transition-opacity duration-1000 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
          sizes="100vw"
        />
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#040316]/90 via-[#040316]/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040316]/80 via-transparent to-[#040316]/30 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container-max w-full">
          <div className="max-w-2xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-3 mt-8">
              <div className="w-8 h-px bg-[#ffeb20]" />
              <span className="text-[#ffeb20] text-xs font-semibold tracking-[0.2em] uppercase">
                AirTouch Stance — Since 2019
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Precision.
              <br />
              <span className="text-[#ffeb20]">Performance.</span>
              <br />
              Stance.
            </h1>

            {/* Subhead */}
            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
              Premium air suspension systems engineered for drivers who demand
              full control over their ride height — from track low to daily
              drive in seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Link href="/products" className="btn-primary">
                Explore Products
                <ChevronRight size={16} />
              </Link>
              <a href="#airtouch-pro" className="btn-secondary">
                AirTouch Pro
                <span className="ml-1 inline-block px-1.5 py-0.5 rounded-md bg-[#ffeb20] text-[#040316] text-[10px] font-bold leading-none">
                  NEW
                </span>
              </a>
            </div>

            {/* Stats mini */}
            <div className="flex items-center gap-8 mt-14 pt-8 border-t border-white/10">
              {[
                { v: "10+", l: "Years" },
                { v: "500+", l: "Clients" },
                { v: "1200+", l: "Projects" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-black text-[#ffeb20]">{s.v}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === idx ? "w-8 bg-[#ffeb20]" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 right-8 z-20 text-white/30 hover:text-[#ffeb20] p-2 rounded-full hover:bg-white/5 transition-colors flex flex-col items-center gap-2"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.15em] uppercase writing-mode-vertical">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
