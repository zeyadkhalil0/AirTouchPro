import { SITE_CONFIG } from "@/lib/constants";

export default function StatsSection() {
  return (
    <section className="bg-[#ffeb20] py-16">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {SITE_CONFIG.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl md:text-5xl font-black text-[#040316]">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-[#040316]/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
