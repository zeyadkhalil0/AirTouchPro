import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client using @supabase/ssr.
 * This ensures auth cookies are properly set/read so the
 * middleware can validate the session server-side.
 */
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
