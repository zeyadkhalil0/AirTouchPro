"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn, getWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/#collections" },
  { label: "AirTouch Pro", href: "/#airtouch-pro" },
  { label: "Products", href: "/products" },
  { label: "Why Us", href: "/#why-us" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#040316]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <nav className="container-max flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={SITE_CONFIG.logo}
            alt="AirTouch Stance"
            width={140}
            height={40}
            className="h-32 md:h-30 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-[#ffeb20] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={getWhatsAppUrl("مرحباً، أود التواصل مع فريق AirTouch Stance والاستفسار عن خدماتكم.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2 cursor-pointer rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-[#040316] border-b border-white/10",
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="container-max flex flex-col gap-0 pb-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm text-white/80 hover:text-[#ffeb20] border-b border-white/5 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <a
              href={getWhatsAppUrl("مرحباً، أود التواصل مع فريق AirTouch Stance والاستفسار عن خدماتكم.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-sm"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
