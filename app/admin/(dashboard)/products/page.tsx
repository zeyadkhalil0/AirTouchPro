"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { formatImageUrl } from "@/lib/utils";
import type { Product } from "@/types";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

const PAGE_SIZE = 20;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async (indicateLoading = true) => {
    if (indicateLoading) setLoading(true);
    let query = supabase
      .from("Products")
      .select("*")
      .order("id", { ascending: false });

    if (category !== "All") {
      query = query.eq("category", category);
    }
    if (search.trim()) {
      query = query.ilike("name", `%${search.trim()}%`);
    }

    const { data } = await query;
    setProducts(data ?? []);
    setPage(0);
    setLoading(false);
  }, [category, search]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      let query = supabase
        .from("Products")
        .select("*")
        .order("id", { ascending: false });

      if (category !== "All") {
        query = query.eq("category", category);
      }
      if (search.trim()) {
        query = query.ilike("name", `%${search.trim()}%`);
      }

      const { data } = await query;
      if (ignore) return;
      setProducts(data ?? []);
      setPage(0);
      setLoading(false);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [category]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleDelete(id: number) {
    setDeleting(true);
    const { error } = await supabase.from("Products").delete().eq("id", id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
    setDeleteId(null);
    setDeleting(false);
  }

  const paginated = products.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Products</h1>
          <p className="mt-1 text-white/30 text-sm">
            {loading ? "Loading..." : `${products.length} products`}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#ffeb20] text-[#040316] px-4 py-2 text-sm font-bold hover:bg-[#f5e000] rounded-lg transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
            className="w-full pl-9 pr-4 py-2.5 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#ffeb20] transition-colors"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm px-3 py-2.5 focus:outline-none focus:border-[#ffeb20] transition-colors"
        >
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider">
                  Badge
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-5 py-4" colSpan={4}>
                      <div className="h-4 bg-white/5 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-12 text-white/20 text-sm"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                paginated.map((product) => {
                  const img = formatImageUrl(product.img);
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-white/2 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 bg-[#111] flex-shrink-0 overflow-hidden">
                            <Image
                              src={img}
                              alt={product.name}
                              fill
                              className="object-contain"
                              sizes="40px"
                              unoptimized={img.includes("/sign/")}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/images/desktop-hero1.webp";
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-white text-sm">
                              {product.name}
                            </p>
                            <p className="text-xs text-white/25 mt-0.5 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-white/50">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {product.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-[#ED3E00]/10 text-[#ED3E00]">
                            {product.badge}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-1.5 rounded-md text-white/30 hover:text-[#ffeb20] hover:bg-white/5 transition-colors"
                            aria-label="Edit product"
                          >
                            <Edit size={14} />
                          </Link>
                          <button
                            onClick={() => setDeleteId(product.id)}
                            className="p-1.5 rounded-md text-white/30 hover:text-[#ED3E00] hover:bg-[#ED3E00]/10 transition-colors"
                            aria-label="Delete product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
            <span className="text-xs text-white/30">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  setPage((p) => Math.min(totalPages - 1, p + 1))
                }
                disabled={page >= totalPages - 1}
                className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-white/10 p-8 max-w-sm w-full rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={20} className="text-[#ED3E00]" />
              <h3 className="font-bold text-white">Delete Product?</h3>
            </div>
            <p className="text-sm text-white/50 mb-6">
              This action cannot be undone. The product will be permanently
              removed from the database.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 text-sm font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/20 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 py-2.5 text-sm font-bold bg-[#ED3E00] text-white hover:bg-[#cc3600] rounded-lg transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
