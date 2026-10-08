import Image from "next/image";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#fbfbfe] py-24">
      <div className="container-max">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-label">Testimonials</span>
            <h2 className="mt-3 text-4xl font-black text-[#040316]">
              What Our Clients Say
            </h2>
          </div>
          <p className="text-[#040316]/50 max-w-xs text-sm">
            Real experiences from real drivers who trusted AirTouch with their
            builds.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-[#040316] p-8 rounded-2xl border border-white/5 shadow-md flex flex-col justify-between group transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <Quote size={24} className="text-[#ffeb20] mb-5" />
                <p className="text-white/70 leading-relaxed text-sm">
                  {t.quote}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                <div className="relative w-10 h-10 overflow-hidden rounded-full flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {t.author}
                  </h4>
                  <span className="text-white/30 text-xs">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
