import Image from "next/image";
import Link from "next/link";

const COLLECTIONS = [
  {
    title: "Audi Collection",
    subtitle: "Air Suspension",
    description:
      "AirTouch in Audi gives you high stability on the road with great comfort, and lets you control the car's height depending on speed and road conditions.",
    image: "/images/desktop-hero3.webp",
    reverse: false,
  },
  {
    title: "Golf Collection",
    subtitle: "Air Suspension",
    description:
      "AirTouch in the Golf combines sporty looks with full control, allowing you to lower the car for style or raise it for daily driving easily.",
    image: "/images/collection2.webp",
    reverse: true,
  },
  {
    title: "Mercedes Collection",
    subtitle: "Air Suspension",
    description:
      "AirTouch in Mercedes offers a luxury driving experience, excellent shock absorption, and smart control of the car's level in all conditions.",
    image: "/images/collection1.webp",
    reverse: false,
  },
];

export default function CollectionsSection() {
  return (
    <section id="collections" className="bg-[#040316] py-24">
      <div className="container-max">
        {/* Heading */}
        <div className="max-w-2xl mb-16">
          <span className="section-label">Our Collection</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
            Premium Air Suspension
            <br />
            <span className="text-[#ffeb20]">Systems</span>
          </h2>
          <p className="mt-4 text-white/50 leading-relaxed">
            Designed to deliver comfort, performance, and full control for your
            ride.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {COLLECTIONS.map((col, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                col.reverse ? "md:flex-row-reverse" : "md:flex-row"
              } gap-0 overflow-hidden rounded-2xl border border-white/5 shadow-lg`}
            >
              {/* Image */}
              <div className="md:w-1/2 relative aspect-[16/9] md:aspect-auto min-h-[260px]">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="md:w-1/2 bg-[#0a0a0a] p-10 md:p-14 flex flex-col justify-center">
                <span className="section-label">{col.subtitle}</span>
                <h3 className="mt-3 text-2xl md:text-3xl font-black text-white">
                  {col.title}
                </h3>
                <p className="mt-4 text-white/50 leading-relaxed">
                  <span className="text-[#ED3E00] font-semibold">
                    AirTouch
                  </span>{" "}
                  {col.description}
                </p>
                <div className="mt-8">
                  <Link href="/products" className="btn-primary inline-flex">
                    Explore Products
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
