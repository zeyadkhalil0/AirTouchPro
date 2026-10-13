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

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) {
    if (error) console.error("Error fetching featured products:", error);
    return [];
  }

  // Curate a balanced sample across key categories
  const keyCategories = [
    "Air Bags",
    "Air Managements",
    "Air Compressors",
    "Air Tanks",
    "Brake",
    "Struts & Arms",
    "Water Trap",
    "Sway Bar",
  ];

  const byCat: Record<string, Product[]> = {};
  for (const item of data) {
    if (!byCat[item.category]) byCat[item.category] = [];
    byCat[item.category].push(item);
  }

  const selected: Product[] = [];

  // Pick top badged item from each key category first
  for (const cat of keyCategories) {
    if (byCat[cat] && byCat[cat].length > 0) {
      const best =
        byCat[cat].find((p) => p.badge === "Premium" || p.badge === "Best Seller" || p.badge === "Hot") ||
        byCat[cat][0];
      if (best && !selected.some((s) => s.id === best.id)) {
        selected.push(best);
      }
    }
  }

  // Fill remainder with other products having badges or unique features
  for (const item of data) {
    if (selected.length >= limit) break;
    if (!selected.some((s) => s.id === item.id)) {
      selected.push(item);
    }
  }

  return selected.slice(0, limit);
}

