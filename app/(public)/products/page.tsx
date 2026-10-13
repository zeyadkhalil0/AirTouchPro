import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";
import { ProductSkeleton } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Products — Air Suspension Catalog",
  description:
    "Browse our complete catalog of premium air suspension systems, air bags, compressors, management systems, brake components, and more.",
};

function ProductsLoading() {
  return (
    <div className="container-max py-12">
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfe]">
      {/* Page Header */}
      <div className="bg-[#040316] pt-28 pb-16">
        <div className="container-max">
          <span className="section-label">Product Catalog</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
            All Products
          </h1>
          <p className="mt-4 text-white/50 max-w-xl">
            Premium air suspension components, management systems, brake parts,
            and more — all engineered for performance and reliability.
          </p>
        </div>
      </div>

      <Suspense fallback={<ProductsLoading />}>
        <ProductsClient />
      </Suspense>
    </div>
  );
}
