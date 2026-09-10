"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X, ChevronDown, ChevronUp, Search } from "lucide-react";
import { MENU_ITEMS, type MenuItem } from "@/lib/menu-data";

const STORAGE_KEY = "gebal_menu_items";

const CUISINES = ["Lebanese", "Oriental", "Chinese", "Italian", "Sandwiches", "Drinks", "Alcoholic Beverages", "Chicha", "Desserts"];

const CATEGORIES: Record<string, string[]> = {
  Lebanese: ["Mezze", "Grills", "Bakery", "Salads", "Soups"],
  Oriental: ["Grills", "Rice & Grains", "Mezze", "Salads", "Soups"],
  Chinese: ["Wok", "Small Plates", "Dim Sum", "Soups", "Rice & Noodles"],
  Italian: ["Pizza", "Pasta", "Risotto", "Starters", "Salads"],
  Sandwiches: ["Lebanese Wraps", "Oriental Wraps", "Chinese Wraps", "Italian Panini"],
  Drinks: ["Fresh Juices", "Smoothies", "Hot Beverages", "Cold Beverages", "Traditional Drinks", "Milkshakes"],
  "Alcoholic Beverages": ["Lebanese Wines", "Arak", "Cocktails", "Beer", "Spirits"],
  Chicha: ["Fruit Flavors", "Mint & Sweet", "Berry & Citrus", "Classic", "Premium", "Exotic"],
  Desserts: ["Lebanese Sweets", "Oriental Sweets", "Chinese Sweets", "Italian Sweets", "Ice Cream", "Pastries"],
};

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [editing, setEditing] = useState<MenuItem | "new" | null>(null);
  const [search, setSearch] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [expandedCuisine, setExpandedCuisine] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const saveToStorage = (newItems: MenuItem[]) => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      setItems(newItems);
      window.dispatchEvent(new Event("storage"));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleSave = (item: MenuItem) => {
    if (editing === "new") {
      const newItem = { ...item, id: `custom_${Date.now()}` };
      saveToStorage([...items, newItem]);
    } else {
      saveToStorage(items.map((i) => (i.id === item.id ? { ...item } : i)));
    }
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      saveToStorage(items.filter((i) => i.id !== id));
    }
  };

  const handleReset = () => {
    if (confirm("Reset all changes to default menu?")) {
      saveToStorage(MENU_ITEMS);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-paper" />;
  }

  const filtered = items.filter((item) => {
    if (filterCuisine !== "All" && item.cuisine !== filterCuisine) return false;
    if (search && !`${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const grouped: Record<string, MenuItem[]> = {};
  CUISINES.forEach((c) => {
    const cuisineItems = filtered.filter((i) => i.cuisine === c);
    if (cuisineItems.length > 0) {
      grouped[c] = cuisineItems;
    }
  });

  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-ink text-parchment py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl">Menu Management</h1>
              <p className="text-sm text-parchment/60 mt-1">Add, edit, and organize your menu items</p>
            </div>
            <div className="flex items-center gap-3">
              {saved && <span className="text-xs text-olive bg-olive/10 px-3 py-1 rounded">✓ Saved</span>}
              <button onClick={handleReset} className="text-xs text-parchment/60 border border-parchment/20 px-3 py-2 hover:bg-parchment/10 transition-colors">
                Reset to Default
              </button>
              <button onClick={() => setEditing("new")} className="flex items-center gap-2 px-4 py-2 bg-saffron text-ink text-sm hover:bg-saffronLight transition-colors">
                <Plus size={16} /> Add Item
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-stone/10 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] border border-stone/20 px-3 py-2">
            <Search size={16} className="text-stone" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items..." className="text-sm outline-none w-full bg-transparent" />
          </div>
          <select value={filterCuisine} onChange={(e) => setFilterCuisine(e.target.value)} className="text-sm border border-stone/20 px-3 py-2 bg-white">
            <option value="All">All Cuisines</option>
            {CUISINES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="text-sm text-stone">{items.length} total items</span>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-ink text-parchment px-6 py-4 flex items-center justify-between">
              <h2 className="font-display text-lg">{editing === "new" ? "Add New Item" : "Edit Item"}</h2>
              <button onClick={() => setEditing(null)} className="p-1 hover:bg-parchment/10"><X size={20} /></button>
            </div>
            <ItemForm
              item={editing === "new" ? { id: "", name: "", description: "", price: 0, is_vegetarian: false, is_vegan: false, is_spicy: false, is_featured: false, cuisine: "Lebanese", category: "Mezze" } : editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {Object.entries(grouped).map(([cuisine, cuisineItems]) => (
          <div key={cuisine} className="mb-8">
            <button onClick={() => setExpandedCuisine(expandedCuisine === cuisine ? null : cuisine)} className="w-full flex items-center justify-between py-4 border-b border-stone/20 text-left">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {cuisine === "Lebanese" ? "🌿" : cuisine === "Oriental" ? "🔥" : cuisine === "Chinese" ? "🥢" : cuisine === "Italian" ? "🍝" : cuisine === "Sandwiches" ? "🥙" : cuisine === "Drinks" ? "🥤" : cuisine === "Alcoholic Beverages" ? "🍷" : cuisine === "Chicha" ? "💨" : "🍰"}
                </span>
                <h2 className="font-display text-xl text-ink">{cuisine}</h2>
                <span className="text-sm text-stone">({cuisineItems.length} items)</span>
              </div>
              {expandedCuisine === cuisine ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {(expandedCuisine === cuisine || expandedCuisine === null) && (
              <div className="mt-4 space-y-2">
                {cuisineItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-white border border-stone/10 p-4 hover:border-saffron/30 transition-colors">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-16 bg-stone/10 rounded flex items-center justify-center text-stone/40 text-xs">No img</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-ink truncate">{item.name}</h3>
                          {item.is_featured && <span className="text-[10px] px-2 py-0.5 bg-saffron/10 text-saffron">Featured</span>}
                          {item.is_vegetarian && <span className="text-[10px] px-2 py-0.5 bg-olive/10 text-olive">Veg</span>}
                          {item.is_spicy && <span className="text-[10px] px-2 py-0.5 bg-clay/10 text-clay">Spicy</span>}
                        </div>
                        <p className="text-sm text-stone truncate">{item.description}</p>
                        <p className="text-xs text-stone/60 mt-1">{item.category} • ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button onClick={() => setEditing(item)} className="p-2 text-stone hover:text-ink hover:bg-stone/5 transition-colors"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-stone hover:text-clay hover:bg-clay/5 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemForm({ item, onSave, onCancel }: { item: MenuItem; onSave: (item: MenuItem) => void; onCancel: () => void }) {
  const [form, setForm] = useState<MenuItem>(item);

  const update = (field: keyof MenuItem, value: string | number | boolean) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-6 space-y-4">
      <div>
        <label className="text-sm text-stone">Name *</label>
        <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm" />
      </div>
      <div>
        <label className="text-sm text-stone">Description</label>
        <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={2} className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm resize-none" />
      </div>
      <div>
        <label className="text-sm text-stone flex items-center gap-2"><span>Image URL</span></label>
        <input value={form.image || ""} onChange={(e) => update("image", e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm" />
        {form.image && <img src={form.image} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-stone">Cuisine *</label>
          <select value={form.cuisine} onChange={(e) => { update("cuisine", e.target.value); update("category", CATEGORIES[e.target.value]?.[0] || ""); }} className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm bg-white">
            {CUISINES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-stone">Category *</label>
          <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm bg-white">
            {(CATEGORIES[form.cuisine] || []).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm text-stone">Price ($) *</label>
        <input type="number" step="0.01" min="0" required value={form.price} onChange={(e) => update("price", parseFloat(e.target.value) || 0)} className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm" />
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_vegetarian} onChange={(e) => update("is_vegetarian", e.target.checked)} /> Vegetarian</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_vegan} onChange={(e) => update("is_vegan", e.target.checked)} /> Vegan</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_spicy} onChange={(e) => update("is_spicy", e.target.checked)} /> Spicy</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_featured} onChange={(e) => update("is_featured", e.target.checked)} /> Featured</label>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-ink text-parchment text-sm hover:bg-charcoal transition-colors"><Save size={16} /> Save Item</button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-stone/20 text-sm hover:bg-stone/5 transition-colors">Cancel</button>
      </div>
    </form>
  );
}
