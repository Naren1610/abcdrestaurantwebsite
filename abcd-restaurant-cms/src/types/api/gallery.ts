export interface GalleryCategory {
  id: number;
  name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface GalleryCategoryCreate {
  name: string;
  display_order?: number;
  is_active?: boolean;
}

export interface GalleryCategoryUpdate {
  name?: string;
  display_order?: number;
  is_active?: boolean;
}

export interface GalleryImage {
  id: number;
  category_id: number;
  title: string | null;
  image_url: string;
  is_top_pick: boolean;
  caption: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryImageCreate {
  category_id: number;
  title?: string | null;
  image_url: string;
  is_top_pick?: boolean;
  caption?: string | null;
}

export interface GalleryImageUpdate {
  category_id?: number;
  title?: string | null;
  image_url?: string;
  is_top_pick?: boolean;
  caption?: string | null;
}
