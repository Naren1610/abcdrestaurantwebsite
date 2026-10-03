export interface Category {
  id: number;
  name: string;
  subtitle: string | null;
  display_order: number;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_veg: boolean;
  is_spicy: boolean;
  is_active: boolean;
  display_order: number;
  category_id: number;
  category: Category | null;
}
