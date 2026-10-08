import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040316] text-white/60">
      {/* Top CTA Bar */}
      <div className="border-b border-white/5">
        <div className="container-max py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">
              Ready to transform your ride?
            </h3>
            <p className="mt-1 text-sm text-white/50">
              Contact our team for a personalized consultation.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={getWhatsAppUrl("مرحباً، أود التواصل مع فريق AirTouch Stance والاستفسار عن خدماتكم.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp Us
            </a>
            <Link href="/products" className="btn-secondary">
              View Products
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src={SITE_CONFIG.logo}
              alt="AirTouch Stance"
              width={140}
              height={40}
              className="h-8 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Premium air suspension systems designed for performance, comfort,
              and full control. Since 2019.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 text-white/50 hover:border-[#ffeb20] hover:text-[#ffeb20] hover:bg-white/5 transition-colors"
                aria-label="Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 text-white/50 hover:border-[#ffeb20] hover:text-[#ffeb20] hover:bg-white/5 transition-colors"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 text-white/50 hover:border-[#ffeb20] hover:text-[#ffeb20] hover:bg-white/5 transition-colors"
                aria-label="TikTok"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.03-8.06a8.18 8.18 0 0 0 4.78 1.52V5.32a4.85 4.85 0 0 1-1-.63z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "AirTouch Pro", href: "/#airtouch-pro" },
                { label: "Collections", href: "/#collections" },
                { label: "FAQ", href: "/#faq" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-[#ffeb20] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Installation Guide",
                "Warranty Policy",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <span className="text-white/50 cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={SITE_CONFIG.contact.addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/50 hover:text-[#ffeb20] transition-colors"
                >
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#ED3E00]" />
                  {SITE_CONFIG.contact.address}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/50 hover:text-[#ffeb20] transition-colors"
                >
                  <Phone size={14} className="flex-shrink-0 text-[#ED3E00]" />
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-3 text-white/50 hover:text-[#ffeb20] transition-colors"
                >
                  <Mail size={14} className="flex-shrink-0 text-[#ED3E00]" />
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="container-max py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {currentYear} AirTouch Stance. All rights reserved.</p>
          <p>
            Designed & developed by{" "}
            <a
              href="https://codezeesocialist.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffeb20] transition-colors"
            >
              Zeyad Muhammad Khalil
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
