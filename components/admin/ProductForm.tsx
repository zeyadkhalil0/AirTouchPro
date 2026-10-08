"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import type { Product } from "@/types";
import { ArrowLeft, Save, Upload, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

type FormData = {
  name: string;
  description: string;
  category: string;
  badge: string;
  img: string;
};

type Props = {
  product?: Product;
  mode: "create" | "edit";
};

export default function ProductForm({ product, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: product?.name ?? "",
    description: product?.description ?? "",
    category: product?.category ?? PRODUCT_CATEGORIES[1],
    badge: product?.badge ?? "",
    img: product?.img ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product?.img ?? "");

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "img") setImagePreview(value);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // Use the same bucket as the original site: "Product-img"
    const { data, error } = await supabase.storage
      .from("Product-img")
      .upload(fileName, file, { upsert: false });

    if (error) {
      setToast({ type: "error", message: `Upload failed: ${error.message}` });
      setLoading(false);
      return;
    }

    // Get a signed URL (1 year expiry) — consistent with how existing images are stored
    const { data: signedData, error: signError } = await supabase.storage
      .from("Product-img")
      .createSignedUrl(data.path, 60 * 60 * 24 * 365);

    if (signError || !signedData?.signedUrl) {
      // Fallback to public URL
      const { data: urlData } = supabase.storage
        .from("Product-img")
        .getPublicUrl(data.path);
      setForm((prev) => ({ ...prev, img: urlData.publicUrl }));
      setImagePreview(urlData.publicUrl);
    } else {
      setForm((prev) => ({ ...prev, img: signedData.signedUrl }));
      setImagePreview(signedData.signedUrl);
    }

    setToast({ type: "success", message: "Image uploaded successfully!" });
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      category: form.category,
      badge: form.badge.trim() || null,
      img: form.img.trim() || null,
    };

    let error;

    if (mode === "create") {
      const res = await supabase.from("Products").insert([payload]);
      error = res.error;
    } else {
      const res = await supabase
        .from("Products")
        .update(payload)
        .eq("id", product!.id);
      error = res.error;
    }

    setLoading(false);

    if (error) {
      setToast({ type: "error", message: error.message });
      return;
    }

    setToast({
      type: "success",
      message: mode === "create" ? "Product created!" : "Product updated!",
    });

    setTimeout(() => {
      router.push("/admin/products");
      router.refresh();
    }, 1200);
  }

  const BADGE_OPTIONS = ["", "Premium", "Hot", "New", "Best Seller"];

  return (
    <div className="max-w-2xl">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 text-sm font-medium rounded-xl shadow-xl ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-[#ED3E00] text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white">
            {mode === "create" ? "Add Product" : "Edit Product"}
          </h1>
          {product && (
            <p className="text-white/30 text-sm mt-0.5">ID: #{product.id}</p>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
            Product Name <span className="text-[#ED3E00]">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Air Bag 1"
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#ffeb20] transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Short description of the product..."
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#ffeb20] transition-colors resize-none"
          />
        </div>

        {/* Category + Badge row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              Category <span className="text-[#ED3E00]">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#ffeb20] transition-colors"
            >
              {PRODUCT_CATEGORIES.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              Badge
            </label>
            <select
              name="badge"
              value={form.badge}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#ffeb20] transition-colors"
            >
              {BADGE_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b || "No Badge"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
            Product Image
          </label>

          {/* Upload button */}
          <label className="flex items-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-dashed border-white/15 hover:border-white/30 rounded-lg cursor-pointer transition-colors mb-3">
            <Upload size={16} className="text-white/30" />
            <span className="text-sm text-white/30">Click to upload image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* Or URL */}
          <input
            name="img"
            type="text"
            value={form.img}
            onChange={handleChange}
            placeholder="Or paste image URL..."
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#ffeb20] transition-colors"
          />

          {/* Preview */}
          {imagePreview && (
            <div className="mt-3 relative w-24 h-24 bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>


        {/* Submit */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#ffeb20] text-[#040316] px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#f5e000] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            <Save size={16} />
            {loading ? "Saving..." : mode === "create" ? "Create Product" : "Save Changes"}
          </button>
          <Link
            href="/admin/products"
            className="text-sm text-white/30 hover:text-white/60 px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
