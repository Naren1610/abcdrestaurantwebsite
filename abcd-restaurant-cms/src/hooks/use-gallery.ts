import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { galleryCategoryApi, galleryImageApi } from '@/services/gallery-api';
import type {
  GalleryCategoryCreate,
  GalleryCategoryUpdate,
  GalleryImageCreate,
  GalleryImageUpdate,
} from '@/types/api/gallery';

// --- Query Keys ---

export const galleryKeys = {
  allCategories: ['gallery-categories'] as const,
  categories: (page?: number, size?: number) => ['gallery-categories', { page, size }] as const,
  allImages: ['gallery-images'] as const,
  images: (categoryId?: number, page?: number, size?: number, isTopPick?: boolean) => ['gallery-images', { categoryId, page, size, isTopPick }] as const,
};

// ================================================
// CATEGORY HOOKS
// ================================================

export function useGalleryCategory(id: number) {
  return useQuery({
    queryKey: [...galleryKeys.allCategories, id],
    queryFn: () => galleryCategoryApi.getById(id),
    enabled: !!id,
  });
}

export function useGalleryCategories(page: number = 1, size: number = 10) {
  return useQuery({
    queryKey: galleryKeys.categories(page, size),
    queryFn: () => galleryCategoryApi.getAll(page, size),
  });
}

export function useCreateGalleryCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: GalleryCategoryCreate) => galleryCategoryApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.allCategories });
    },
  });
}

export function useUpdateGalleryCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: GalleryCategoryUpdate }) =>
      galleryCategoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.allCategories });
    },
  });
}

export function useDeleteGalleryCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => galleryCategoryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.allCategories });
      // Images might be deleted on cascade, so invalidate them too just in case
      queryClient.invalidateQueries({ queryKey: galleryKeys.allImages });
    },
  });
}

export function useReorderGalleryCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (items: { id: number; display_order: number }[]) => galleryCategoryApi.reorder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.allCategories });
    },
  });
}

// ================================================
// IMAGE HOOKS
// ================================================

export function useGalleryImage(id: number) {
  return useQuery({
    queryKey: [...galleryKeys.allImages, id],
    queryFn: () => galleryImageApi.getById(id),
    enabled: !!id,
  });
}

export function useGalleryImages(categoryId?: number, page: number = 1, size: number = 12, isTopPick?: boolean) {
  return useQuery({
    queryKey: galleryKeys.images(categoryId, page, size, isTopPick),
    queryFn: () => galleryImageApi.getAll(categoryId, page, size, isTopPick),
  });
}

export function useCreateGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: GalleryImageCreate) => galleryImageApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.allImages });
    },
  });
}

export function useUpdateGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: GalleryImageUpdate }) =>
      galleryImageApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.allImages });
    },
  });
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => galleryImageApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.allImages });
    },
  });
}
