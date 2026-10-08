import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const SERVICES = [
  "Air Suspension Spare Parts",
  "Premium Air Suspension Kits",
  "Car Brake Systems",
  "Steering Wheels",
  "Custom Wheels & Rims",
  "Coilovers",
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#fbfbfe] py-24">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/desktop-hero1.webp"
                alt="AirTouch air suspension system"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Accent corner */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#ffeb20] rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#ffeb20] rounded-br-2xl" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 bg-[#040316] text-white px-6 py-4 rounded-xl shadow-xl border border-white/10 hidden md:block">
              <div className="text-3xl font-black text-[#ffeb20]">2019</div>
              <div className="text-xs text-white/50 mt-0.5">Founded</div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="section-label">About Us</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#040316] leading-tight">
              Built for Performance.
              <br />
              Designed for Comfort.
            </h2>

            <p className="mt-6 text-[#040316]/60 leading-relaxed">
              At{" "}
              <strong className="text-[#040316] font-semibold">
                AirTouch Stance
              </strong>
              , we specialize in high-quality air suspension systems that
              transform your driving experience. Whether you&apos;re looking for
              superior comfort, improved handling, or a bold custom stance, our
              solutions are engineered to deliver.
            </p>

            <p className="mt-4 text-[#040316]/60 leading-relaxed">
              Our mission is simple: combine innovation, durability, and style
              to give drivers full control over their ride height and
              performance — without compromising reliability.
            </p>

            {/* Services list */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-[#ED3E00] flex-shrink-0"
                  />
                  <span className="text-sm text-[#040316]/70">{service}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link href="/products" className="btn-primary">
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
