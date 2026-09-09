// Server Supabase client — used in Server Components, route handlers, and
// server actions. Reads/writes the auth cookie via Next.js's cookies().

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// Placeholder that resolves to empty data — used when Supabase env vars
// are not configured (e.g., during build or design previews).
const empty = { data: [], error: null, count: 0 };
const emptySingle = { data: null, error: null };

const placeholderQuery = {
  then: (resolve: any) => resolve(empty),
  catch: () => placeholderQuery,
  finally: () => placeholderQuery,
  select: () => placeholderQuery,
  eq: () => placeholderQuery,
  neq: () => placeholderQuery,
  order: () => placeholderQuery,
  limit: () => placeholderQuery,
  single: () => ({
    then: (resolve: any) => resolve(emptySingle),
    catch: () => placeholderQuery,
    finally: () => placeholderQuery,
  }),
  insert: () => placeholderQuery,
  update: () => placeholderQuery,
  delete: () => placeholderQuery,
  upsert: () => placeholderQuery,
};

const placeholderClient = {
  from: () => placeholderQuery,
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
    signOut: () => Promise.resolve({ error: null }),
  },
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: "" } }),
    }),
  },
};

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return placeholderClient as any;
  }

  const cookieStore = cookies();

  return createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Called from a Server Component with no writable cookie jar —
          // safe to ignore because middleware refreshes the session too.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // See note above.
        }
      },
    },
  });
}
