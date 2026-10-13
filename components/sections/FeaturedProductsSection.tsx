import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default async function FeaturedProductsSection() {
  const featured = await getFeaturedProducts(8);

  if (!featured || featured.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#fbfbfe] py-24 border-t border-[#040316]/6">
      <div className="container-max">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#ED3E00]" />
              <span className="text-[#ED3E00] text-xs font-bold tracking-[0.2em] uppercase">
                Curated Showcase
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#040316] leading-tight">
              Featured{" "}
              <span className="text-[#ED3E00]">Hardware</span>
            </h2>
            <p className="mt-4 text-[#040316]/60 max-w-xl text-sm md:text-base leading-relaxed">
              Explore standout components handpicked from our catalog. View detailed specifications or initiate a direct inquiry on WhatsApp.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#040316] border border-[#040316]/20 hover:border-[#040316] hover:bg-[#040316] hover:text-white px-5 py-3 rounded-xl transition-all self-start md:self-auto shadow-2xs"
          >
            <span>Explore Full Catalog</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#040316] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold">
              Looking for a specific vehicle fitment or custom part?
            </h4>
            <p className="text-xs sm:text-sm text-white/55 mt-1">
              Over 150+ components in stock and custom applications available on request.
            </p>
          </div>

          <Link
            href="/products"
            className="btn-primary text-xs whitespace-nowrap self-stretch sm:self-auto text-center"
          >
            Browse All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
