import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag } from "lucide-react";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { formatImageUrl, getWhatsAppUrl } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description ?? `View details for ${product.name}`,
    openGraph: {
      title: product.name,
      description: product.description ?? `AirTouch ${product.category}`,
      images: product.img ? [{ url: formatImageUrl(product.img) }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) notFound();

  const related = await getRelatedProducts(product.category, product.id, 4);
  const imgSrc = formatImageUrl(product.img);
  const isSignedUrl = imgSrc.includes("/sign/");

  return (
    <div className="min-h-screen bg-[#fbfbfe]">
      {/* Breadcrumb */}
      <div className="bg-[#040316] pt-24 pb-6">
        <div className="container-max">
          <nav className="flex items-center gap-2 text-xs text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white/60 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white/60">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product */}
      <div className="container-max py-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-[#040316]/50 hover:text-[#040316] mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square bg-[#f8f8f8] overflow-hidden">
              <Image
                src={imgSrc}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized={isSignedUrl}
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#040316] text-white text-xs font-bold px-3 py-1.5 tracking-wider uppercase">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:pt-4">
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-4">
              <Tag size={14} className="text-[#ED3E00]" />
              <span className="text-sm font-semibold text-[#ED3E00] uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-[#040316] leading-tight">
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-6 text-[#040316]/60 leading-relaxed text-base">
                {product.description}
              </p>
            )}

            {/* Specs if available */}
            {product.specs && (
              <div className="mt-8">
                <h3 className="font-bold text-[#040316] mb-3 text-sm uppercase tracking-wider">
                  Specifications
                </h3>
                <div className="bg-[#040316]/3 p-4 text-sm text-[#040316]/70 whitespace-pre-line leading-relaxed">
                  {product.specs}
                </div>
              </div>
            )}

            {/* Info row */}
            <div className="mt-8 p-6 border border-[#040316]/8 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#040316]/40 font-medium">Category</span>
                <span className="font-semibold text-[#040316]">{product.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-[#040316]/5 pt-3">
                <span className="text-[#040316]/40 font-medium">Product ID</span>
                <span className="font-semibold text-[#040316]">#{product.id}</span>
              </div>
              {product.badge && (
                <div className="flex items-center justify-between text-sm border-t border-[#040316]/5 pt-3">
                  <span className="text-[#040316]/40 font-medium">Status</span>
                  <span className="font-semibold text-[#ED3E00]">{product.badge}</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={getWhatsAppUrl(`مرحباً، أود الاستفسار عن تفاصيل وسعر المنتج: ${product.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Inquire via WhatsApp
              </a>
              <Link href="/#contact" className="btn-secondary !text-[#040316] !border-[#040316]/20 hover:!border-[#040316]">
                Send Inquiry
              </Link>
            </div>

            <p className="mt-4 text-xs text-[#040316]/30">
              This product is available for inquiry only. We do not process
              online orders.
            </p>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[#040316]">
                Related Products
              </h2>
              <Link
                href="/products"
                className="text-sm font-semibold text-[#040316]/40 hover:text-[#040316] transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => {
                const rImg = formatImageUrl(p.img);
                const rSigned = rImg.includes("/sign/");
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="group border border-[#040316]/8 overflow-hidden product-card bg-white"
                  >
                    <div className="relative aspect-square bg-[#f8f8f8]">
                      <Image
                        src={rImg}
                        alt={p.name}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        sizes="25vw"
                        unoptimized={rSigned}
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] text-[#ED3E00] font-semibold uppercase tracking-wider">
                        {p.category}
                      </p>
                      <p className="text-xs font-bold text-[#040316] mt-0.5 line-clamp-2">
                        {p.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
