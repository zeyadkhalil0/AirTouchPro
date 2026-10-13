import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardData {
  title: string;
  categoryParam: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
}

const CATEGORIES: CategoryCardData[] = [
  {
    title: "Air Bags",
    categoryParam: "Air Bags",
    subtitle: "Springs & Bellows",
    description:
      "Multi-ply synthetic rubber air springs designed for extreme durability, maximum travel, and supple ride absorption.",
    image: "/images/Air Bags1.webp",
    badge: "Core Hardware",
  },
  {
    title: "Air Managements",
    categoryParam: "Air Managements",
    subtitle: "Digital ECUs & Manifolds",
    description:
      "High-flow solenoid valve blocks, real-time PSI digital sensors, and wireless Bluetooth control systems.",
    image: "/images/Air Managements95.webp",
    badge: "System Brain",
  },
  {
    title: "Air Compressors",
    categoryParam: "Air Compressors",
    subtitle: "Heavy-Duty Rapid Fill",
    description:
      "High-output 480C & 580C 12V air compressors delivering rapid recovery times and thermal overload protection.",
    image: "/images/Air Compressors84.webp",
    badge: "Power Units",
  },
  {
    title: "Air Tanks",
    categoryParam: "Air Tanks",
    subtitle: "Seamless Reservoirs",
    description:
      "Lightweight, anti-corrosion seamless aluminum tanks tested to 200 PSI for instant valve responsiveness.",
    image: "/images/Air Tanks116.webp",
    badge: "Air Reserve",
  },
  {
    title: "Brake Systems",
    categoryParam: "Brake",
    subtitle: "Big Brake Kits",
    description:
      "Forged multi-piston calipers paired with floating slotted rotors engineered for track-level stopping power.",
    image: "/images/Brake124.webp",
    badge: "Performance",
  },
  {
    title: "Struts & Arms",
    categoryParam: "Struts & Arms",
    subtitle: "Damping Shocks & Camber",
    description:
      "Threaded shock bodies, 32-way rebound damping, and adjustable spherical pillowball camber plates.",
    image: "/images/Struts & Arms167.webp",
    badge: "Suspension Link",
  },
  {
    title: "Water Traps",
    categoryParam: "Water Trap",
    subtitle: "Moisture & Debris Filters",
    description:
      "High-efficiency particulate filtration safeguarding solenoid manifolds from line condensation and moisture.",
    image: "/images/Water Trap187.webp",
    badge: "Protection",
  },
  {
    title: "Sway Bars",
    categoryParam: "Sway Bar",
    subtitle: "Anti-Roll Reinforcement",
    description:
      "High-tensile alloy anti-roll bars engineered to minimize body roll and stabilize chassis geometry.",
    image: "/images/Sway Bar186.webp",
    badge: "Chassis Control",
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-[#040316] py-24 border-t border-white/5 relative overflow-hidden">
      {/* Subtle radial ambient backdrop */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#ffeb20]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-[#ED3E00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#ffeb20]" />
              <span className="text-[#ffeb20] text-xs font-bold tracking-[0.2em] uppercase">
                Product Discovery
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Explore by{" "}
              <span className="text-[#ffeb20]">Category</span>
            </h2>
            <p className="mt-4 text-white/55 max-w-xl text-sm md:text-base leading-relaxed">
              Explore our comprehensive range of air suspension components, digital management systems, and precision chassis upgrades.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-white border border-white/20 hover:border-[#ffeb20] hover:text-[#ffeb20] px-4 py-2.5 rounded-xl transition-all self-start md:self-auto"
          >
            <span>View All Categories</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={`/products?category=${encodeURIComponent(cat.categoryParam)}`}
              className="group bg-[#0a0a0e] border border-white/8 hover:border-[#ffeb20]/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl hover:shadow-[#ffeb20]/5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ffeb20]"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full bg-[#121217] overflow-hidden flex items-center justify-center border-b border-white/5">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain p-5 group-hover:scale-108 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Badge Tag */}
                {cat.badge && (
                  <div className="absolute top-3 left-3 bg-[#040316]/85 backdrop-blur-xs text-white/80 text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10 uppercase tracking-wider">
                    {cat.badge}
                  </div>
                )}

                <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-[#040316] group-hover:bg-[#ffeb20] group-hover:border-[#ffeb20] transition-all">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#ED3E00] tracking-widest uppercase">
                    {cat.subtitle}
                  </span>
                  <h3 className="mt-1 text-lg font-black text-white group-hover:text-[#ffeb20] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/50 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-white/40 group-hover:text-white transition-colors">
                  <span>Browse Components</span>
                  <span className="text-[#ffeb20] font-bold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
