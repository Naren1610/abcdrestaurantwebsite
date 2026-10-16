export interface Category {
  id: number;
  name: string;
  subtitle: string | null;
  display_order: number;
  letter_group?: "A" | "B" | "C" | "D" | null;
}

export interface CategoryCreate {
  name: string;
  subtitle?: string | null;
  display_order?: number;
  letter_group?: "A" | "B" | "C" | "D" | null;
}

export interface CategoryUpdate {
  name?: string;
  subtitle?: string | null;
  display_order?: number;
  letter_group?: "A" | "B" | "C" | "D" | null;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_veg: boolean;
  is_spicy: boolean;
  is_chef_special: boolean;
  is_signature_dish: boolean;
  is_active: boolean;
  display_order: number;
  category_id: number;
  category: Category | null;
}

export interface MenuItemCreate {
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  is_veg?: boolean;
  is_spicy?: boolean;
  is_chef_special?: boolean;
  is_signature_dish?: boolean;
  is_active?: boolean;
  display_order?: number;
  category_id: number;
}

export interface MenuItemUpdate {
  name?: string;
  description?: string | null;
  price?: number;
  image_url?: string | null;
  is_veg?: boolean;
  is_spicy?: boolean;
  is_chef_special?: boolean;
  is_signature_dish?: boolean;
  is_active?: boolean;
  display_order?: number;
  category_id?: number;
}
