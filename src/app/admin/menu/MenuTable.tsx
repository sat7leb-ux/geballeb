"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { upsertMenuItem, deleteMenuItem } from "./actions";

type Cuisine = { id: string; name: string };
type Item = {
  id: string;
  name: string;
  price: number;
  is_available: boolean;
  cuisine_id: string;
  category_id: string | null;
  description: string | null;
  ingredients: string | null;
  allergens: string | null;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_spicy: boolean;
  is_featured: boolean;
  cuisines: { name: string } | null;
};

export default function MenuTable({ items, cuisines }: { items: Item[]; cuisines: Cuisine[] }) {
  const [editing, setEditing] = useState<Item | "new" | null>(null);

  if (editing) {
    const item = editing === "new" ? null : editing;
    return (
      <form action={upsertMenuItem} className="max-w-xl">
        {item && <input type="hidden" name="id" value={item.id} />}
        <h1 className="font-display text-2xl">{item ? "Edit dish" : "New dish"}</h1>
        <div className="flex flex-col gap-4 mt-6">
          <LabeledInput label="Name" name="name" defaultValue={item?.name} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone">Cuisine</label>
              <select name="cuisine_id" defaultValue={item?.cuisine_id} className="w-full border-b border-stone/30 bg-transparent py-2.5 text-sm outline-none">
                {cuisines.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <LabeledInput label="Price ($)" name="price" type="number" step="0.01" defaultValue={item?.price} />
          </div>
          <div>
            <label className="text-xs text-stone">Description</label>
            <textarea name="description" defaultValue={item?.description ?? ""} rows={3} className="w-full border-b border-stone/30 bg-transparent py-2.5 text-sm outline-none resize-none" />
          </div>
          <LabeledInput label="Ingredients" name="ingredients" defaultValue={item?.ingredients ?? ""} />
          <LabeledInput label="Allergens" name="allergens" defaultValue={item?.allergens ?? ""} />
          <div className="flex flex-wrap gap-4 text-sm">
            {(["is_vegetarian", "is_vegan", "is_spicy", "is_featured", "is_available"] as const).map((k) => (
              <label key={k} className="flex items-center gap-2">
                <input type="checkbox" name={k} defaultChecked={item ? (item as any)[k] : k === "is_available"} />
                {k.replace("is_", "")}
              </label>
            ))}
          </div>
          <div className="flex gap-3 mt-2">
            <button type="submit" onClick={() => setEditing(null)} className="bg-ink text-parchment text-sm px-5 py-2.5 hover:bg-charcoal transition-colors duration-300">
              Save dish
            </button>
            <button type="button" onClick={() => setEditing(null)} className="border border-stone/30 text-sm px-5 py-2.5 hover:bg-stone/5 transition-colors duration-300">
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Menu management</h1>
        <button onClick={() => setEditing("new")} className="bg-ink text-parchment text-xs px-4 py-2 flex items-center gap-1.5 hover:bg-charcoal transition-colors duration-300">
          <Plus size={13} /> Add dish
        </button>
      </div>
      <div className="bg-white border border-stone/20 mt-6 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-paper text-left">
              <th className="p-3 font-normal text-stone">Dish</th>
              <th className="p-3 font-normal text-stone">Cuisine</th>
              <th className="p-3 font-normal text-stone">Price</th>
              <th className="p-3 font-normal text-stone">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.id} className="border-t border-stone/10">
                <td className="p-3">{m.name}</td>
                <td className="p-3 text-stone">{m.cuisines?.name}</td>
                <td className="p-3 text-stone">${Number(m.price).toFixed(2)}</td>
                <td className="p-3">
                  <span className={m.is_available ? "text-olive" : "text-clay"}>
                    {m.is_available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <button onClick={() => setEditing(m)}><Pencil size={13} className="text-stone hover:text-ink transition-colors" /></button>
                    <form action={deleteMenuItem.bind(null, m.id)}>
                      <button type="submit"><Trash2 size={13} className="text-clay hover:text-ink transition-colors" /></button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
