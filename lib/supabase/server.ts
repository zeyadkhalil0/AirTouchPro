import { createServerClient as createSupabaseSSRClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * SSR-safe Supabase client for Server Components and Server Actions.
 * Uses @supabase/ssr with Next.js cookie store so sessions are
 * properly read from HttpOnly cookies — this is what makes
 * middleware-based auth work end-to-end.
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createSupabaseSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Can't set cookies from a Server Component — middleware handles refresh
          }
        },
      },
    }
  );
}

/**
 * Get the currently authenticated user server-side.
 * Returns null if not authenticated.
 */
export async function getServerUser() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
