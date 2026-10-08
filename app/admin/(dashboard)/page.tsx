import type { Metadata } from "next";
import Link from "next/link";
import { Package, Tags, Plus, ArrowRight, Clock } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function getDashboardStats() {
  const supabase = await createServerClient();
  const [{ data: products }, { data: recent }] = await Promise.all([
    supabase.from("Products").select("id, category"),
    supabase
      .from("Products")
      .select("id, name, category, badge, created_at")
      .order("id", { ascending: false })
      .limit(8),
  ]);

  const categories = new Set((products ?? []).map((p: { category: string }) => p.category));
  return {
    totalProducts: products?.length ?? 0,
    totalCategories: categories.size,
    recent: recent ?? [],
  };
}

const BADGE_STYLES: Record<string, string> = {
  Premium: "bg-white/10 text-white",
  Hot: "bg-[#ED3E00]/15 text-[#ED3E00]",
  New: "bg-[#00A8ED]/15 text-[#00A8ED]",
  Sale: "bg-[#ffeb20]/15 text-[#ffeb20]",
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      href: "/admin/products",
      accent: "#ffeb20",
      bg: "bg-[#ffeb20]/[0.06]",
    },
    {
      label: "Categories",
      value: stats.totalCategories,
      icon: Tags,
      href: "/admin/categories",
      accent: "#00A8ED",
      bg: "bg-[#00A8ED]/[0.06]",
    },
  ];

  return (
    <div className="space-y-7">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Dashboard</h1>
          <p className="mt-0.5 text-white/30 text-sm">
            Welcome back — here&apos;s your product overview.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#ffeb20] text-[#040316] px-5 py-2.5 text-sm font-bold hover:bg-[#f5e000] transition-colors rounded-lg shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group bg-[#1a1a1a] rounded-xl p-6 hover:bg-[#1f1f1f] transition-colors border border-white/[0.04]"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${card.bg} mb-4`}>
                <Icon size={18} style={{ color: card.accent }} />
              </div>
              <div className="text-4xl font-black text-white mb-1 tabular-nums">
                {card.value}
              </div>
              <div className="text-xs text-white/35 font-medium flex items-center gap-1">
                {card.label}
                <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#1f1f1f] border border-white/[0.04] rounded-xl p-4 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#ffeb20]/10 flex items-center justify-center flex-shrink-0">
            <Plus size={15} className="text-[#ffeb20]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Add New Product</p>
            <p className="text-xs text-white/30 mt-0.5">Upload image & details</p>
          </div>
          <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-white/50 transition-colors" />
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#1f1f1f] border border-white/[0.04] rounded-xl p-4 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
            <Package size={15} className="text-white/50" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Manage Products</p>
            <p className="text-xs text-white/30 mt-0.5">Edit, delete, filter</p>
          </div>
          <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-white/50 transition-colors" />
        </Link>
      </div>

      {/* ── Recent Products ── */}
      <div className="bg-[#1a1a1a] rounded-xl border border-white/[0.04] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-white/30" />
            <h2 className="font-bold text-white text-sm">Recently Added</h2>
          </div>
          <Link
            href="/admin/products"
            className="text-xs text-white/30 hover:text-[#ffeb20] transition-colors flex items-center gap-1"
          >
            View All
            <ArrowRight size={11} />
          </Link>
        </div>

        {stats.recent.length === 0 ? (
          <div className="py-12 text-center text-white/20 text-sm">
            No products yet
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {stats.recent.map((p: { id: number; name: string; category: string; badge: string | null }) => (
              <div
                key={p.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{p.name}</p>
                  <p className="text-xs text-white/25 mt-0.5">{p.category}</p>
                </div>
                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                  {p.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        BADGE_STYLES[p.badge] ?? "bg-white/10 text-white/60"
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-xs text-white/25 hover:text-[#ffeb20] transition-colors font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
