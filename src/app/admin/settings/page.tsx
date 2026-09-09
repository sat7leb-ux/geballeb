import { updateSettings } from "./actions";
import { createClient } from "@/lib/supabase/server";

export default async function AdminSettingsPage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from("restaurant_settings").select("*").eq("id", 1).single();

  const s = settings as any;

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl">Restaurant settings</h1>
      <p className="text-sm text-stone mt-1">Update your restaurant information.</p>
      <form action={updateSettings} className="flex flex-col gap-4 mt-6">
        <LabeledInput label="Restaurant name" name="name" defaultValue={s?.name} />
        <LabeledInput label="Phone" name="phone" defaultValue={s?.phone ?? ""} />
        <LabeledInput label="Email" name="email" defaultValue={s?.email ?? ""} />
        <LabeledInput label="Address" name="address" defaultValue={s?.address ?? ""} />
        <LabeledInput label="Opening hours" name="opening_hours" defaultValue={s?.opening_hours ?? ""} />
        <button type="submit" className="bg-ink text-parchment text-sm py-3 mt-2 w-fit px-6 hover:bg-charcoal transition-colors duration-300">
          Save settings
        </button>
      </form>
    </div>
  );
}

function LabeledInput({ label, ...props }: any) {
  return (
    <div>
      <label className="text-xs text-stone">{label}</label>
      <input {...props} className="w-full border-b border-stone/30 bg-transparent py-2.5 text-sm outline-none focus:border-ink transition-colors duration-300" />
    </div>
  );
}
