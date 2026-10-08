import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import AirTouchProSection from "@/components/sections/AirTouchProSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BrandsSection from "@/components/sections/BrandsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CollectionsSection />
      <AirTouchProSection />
      <StatsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <BrandsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
