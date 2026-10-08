import Image from "next/image";

const BRANDS = [
  "/images/brand1.webp",
  "/images/brand2.webp",
  "/images/brand3.webp",
  "/images/brand4.webp",
  "/images/brand5.webp",
  "/images/brand6.webp",
];

export default function BrandsSection() {
  return (
    <section className="bg-[#fbfbfe] py-16 border-y border-[#040316]/5">
      <div className="container-max">
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-[#040316]/30 mb-10">
          Trusted by leading automotive brands
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {BRANDS.map((src, i) => (
            <div key={i} className="flex items-center justify-center">
              <Image
                src={src}
                alt={`Partner brand ${i + 1}`}
                width={80}
                height={40}
                className="object-contain opacity-40 hover:opacity-70 transition-opacity filter grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
