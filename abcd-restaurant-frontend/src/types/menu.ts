export type DietaryTag = "veg" | "non-veg" | "spicy";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  tags: DietaryTag[];
  isChefPick?: boolean;
}

export interface MenuCategory {
  id: string;
  subtitle: string;
  title: string;
  items: MenuItem[];
}
