"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Tags,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  User,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tags },
];

type Props = {
  children: React.ReactNode;
  userEmail?: string;
};

export default function AdminSidebarClient({ children, userEmail }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────── */}
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-[#0d0d0d] flex flex-col transition-transform duration-300 lg:translate-x-0 border-r border-white/[0.06]",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/[0.06] flex-shrink-0">
          <Link href="/admin" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
            <Image
              src="/images/logo-white.webp"
              alt="AirTouch Stance"
              width={100}
              height={28}
              className="h-7 w-auto object-contain"
            />
            <span className="text-[9px] font-black bg-[#ffeb20] text-[#040316] px-1.5 py-0.5 tracking-widest rounded-sm">
              ADMIN
            </span>
          </Link>
          <button
            className="lg:hidden text-white/40 hover:text-white/80 transition-colors p-1"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 px-3" aria-label="Admin navigation">
          <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
          <div className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#ffeb20] text-[#040316] shadow-sm"
                      : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                  )}
                >
                  <Icon size={16} className="flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight size={13} />}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest px-3 mb-3">
              Site
            </p>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-white/80 hover:bg-white/[0.04] transition-all"
            >
              <ExternalLink size={15} className="flex-shrink-0" />
              View Public Site
            </a>
          </div>
        </nav>

        {/* User + Sign Out */}
        <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
          {userEmail && (
            <div className="flex items-center gap-2.5 px-1 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#ffeb20]/15 flex items-center justify-center flex-shrink-0">
                <User size={13} className="text-[#ffeb20]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-white/25 truncate">{userEmail}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white/35 hover:text-[#ED3E00] hover:bg-[#ED3E00]/[0.08] transition-all w-full disabled:opacity-50"
          >
            <LogOut size={13} className="flex-shrink-0" />
            {signingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* ── Main content ────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b border-white/[0.06] flex items-center gap-4 px-5 flex-shrink-0 bg-[#0d0d0d]">
          <button
            className="lg:hidden text-white/40 hover:text-white transition-colors p-1 -ml-1"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb-style page indicator */}
          <div className="flex-1 flex items-center gap-2 text-xs text-white/20 min-w-0">
            <span>AirTouch</span>
            <span>/</span>
            <span className="text-white/50 truncate capitalize">
              {pathname === "/admin"
                ? "Dashboard"
                : pathname.split("/").filter(Boolean).slice(1).join(" / ")}
            </span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-white/25 hover:text-white/60 transition-colors"
          >
            <ExternalLink size={12} />
            Public Site
          </a>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#111]">
          <div className="p-5 md:p-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
