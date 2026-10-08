import {
  Gauge,
  ShieldCheck,
  Sliders,
  Flame,
  Armchair,
  Road,
  Medal,
  Car,
} from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  gauge: Gauge,
  shield: ShieldCheck,
  sliders: Sliders,
  fire: Flame,
  couch: Armchair,
  road: Road,
  medal: Medal,
  car: Car,
};

export default function WhyUsSection() {
  return (
    <section id="why-us" className="bg-[#040316] py-24">
      <div className="container-max">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Why Choose Us</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
            Why{" "}
            <span className="text-[#ffeb20]">AirTouch</span> Suspension?
          </h2>
          <p className="mt-4 text-white/50">
            We deliver performance, reliability, and innovation in every system.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Gauge;
            return (
              <div
                key={item.title}
                className="bg-[#0a0a0a] p-8 rounded-2xl hover:bg-[#111] group transition-all duration-300 border border-white/5 hover:border-[#ffeb20]/20 shadow-md hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#ffeb20]/10 group-hover:bg-[#ffeb20]/20 transition-colors">
                  <Icon size={20} className="text-[#ffeb20]" />
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
