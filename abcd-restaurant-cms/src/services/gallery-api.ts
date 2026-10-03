import { apiClient } from '@/lib/api-client';
import type {
  GalleryCategory,
  GalleryCategoryCreate,
  GalleryCategoryUpdate,
  GalleryImage,
  GalleryImageCreate,
  GalleryImageUpdate,
  PaginatedResponse,
} from '@/types/api/gallery';

// --- Gallery Category API calls ---

export const galleryCategoryApi = {
  getAll: (page: number = 1, size: number = 10) => 
    apiClient.get<never, PaginatedResponse<GalleryCategory>>(`/gallery/categories?page=${page}&size=${size}`),

  getById: (id: number) => apiClient.get<never, GalleryCategory>(`/gallery/categories/${id}`),

  create: (data: GalleryCategoryCreate) =>
    apiClient.post<never, GalleryCategory>('/gallery/categories', data),

  update: (id: number, data: GalleryCategoryUpdate) =>
    apiClient.put<never, GalleryCategory>(`/gallery/categories/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<never, { message: string }>(`/gallery/categories/${id}`),
    
  reorder: (items: { id: number; display_order: number }[]) =>
    apiClient.patch<never, { message: string }>('/gallery/categories/reorder', items),
};

// --- Gallery Image API calls ---

export const galleryImageApi = {
  getAll: (categoryId?: number, page: number = 1, size: number = 12, isTopPick?: boolean) => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    if (categoryId) {
      params.append('category_id', categoryId.toString());
    }
    if (isTopPick !== undefined) {
      params.append('is_top_pick', isTopPick.toString());
    }
    return apiClient.get<never, PaginatedResponse<GalleryImage>>(`/gallery/images?${params.toString()}`);
  },

  getById: (id: number) => apiClient.get<never, GalleryImage>(`/gallery/images/${id}`),

  create: (data: GalleryImageCreate) =>
    apiClient.post<never, GalleryImage>('/gallery/images', data),

  update: (id: number, data: GalleryImageUpdate) =>
    apiClient.put<never, GalleryImage>(`/gallery/images/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<never, { message: string }>(`/gallery/images/${id}`),
};
