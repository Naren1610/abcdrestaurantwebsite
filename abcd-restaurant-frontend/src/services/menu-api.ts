import { apiClient } from '@/lib/api-client';
import type { Category, MenuItem, ClientMenuCategory } from '@/types/api/menu';

export const categoryApi = {
  getAll: () => apiClient.get<never, Category[]>('/menu/categories'),
};

export const menuItemApi = {
  getAll: () => apiClient.get<never, MenuItem[]>('/menu/items'),
};

export const menuApi = {
  getClientMenu: () => apiClient.get<ClientMenuCategory[]>('/menu/client').then(res => res.data),
};
