// Hand-written types matching supabase/migrations/0001_init.sql.
// Regenerate from the live schema once your project is running with:
//   npx supabase gen types typescript --project-id YOUR_PROJECT_REF > src/lib/types.ts

export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";

export interface Cuisine {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  sort_order: number;
}

export interface Category {
  id: string;
  cuisine_id: string;
  name: string;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  cuisine_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  ingredients: string | null;
  allergens: string | null;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_spicy: boolean;
  is_featured: boolean;
  is_available: boolean;
  sort_order: number;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  occasion: string | null;
  special_requests: string | null;
  status: ReservationStatus;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  storage_path: string;
  caption: string | null;
  category: string | null;
}

export interface RestaurantSettings {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  opening_hours: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
}

