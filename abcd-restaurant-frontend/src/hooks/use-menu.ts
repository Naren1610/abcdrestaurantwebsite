import { useQuery } from '@tanstack/react-query';
import { categoryApi, menuItemApi, menuApi } from '@/services/menu-api';

export const menuKeys = {
  categories: ['categories'] as const,
  items: ['menu-items'] as const,
  clientMenu: ['client-menu'] as const,
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

export function useClientMenu() {
  return useQuery({
    queryKey: menuKeys.clientMenu,
    queryFn: menuApi.getClientMenu,
  });
}
