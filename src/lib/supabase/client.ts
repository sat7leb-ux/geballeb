// Browser Supabase client — used in Client Components ("use client").
//
// Untyped by default: passing a hand-written `Database` generic here is
// brittle against the exact shape supabase-js expects internally, and it's
// meant to be replaced anyway. Once your schema is live, run:
//   npx supabase gen types typescript --project-id YOUR_PROJECT_REF > src/lib/database.types.ts
// then swap the generic back in: createBrowserClient<Database>(...).
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
