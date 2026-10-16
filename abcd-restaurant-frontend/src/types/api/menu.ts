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
  is_signature_dish?: boolean;
  is_active: boolean;
  display_order: number;
  category_id: number;
  category: Category | null;
}


export interface ClientMenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  tags: string[];
  isChefPick: boolean;
  isSignatureDish?: boolean;
}

export interface ClientMenuCategory {
  id: string;
  title: string;
  subtitle: string | null;
  letter_group?: string | null;
  items: ClientMenuItem[];
}
