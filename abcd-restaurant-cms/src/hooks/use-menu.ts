import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryApi, menuItemApi } from '@/services/menu-api';
import type {
  CategoryCreate,
  CategoryUpdate,
  MenuItemCreate,
  MenuItemUpdate,
} from '@/types/api/menu';

// --- Query Keys (centralized to avoid typos) ---

export const menuKeys = {
  categories: ['categories'] as const,
  items: ['menu-items'] as const,
};

// ================================================
// CATEGORY HOOKS
// ================================================

export function useCategory(id: number) {
  return useQuery({
    queryKey: [...menuKeys.categories, id],
    queryFn: () => categoryApi.getById(id),
    enabled: !!id,
  });
}

export function useCategories(params?: { page?: number; size?: number; search?: string }) {
  return useQuery({
    queryKey: [...menuKeys.categories, params],
    queryFn: () => categoryApi.getAll(params),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryCreate) => categoryApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.categories });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryUpdate }) =>
      categoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.categories });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => categoryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.categories });
    },
  });
}

export function useBulkDeleteCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { ids: number[] }) => categoryApi.bulkDelete(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.categories });
    },
  });
}

export function useBulkReorderCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { items: { id: number; display_order: number }[] }) => categoryApi.bulkReorder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.categories });
    },
  });
}

// ================================================
// MENU ITEM HOOKS
// ================================================

export function useMenuItem(id: number) {
  return useQuery({
    queryKey: [...menuKeys.items, id],
    queryFn: () => menuItemApi.getById(id),
    enabled: !!id,
  });
}

export function useMenuItems(params?: { 
  page?: number; 
  size?: number; 
  search?: string;
  category_id?: number;
  is_vegetarian?: boolean;
  is_spicy?: boolean;
}) {
  return useQuery({
    queryKey: [...menuKeys.items, params],
    queryFn: () => menuItemApi.getAll(params),
  });
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MenuItemCreate) => menuItemApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.items });
    },
  });
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: MenuItemUpdate }) =>
      menuItemApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.items });
    },
  });
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => menuItemApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.items });
    },
  });
}

export function useBulkDeleteMenuItems() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { ids: number[] }) => menuItemApi.bulkDelete(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.items });
    },
  });
}

export function useBulkReorderMenuItems() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { items: { id: number; display_order: number }[] }) => menuItemApi.bulkReorder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuKeys.items });
    },
  });
}
