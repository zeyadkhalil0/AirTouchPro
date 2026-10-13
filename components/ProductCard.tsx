"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, formatImageUrl, getWhatsAppUrl } from "@/lib/utils";
import type { Product } from "@/types";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const BADGE_STYLES: Record<string, string> = {
  Premium:
    "bg-[#040316] text-white border border-white/20 shadow-xs",
  Hot:
    "bg-[#ED3E00] text-white border border-red-400/20 shadow-xs",
  New:
    "bg-[#00A8ED] text-white border border-sky-300/20 shadow-xs",
  "Best Seller":
    "bg-[#ffeb20] text-[#040316] border border-black/10 shadow-xs font-black",
};

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const imgSrc = formatImageUrl(product.img);
  const [imgError, setImgError] = useState(false);

  const badgeClass =
    (product.badge && BADGE_STYLES[product.badge]) ||
    "bg-[#040316] text-white border border-white/10";

  const isSignedOrExternal =
    imgSrc.includes("/sign/") || imgSrc.includes("supabase.co");

  const whatsappInquiryUrl = getWhatsAppUrl(
    `مرحباً، أود الاستفسار عن توفر وسعر منتج: ${product.name} (كود: #${product.id} - تصنيف: ${product.category})`
  );

  return (
    <article className="product-card group relative bg-white border border-[#040316]/8 hover:border-[#040316]/20 rounded-2xl overflow-hidden flex flex-col h-full shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-gradient-to-b from-[#f8f9fa] to-[#f0f2f5] overflow-hidden flex items-center justify-center border-b border-[#040316]/5 flex-shrink-0">
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 z-0 flex items-center justify-center p-4 focus:outline-hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={imgError || !imgSrc ? "/images/logo.webp" : imgSrc}
            alt={product.name}
            fill
            priority={priority}
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
            unoptimized={isSignedOrExternal}
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {product.badge ? (
            <span
              className={cn(
                "text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase",
                badgeClass
              )}
            >
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          {/* Product Code */}
          <span className="text-[10px] font-mono font-medium text-[#040316]/40 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#040316]/6 shadow-2xs">
            #{product.id}
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#ED3E00] tracking-widest uppercase">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-[#040316] text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.75rem] group-hover:text-[#ED3E00] transition-colors">
          <Link
            href={`/products/${product.id}`}
            className="hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ffeb20] rounded-sm"
          >
            {product.name}
          </Link>
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs text-[#040316]/55 line-clamp-2 leading-relaxed min-h-[2rem]">
          {product.description ||
            `AirTouch ${product.category} precision-engineered for performance and reliability.`}
        </p>

        {/* Action Row */}
        <div className="mt-4 pt-3.5 border-t border-[#040316]/6 flex items-center gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#040316] text-white hover:bg-[#ED3E00] transition-colors duration-200 shadow-xs group/btn focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ffeb20]"
          >
            <span>View Details</span>
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </Link>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
            className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-[#040316]/10 text-[#040316]/70 hover:text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-colors duration-200 flex-shrink-0 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#25D366]"
            title="Inquire via WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-current" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function ProductSkeleton() {
  return (
    <div className="bg-white border border-[#040316]/8 rounded-2xl overflow-hidden animate-pulse flex flex-col h-full shadow-xs">
      <div className="aspect-square bg-neutral-100 flex-shrink-0" />
      <div className="p-4 sm:p-5 flex flex-col flex-1 space-y-3">
        <div className="h-3 bg-neutral-200 w-1/4 rounded-md" />
        <div className="h-5 bg-neutral-200 w-4/5 rounded-md" />
        <div className="space-y-1.5">
          <div className="h-3 bg-neutral-100 w-full rounded-md" />
          <div className="h-3 bg-neutral-100 w-2/3 rounded-md" />
        </div>
        <div className="mt-auto pt-4 border-t border-[#040316]/5 flex items-center gap-2">
          <div className="h-10 bg-neutral-200 rounded-xl flex-1" />
          <div className="h-10 w-10 bg-neutral-100 rounded-xl flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
