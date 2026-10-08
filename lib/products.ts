import { createServerClient } from "@/lib/supabase/server";
import type { Product } from "@/types";

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data ?? [];
}

export async function getProductById(id: number): Promise<Product | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("category", category)
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
  return data ?? [];
}

export async function getRelatedProducts(
  category: string,
  excludeId: number,
  limit = 4
): Promise<Product[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("category", category)
    .neq("id", excludeId)
    .limit(limit);

  if (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
  return data ?? [];
}
