import Link from "next/link";
import {
  Activity,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface ComponentModule {
  step: string;
  name: string;
  role: string;
  icon: React.ElementType;
  description: string;
  keySpecs: string;
  categoryLink: string;
  categoryName: string;
}

const SYSTEM_MODULES: ComponentModule[] = [
  {
    step: "01",
    name: "Air Springs & Bellows",
    role: "Elevation & Dynamic Damping",
    icon: Layers,
    description:
      "Replaces conventional steel coil springs. Multi-ply rubber bellows inflate or deflate with pressurized air to raise or lower the vehicle's chassis while providing superior road vibration isolation.",
    keySpecs: "Up to 5.5” Travel • Multi-Ply Synthetic Rubber",
    categoryLink: "/products?category=Air+Bags",
    categoryName: "Air Bags",
  },
  {
    step: "02",
    name: "Digital Valve Manifold & ECU",
    role: "Independent 4-Corner Air Distribution",
    icon: Cpu,
    description:
      "The intelligence of the system. High-response 12V solenoid valves meter airflow to each wheel independently. Integrated digital pressure transducers communicate with wireless remotes and memory presets.",
    keySpecs: "8-Valve Dual In/Exhaust • Bluetooth & Wireless Remote",
    categoryLink: "/products?category=Air+Managements",
    categoryName: "Air Managements",
  },
  {
    step: "03",
    name: "Air Storage Reservoir",
    role: "Instant Pressurized Air Buffer",
    icon: Activity,
    description:
      "Seamless aluminum or steel storage holding pressurized air at 150–200 PSI. This enables instantaneous ride-height transitions (0 to full lift in seconds) without waiting for the compressor to pump from ambient pressure.",
    keySpecs: "3 & 4 Gallon Capacities • 200 PSI Working Limit",
    categoryLink: "/products?category=Air+Tanks",
    categoryName: "Air Tanks",
  },
  {
    step: "04",
    name: "High-Output Air Compressors",
    role: "Air Generation & System Recharge",
    icon: Zap,
    description:
      "Heavy-duty oil-less 12V compressors equipped with stainless steel braided leader lines and check valves. Automatically activates when reservoir pressure dips below preset operating levels.",
    keySpecs: "100% Duty Cycle @ 100 PSI • Thermal Cutoff Switch",
    categoryLink: "/products?category=Air+Compressors",
    categoryName: "Air Compressors",
  },
  {
    step: "05",
    name: "Water Trap & Filtration",
    role: "Pneumatic Protection & Longevity",
    icon: ShieldCheck,
    description:
      "Positioned between the compressor and tank. Captures atmospheric condensation and micro-particles generated during compression, preventing valve block corrosion and sticking.",
    keySpecs: "Brass Sintered Element • Semi-Auto Drain Valve",
    categoryLink: "/products?category=Water+Trap",
    categoryName: "Water Trap",
  },
];

export default function SystemArchitectureSection() {
  return (
    <section className="bg-[#040316] py-24 text-white relative overflow-hidden border-t border-white/5">
      {/* Subtle background ambient grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#ffeb20]" />
            <span className="text-[#ffeb20] text-xs font-bold tracking-[0.2em] uppercase">
              System Engineering
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Anatomy of an{" "}
            <span className="text-[#ffeb20]">Air Suspension Setup</span>
          </h2>
          <p className="mt-4 text-white/55 text-sm md:text-base leading-relaxed">
            Understanding how each component interacts ensures you select the optimal hardware combination for your vehicle’s weight, driving style, and stance preferences.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SYSTEM_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.step}
                className="bg-[#0a0a0f] border border-white/8 hover:border-white/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#ffeb20] bg-[#ffeb20]/10 px-2.5 py-1 rounded-md border border-[#ffeb20]/20">
                      STEP {mod.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/80 group-hover:text-[#ffeb20] group-hover:bg-[#ffeb20]/10 transition-colors">
                      <Icon size={18} />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#ED3E00] tracking-widest uppercase block mb-1">
                    {mod.role}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ffeb20] transition-colors mb-3">
                    {mod.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <div className="text-[11px] font-mono text-white/40 mb-3">
                    {mod.keySpecs}
                  </div>
                  <Link
                    href={mod.categoryLink}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffeb20] hover:text-white transition-colors"
                  >
                    <span>Explore {mod.categoryName}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Educational Summary Card */}
          <div className="bg-gradient-to-br from-[#121124] to-[#0a0a14] border border-[#ffeb20]/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-[10px] font-bold text-[#ffeb20] tracking-widest uppercase block mb-1">
                Complete Integration
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                Pre-Tested Component Synergy
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6">
                All AirTouch Stance components are pressure-tested and paired together to eliminate line cavitation, prevent fitting leaks, and maintain balanced damping across front and rear axles.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/products"
                className="btn-primary w-full text-center justify-center text-xs"
              >
                View Complete Parts Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
