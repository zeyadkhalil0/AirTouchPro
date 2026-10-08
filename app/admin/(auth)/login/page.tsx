"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const redirectTo = new URLSearchParams(window.location.search).get(
      "redirectTo"
    );
    const nextPath =
      redirectTo && redirectTo.startsWith("/admin") && !redirectTo.startsWith("/admin/login")
        ? redirectTo
        : "/admin";

    // Full navigation so the proxy sees the newly set auth cookies.
    window.location.assign(nextPath);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Image
            src="/images/logo-white.webp"
            alt="AirTouch Stance"
            width={140}
            height={40}
            className="h-10 w-auto object-contain mx-auto"
          />
          <p className="mt-4 text-white/30 text-sm">Admin Dashboard Access</p>
        </div>

        {/* Card */}
        <div className="bg-[#111] border border-white/5 p-8 rounded-2xl shadow-xl">
          <h1 className="text-xl font-bold text-white mb-6">Sign In</h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-white/30 uppercase tracking-wider mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#ffeb20] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-white/30 uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#ffeb20] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 p-1"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#ffeb20] text-[#040316] py-3 rounded-lg font-bold text-sm transition-all hover:bg-[#f5e000] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In to Admin
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <Link
              href="/"
              className="text-xs text-white/20 hover:text-white/50 transition-colors"
            >
              ← Return to Public Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
