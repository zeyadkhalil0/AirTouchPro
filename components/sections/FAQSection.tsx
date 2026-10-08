import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQSection() {
  return (
    <section id="faq" className="bg-[#040316] py-24">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left */}
          <div className="lg:col-span-4">
            <span className="section-label">FAQ</span>
            <h2 className="mt-3 text-4xl font-black text-white leading-tight">
              Frequently Asked
              <br />
              Questions
            </h2>
            <p className="mt-4 text-white/40 text-sm leading-relaxed">
              Everything you need to know about air suspension systems. Can&apos;t
              find an answer? Contact our team.
            </p>
            <a
              href="#contact"
              className="inline-block mt-8 btn-primary"
            >
              Ask a Question
            </a>
          </div>

          {/* Right */}
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <details key={i} className="group bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden shadow-sm transition-colors">
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                    <h3 className="font-semibold text-white text-sm pr-4">
                      {item.question}
                    </h3>
                    <Plus
                      size={18}
                      className="text-[#ffeb20] flex-shrink-0 transition-transform group-open:rotate-45"
                    />
                  </summary>
                  <div className="px-6 pb-6 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
