"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X, Image, GripVertical } from "lucide-react";

interface GalleryItem {
  id: string;
  src: string;
  category: string;
  caption: string;
  size: string;
}

const CATEGORIES = ["Interior", "Food", "Ambiance", "Bar", "Behind the Scenes"];
const SIZES = ["small", "wide", "tall", "large"];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<GalleryItem | "new" | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load from localStorage or use defaults
    const stored = localStorage.getItem("gebal_gallery");
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      setItems([
        { id: "g1", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=800&fit=crop", category: "Interior", caption: "The dining room at dusk", size: "large" },
        { id: "g2", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop", category: "Food", caption: "Charcoal grill at work", size: "wide" },
        { id: "g3", src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop", category: "Ambiance", caption: "Terrace seating", size: "small" },
        { id: "g4", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=600&fit=crop", category: "Food", caption: "Mixed grill platter", size: "tall" },
        { id: "g5", src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=800&fit=crop", category: "Bar", caption: "Cocktails & spirits", size: "large" },
        { id: "g6", src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop", category: "Food", caption: "Wood-fired pizza", size: "small" },
      ]);
    }
  }, []);

  const saveToStorage = (newItems: GalleryItem[]) => {
    localStorage.setItem("gebal_gallery", JSON.stringify(newItems));
    setItems(newItems);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSave = (item: GalleryItem) => {
    if (editing === "new") {
      const newItem = { ...item, id: `g${Date.now()}` };
      saveToStorage([...items, newItem]);
    } else {
      saveToStorage(items.map((i) => (i.id === item.id ? item : i)));
    }
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      saveToStorage(items.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-ink text-parchment py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl">Gallery Management</h1>
              <p className="text-sm text-parchment/60 mt-1">Add, edit, and organize your gallery images</p>
            </div>
            <div className="flex items-center gap-3">
              {saved && <span className="text-xs text-olive bg-olive/10 px-3 py-1 rounded">✓ Saved</span>}
              <button
                onClick={() => setEditing("new")}
                className="flex items-center gap-2 px-4 py-2 bg-saffron text-ink text-sm hover:bg-saffronLight transition-colors"
              >
                <Plus size={16} /> Add Image
              </button>
            </div>
          </div>
        </div>
      </header>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-ink text-parchment px-6 py-4 flex items-center justify-between">
              <h2 className="font-display text-lg">{editing === "new" ? "Add New Image" : "Edit Image"}</h2>
              <button onClick={() => setEditing(null)} className="p-1 hover:bg-parchment/10">
                <X size={20} />
              </button>
            </div>
            <GalleryForm
              item={editing === "new" ? { id: "", src: "", category: "Food", caption: "", size: "small" } : editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white border border-stone/10 overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 bg-saffron/10 text-saffron rounded-full">{item.category}</span>
                  <span className="text-[10px] text-stone">{item.size}</span>
                </div>
                <p className="text-sm text-ink truncate">{item.caption}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditing(item)}
                  className="p-2 bg-white/90 text-ink hover:bg-white transition-colors rounded"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white/90 text-clay hover:bg-white transition-colors rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryForm({ item, onSave, onCancel }: { item: GalleryItem; onSave: (item: GalleryItem) => void; onCancel: () => void }) {
  const [form, setForm] = useState<GalleryItem>(item);

  const update = (field: keyof GalleryItem, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-6 space-y-4">
      <div>
        <label className="text-sm text-stone">Image URL *</label>
        <input
          required
          value={form.src}
          onChange={(e) => update("src", e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm"
        />
        {form.src && (
          <div className="mt-2 aspect-video overflow-hidden rounded">
            <img src={form.src} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      <div>
        <label className="text-sm text-stone">Caption *</label>
        <input
          required
          value={form.caption}
          onChange={(e) => update("caption", e.target.value)}
          placeholder="Describe the image..."
          className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-stone">Category</label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm bg-white"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-stone">Size</label>
          <select
            value={form.size}
            onChange={(e) => update("size", e.target.value)}
            className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm bg-white"
          >
            {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-ink text-parchment text-sm hover:bg-charcoal transition-colors">
          <Save size={16} /> Save
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-stone/20 text-sm hover:bg-stone/5 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
