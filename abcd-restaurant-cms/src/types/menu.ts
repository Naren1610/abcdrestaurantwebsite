export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
  categoryId: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
}