"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { cn, formatImageUrl, getWhatsAppUrl } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/types";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

/* ─── Product Card ─────────────────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const imgSrc = formatImageUrl(product.img);
  const [imgError, setImgError] = useState(false);

  const badgeStyle =
    product.badge === "Premium"
      ? "bg-[#040316] text-white"
      : product.badge === "Hot"
      ? "bg-[#ED3E00] text-white"
      : product.badge === "New"
      ? "bg-[#00A8ED] text-white"
      : "bg-[#ffeb20] text-[#040316]";

  return (
    <div className="product-card bg-white border border-[#040316]/8 rounded-2xl overflow-hidden group flex flex-col shadow-sm hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-square bg-[#f8f8f8] overflow-hidden flex-shrink-0">
        <Image
          src={imgError || !imgSrc ? "/images/logo.webp" : imgSrc}
          alt={product.name}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={() => setImgError(true)}
          unoptimized={imgSrc.includes("/sign/")}
        />
        {product.badge && (
          <span
            className={cn(
              "absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-wider uppercase shadow-xs",
              badgeStyle
            )}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-[#ED3E00] tracking-widest uppercase">
          {product.category}
        </span>
        <h3 className="mt-1 font-bold text-[#040316] text-sm leading-snug line-clamp-2 flex-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-1.5 text-xs text-[#040316]/45 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="mt-3 pt-3 border-t border-[#040316]/5 flex items-center justify-between">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#040316] hover:text-[#ED3E00] transition-colors"
          >
            View Details
            <span className="bg-[#040316] text-[#ffeb20] px-1.5 py-0.5 rounded-md text-[10px] leading-none">
              →
            </span>
          </Link>
          <a
            href={getWhatsAppUrl(`مرحباً، أود الاستفسار عن المنتج: ${product.name}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#040316]/30 hover:text-[#25D366] transition-colors font-medium px-2 py-1 rounded-md hover:bg-black/5"
          >
            Inquire
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Skeleton ─────────────────────────────────────────────────── */
function ProductSkeleton() {
  return (
    <div className="bg-white border border-[#040316]/8 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-2.5">
        <div className="h-2.5 bg-gray-100 w-1/3 rounded-md" />
        <div className="h-4 bg-gray-100 w-3/4 rounded-md" />
        <div className="h-3 bg-gray-100 w-full rounded-md" />
        <div className="h-3 bg-gray-100 w-2/3 rounded-md" />
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const loadProducts = useCallback(async (indicateLoading = true) => {
    if (indicateLoading) setLoading(true);
    setError(null);
    const { data, error: supaErr } = await supabase
      .from("Products")
      .select("*")
      .order("id", { ascending: true });

    if (supaErr) {
      console.error("Supabase error:", supaErr);
      setError("Failed to load products. Please try again.");
    } else {
      setProducts(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    async function init() {
      const { data, error: supaErr } = await supabase
        .from("Products")
        .select("*")
        .order("id", { ascending: true });

      if (!active) return;
      if (supaErr) {
        console.error("Supabase error:", supaErr);
        setError("Failed to load products. Please try again.");
      } else {
        setProducts(data ?? []);
      }
      setLoading(false);
    }

    init();
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, activeCategory, searchQuery]);

  // Unique categories from actual data + hardcoded list
  const availableCategories = useMemo(() => {
    const fromData = new Set(products.map((p) => p.category));
    return PRODUCT_CATEGORIES.filter(
      (c) => c === "All" || fromData.has(c)
    );
  }, [products]);

  return (
    <>
      {/* ── Sticky Filter Bar ── */}
      <div className="border-b border-[#040316]/5 bg-[#fbfbfe] sticky top-16 md:top-20 z-30 shadow-sm">
        <div className="container-max">
          {/* Mobile: toggle */}
          <div className="flex items-center justify-between py-3 md:hidden">
            <p className="text-xs text-[#040316]/50">
              {loading
                ? "Loading..."
                : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
              {activeCategory !== "All" && (
                <span className="ml-1 text-[#040316] font-semibold">
                  in {activeCategory}
                </span>
              )}
            </p>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#040316] border border-[#040316]/15 rounded-lg px-3 py-1.5 hover:bg-black/5 transition-colors"
            >
              <SlidersHorizontal size={12} />
              Filters
              {activeCategory !== "All" && (
                <span className="w-4 h-4 rounded-full bg-[#ED3E00] text-white text-[9px] flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Desktop: always visible; Mobile: collapsible */}
          <div
            className={cn(
              "overflow-x-auto scrollbar-none transition-all duration-200",
              showFilters
                ? "max-h-24 pb-3 opacity-100"
                : "max-h-0 md:max-h-20 opacity-0 md:opacity-100"
            )}
          >
            <div className="flex items-center gap-2 py-3 min-w-max md:min-w-0 md:flex-wrap">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSearchQuery("");
                    setShowFilters(false);
                  }}
                  className={cn(
                    "whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150 flex-shrink-0 border",
                    activeCategory === cat
                      ? "bg-[#040316] text-white border-[#040316] shadow-xs"
                      : "bg-transparent text-[#040316]/50 border-[#040316]/10 hover:text-[#040316] hover:border-[#040316]/30 hover:bg-black/[0.02]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Search & Count Bar ── */}
      <div className="container-max py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#040316]/30 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 text-sm border border-[#040316]/10 rounded-lg bg-transparent placeholder:text-[#040316]/30 focus:outline-none focus:border-[#040316] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#040316]/30 hover:text-[#040316] p-1 rounded-full hover:bg-black/5"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Count */}
        <p className="text-xs text-[#040316]/40 hidden sm:block">
          {loading ? (
            "Loading products..."
          ) : (
            <>
              <span className="font-semibold text-[#040316]">
                {filtered.length}
              </span>{" "}
              product{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && (
                <>
                  {" "}in{" "}
                  <span className="text-[#040316] font-semibold">
                    {activeCategory}
                  </span>
                </>
              )}
            </>
          )}
        </p>
      </div>

      {/* ── Product Grid ── */}
      <div className="container-max pb-24">
        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-[#040316] mb-2">
              Connection Error
            </h3>
            <p className="text-[#040316]/50 text-sm mb-6">{error}</p>
            <button onClick={() => void loadProducts()} className="btn-primary">
              Try Again
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {!error && loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!error && !loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-[#040316] mb-2">
              No products found
            </h3>
            <p className="text-[#040316]/50 text-sm">
              {searchQuery
                ? `No results for "${searchQuery}" in ${activeCategory === "All" ? "all categories" : activeCategory}`
                : `No products in the ${activeCategory} category yet.`}
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="btn-primary mt-6 text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Products */}
        {!error && !loading && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
