"use client";

import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

type CategoryItem = {
  name: string;
  count: number;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editCat, setEditCat] = useState<{ old: string; new: string } | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  const loadCategories = useCallback(async (indicateLoading = false) => {
    if (indicateLoading) setLoading(true);
    const { data } = await supabase.from("Products").select("category");
    const counts: Record<string, number> = {};
    (data ?? []).forEach((p: { category: string }) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });

    const allCats = new Set([
      ...PRODUCT_CATEGORIES.filter((c) => c !== "All"),
      ...Object.keys(counts),
    ]);

    setCategories(
      Array.from(allCats).map((name) => ({ name, count: counts[name] ?? 0 }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    async function init() {
      const { data } = await supabase.from("Products").select("category");
      if (!active) return;
      const counts: Record<string, number> = {};
      (data ?? []).forEach((p: { category: string }) => {
        counts[p.category] = (counts[p.category] ?? 0) + 1;
      });

      const allCats = new Set([
        ...PRODUCT_CATEGORIES.filter((c) => c !== "All"),
        ...Object.keys(counts),
      ]);

      setCategories(
        Array.from(allCats).map((name) => ({ name, count: counts[name] ?? 0 }))
      );
      setLoading(false);
    }

    init();
    return () => {
      active = false;
    };
  }, []);

  async function handleRename() {
    if (!editCat || !editCat.new.trim()) return;
    const { error } = await supabase
      .from("Products")
      .update({ category: editCat.new.trim() })
      .eq("category", editCat.old);
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", `"${editCat.old}" renamed to "${editCat.new.trim()}"`);
      setEditCat(null);
      loadCategories(true);
    }
  }

  async function handleDelete(catName: string) {
    const { error } = await supabase
      .from("Products")
      .delete()
      .eq("category", catName);
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", `All products in "${catName}" deleted.`);
      setDeleteTarget(null);
      loadCategories(true);
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 text-sm font-medium rounded-xl shadow-xl ${
            toast.type === "success" ? "bg-green-500 text-white" : "bg-[#ED3E00] text-white"
          }`}
        >
          <CheckCircle size={16} />
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Categories</h1>
        <p className="mt-1 text-white/30 text-sm">
          Manage product categories. Renaming updates all associated products.
        </p>
      </div>

      {/* Add note */}
      <div className="bg-[#0a0a0a] border border-white/5 p-5 mb-6 rounded-xl">
        <p className="text-xs text-white/40 leading-relaxed">
          <strong className="text-white/60">Note:</strong> Categories are derived from products in the database.
          To add a new category, create a product with that category name. Use the rename function to update
          existing category names across all products at once.
        </p>
      </div>

      {/* Category List */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h2 className="font-bold text-white text-sm">
            All Categories ({categories.length})
          </h2>
        </div>

        {loading ? (
          <div className="py-10 text-center text-white/20 text-sm">Loading...</div>
        ) : (
          <div className="divide-y divide-white/5">
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between px-5 py-4">
                {editCat?.old === cat.name ? (
                  <div className="flex items-center gap-3 flex-1 mr-4">
                    <input
                      value={editCat.new}
                      onChange={(e) =>
                        setEditCat({ ...editCat, new: e.target.value })
                      }
                      onKeyDown={(e) => e.key === "Enter" && handleRename()}
                      autoFocus
                      className="flex-1 px-3 py-1.5 bg-[#111] border border-[#ffeb20] rounded-lg text-white text-sm focus:outline-none"
                    />
                    <button
                      onClick={handleRename}
                      className="text-xs font-bold text-[#ffeb20] hover:text-white px-2 py-1 rounded-md transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditCat(null)}
                      className="text-xs text-white/30 hover:text-white/60 px-2 py-1 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{cat.name}</p>
                    <p className="text-xs text-white/25 mt-0.5">
                      {cat.count} product{cat.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                )}

                {editCat?.old !== cat.name && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditCat({ old: cat.name, new: cat.name })}
                      className="p-1.5 rounded-md text-white/30 hover:text-[#ffeb20] hover:bg-white/5 transition-colors"
                      aria-label={`Rename ${cat.name}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(cat.name)}
                      className="p-1.5 rounded-md text-white/30 hover:text-[#ED3E00] hover:bg-[#ED3E00]/10 transition-colors"
                      aria-label={`Delete all products in ${cat.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-white/10 p-8 max-w-sm w-full rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle size={20} className="text-[#ED3E00]" />
              <h3 className="font-bold text-white">Delete Category?</h3>
            </div>
            <p className="text-sm text-white/50 mb-2">
              This will permanently delete{" "}
              <strong className="text-white">ALL products</strong> in the category{" "}
              <strong className="text-[#ED3E00]">{deleteTarget}</strong>.
            </p>
            <p className="text-xs text-white/30 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 text-sm font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/20 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                className="flex-1 py-2.5 text-sm font-bold bg-[#ED3E00] text-white hover:bg-[#cc3600] rounded-lg transition-colors"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
