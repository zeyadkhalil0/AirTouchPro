import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/utils";

export default function WhatsAppButton() {
  const whatsappUrl = getWhatsAppUrl(
    "مرحباً، أود الاستفسار عن أنظمة المساعدين الهوائية AirTouch Stance."
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition-all group"
    >
      <Image
        src="/contact-me-icon.png"
        alt="WhatsApp Contact"
        width={56}
        height={56}
        className="w-full h-full object-contain"
      />
      <span className="absolute right-16 bg-[#040316] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md" dir="rtl">
        تواصل معنا عبر واتساب
      </span>
    </a>
  );
}
