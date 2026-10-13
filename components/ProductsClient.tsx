"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/types";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { ProductCard, ProductSkeleton } from "@/components/ProductCard";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Sync category from URL param if present
  useEffect(() => {
    if (initialCategory) {
      // Decode if needed and match against valid categories
      const decoded = decodeURIComponent(initialCategory);
      setActiveCategory(decoded);
    }
  }, [initialCategory]);

  const loadProducts = useCallback(async (indicateLoading = true) => {
    if (indicateLoading) setLoading(true);
    setError(null);
    const { data, error: supaErr } = await supabase
      .from("Products")
      .select("*")
      .order("id", { ascending: true });

    if (supaErr) {
      console.error("Supabase error:", supaErr);
      setError("Failed to load products. Please check your connection and try again.");
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
        setError("Failed to load products. Please check your connection and try again.");
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

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const resetAllFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  return (
    <>
      {/* ── Sticky Filter Bar ── */}
      <div className="border-b border-[#040316]/8 bg-[#fbfbfe]/95 backdrop-blur-md sticky top-16 md:top-20 z-30 shadow-2xs">
        <div className="container-max">
          {/* Mobile: Toggle and Count */}
          <div className="flex items-center justify-between py-3 md:hidden ">
            <p className="text-xs text-[#040316]/60">
              {loading
                ? "Loading products..."
                : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
              {activeCategory !== "All" && (
                <span className="ml-1 text-[#040316] font-bold">
                  in {activeCategory}
                </span>
              )}
            </p>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#040316] border border-[#040316]/15 rounded-xl px-3 py-1.5 hover:bg-black/5 transition-colors focus:outline-hidden cursor-pointer"
              aria-label="Toggle category filters"
            >
              <SlidersHorizontal size={13} />
              <span>Filters</span>
              {activeCategory !== "All" && (
                <span className="w-4 h-4 rounded-full bg-[#ED3E00] text-white text-[9px] font-bold flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Desktop Categories / Mobile Collapsible */}
          <div
            className={cn(
              "overflow-x-auto scrollbar-none transition-all duration-200",
              showFilters
                ? "max-h-32 pb-3 opacity-100"
                : "max-h-0 md:max-h-24 opacity-0 md:opacity-100"
            )}
          >
            <div className="flex items-center gap-2 py-3 min-w-max md:min-w-0 md:flex-wrap">
              {availableCategories.map((cat) => {
                const count = categoryCounts[cat];
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setShowFilters(false);
                    }}
                    className={cn(
                      "whitespace-nowrap cursor-pointer text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-150 flex-shrink-0 flex items-center gap-2 border focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ffeb20]",
                      isActive
                        ? "bg-[#040316] text-white border-[#040316] shadow-xs"
                        : "bg-white text-[#040316]/70 border-[#040316]/10 hover:text-[#040316] hover:border-[#040316]/30 hover:bg-black/[0.02]"
                    )}
                  >
                    <span>{cat}</span>
                    {typeof count === "number" && (
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-md font-mono",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#040316]/5 text-[#040316]/50"
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Status Bar ── */}
      <div className="container-max py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#040316]/35 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by name, category, fitment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 text-sm border border-[#040316]/12 rounded-xl bg-white placeholder:text-[#040316]/35 focus:outline-hidden focus:border-[#040316] focus:ring-1 focus:ring-[#040316] transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#040316]/40 hover:text-[#040316] p-1 rounded-full hover:bg-black/5"
              aria-label="Clear search query"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status / Active Filters Indicator */}
        <div className="flex items-center gap-3 text-xs text-[#040316]/60 w-full sm:w-auto justify-between sm:justify-end">
          {loading ? (
            <span>Loading product catalog...</span>
          ) : (
            <div className="flex items-center gap-2">
              <span>
                Showing{" "}
                <strong className="text-[#040316] font-bold">
                  {filtered.length}
                </strong>{" "}
                of {products.length} products
                {activeCategory !== "All" && (
                  <>
                    {" "}in{" "}
                    <span className="text-[#ED3E00] font-bold">
                      {activeCategory}
                    </span>
                  </>
                )}
              </span>

              {(activeCategory !== "All" || searchQuery) && (
                <button
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#040316]/70 hover:text-[#ED3E00] ml-2 px-2 py-1 rounded-md bg-[#040316]/5 hover:bg-[#ED3E00]/10 transition-colors"
                  title="Reset filters"
                >
                  <RotateCcw size={11} />
                  <span>Clear</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Product Grid Section ── */}
      <div className="container-max pb-24">
        {/* Error State */}
        {error && (
          <div className="text-center py-20 bg-white rounded-3xl border border-red-100 p-8 shadow-xs max-w-xl mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 text-xl">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-[#040316] mb-2">
              Catalog Unavailable
            </h3>
            <p className="text-[#040316]/60 text-sm mb-6 leading-relaxed">
              {error}
            </p>
            <button
              onClick={() => void loadProducts()}
              className="btn-primary text-xs"
            >
              Retry Loading Catalog
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {!error && loading && (
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!error && !loading && filtered.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-[#040316]/8 p-8 max-w-lg mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#040316]/5 flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-[#040316] mb-2">
              No matching products
            </h3>
            <p className="text-[#040316]/55 text-sm max-w-sm mx-auto leading-relaxed">
              {searchQuery
                ? `No results found for "${searchQuery}" in ${activeCategory === "All" ? "all categories" : activeCategory}.`
                : `No products currently available in the ${activeCategory} category.`}
            </p>
            <button
              onClick={resetAllFilters}
              className="btn-primary mt-6 text-xs inline-flex items-center gap-1.5"
            >
              <RotateCcw size={13} />
              <span>Reset Search & Filters</span>
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!error && !loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {filtered.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
