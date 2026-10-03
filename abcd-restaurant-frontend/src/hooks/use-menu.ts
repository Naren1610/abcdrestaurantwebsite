import { useQuery } from '@tanstack/react-query';
import { categoryApi, menuItemApi } from '@/services/menu-api';

export const menuKeys = {
  categories: ['categories'] as const,
  items: ['menu-items'] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: menuKeys.categories,
    queryFn: categoryApi.getAll,
  });
}

export function useMenuItems() {
  return useQuery({
    queryKey: menuKeys.items,
    queryFn: menuItemApi.getAll,
  });
}