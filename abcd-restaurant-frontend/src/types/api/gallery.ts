export interface ClientGalleryImage {
  id: number;
  image_url: string;
  title: string;
  category_name: string;
}

export interface ClientGalleryResponse {
  categories: string[];
  images: ClientGalleryImage[];
}

export interface ClientGalleryTopPick {
  id: number;
  image_url: string;
  caption: string | null;
  title: string | null;
}
