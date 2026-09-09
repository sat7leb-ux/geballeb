import { Plus, Trash2 } from "lucide-react";
import CuisineSwatch from "@/components/CuisineSwatch";
import { createClient } from "@/lib/supabase/server";

const FALLBACK_CUISINES = ["Lebanese", "Oriental", "Chinese", "Italian"];

export default async function AdminGalleryPage() {
  const supabase = createClient();
  const { data: gallery } = await supabase.from("gallery").select("*").order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Gallery</h1>
        <button className="bg-ink text-parchment text-xs px-4 py-2 flex items-center gap-1.5 hover:bg-charcoal transition-colors duration-300">
          <Plus size={13} /> Upload image
        </button>
      </div>
      <p className="text-xs text-stone mt-2 max-w-md">
        Upload wires into the <code>gallery-images</code> Supabase Storage bucket, then inserts a row here.
      </p>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
        {(gallery as any[] ?? []).map((g: any, i: number) => (
          <div key={g.id} className="bg-white border border-stone/20">
            <CuisineSwatch cuisine={FALLBACK_CUISINES[i % 4]} className="h-24 w-full" />
            <div className="p-2 flex items-center justify-between">
              <span className="text-[11px]">{g.caption}</span>
              <Trash2 size={12} className="text-clay cursor-pointer hover:text-ink transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
