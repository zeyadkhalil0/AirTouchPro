"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import ProductForm from "@/components/admin/ProductForm";
import type { Product } from "@/types";
import { use } from "react";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("id", Number(id))
        .single();
      if (error || !data) {
        setProduct(null);
        return;
      }
      setProduct(data);
    }
    load();
  }, [id]);

  if (product === undefined) {
    return (
      <div className="text-white/30 text-sm animate-pulse py-8">
        Loading product...
      </div>
    );
  }

  if (product === null) {
    notFound();
  }

  return <ProductForm mode="edit" product={product} />;
}
