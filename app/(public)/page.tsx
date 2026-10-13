import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import AirTouchProSection from "@/components/sections/AirTouchProSection";
import SystemArchitectureSection from "@/components/sections/SystemArchitectureSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import BuildAdvisorSection from "@/components/sections/BuildAdvisorSection";
import StatsSection from "@/components/sections/StatsSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BrandsSection from "@/components/sections/BrandsSection";
import ConsultationCtaSection from "@/components/sections/ConsultationCtaSection";
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
      <CategoriesSection />
      <FeaturedProductsSection />
      <AirTouchProSection />
      <SystemArchitectureSection />
      <CollectionsSection />
      <BuildAdvisorSection />
      <StatsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <BrandsSection />
      <ConsultationCtaSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
