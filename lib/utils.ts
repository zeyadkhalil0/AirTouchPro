import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function formatImageUrl(img: string | null | undefined): string {
  if (!img) return "/images/logo.webp";
  // If already a full URL (Supabase storage or external), return as-is
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  // If it's a local path from the old site like ./src/image/..., convert
  if (img.startsWith("./src/image/") || img.startsWith("/src/image/")) {
    return img.replace(/^\.?\/src\/image\//, "/images/");
  }
  return img;
}

export function getWhatsAppUrl(customMessage?: string): string {
  const base = "https://wa.me/message/PAI63KN7BXX6H1";
  const defaultMessage =
    "مرحباً، أود الاستفسار عن أنظمة المساعدين الهوائية (Air Suspension) من AirTouch.";
  const text = (customMessage || defaultMessage).trim();
  return `${base}?text=${encodeURIComponent(text)}`;
}
