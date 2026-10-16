import { apiClient } from '@/lib/api-client';
import type { Category, MenuItem, ClientMenuCategory, ClientMenuItem } from '@/types/api/menu';

export const categoryApi = {
  getAll: () => apiClient.get<never, Category[]>('/menu/categories'),
};

export const menuItemApi = {
  getAll: () => apiClient.get<never, MenuItem[]>('/menu/items'),
};

export const menuApi = {
  getClientMenu: () => apiClient.get<ClientMenuCategory[]>('/menu/client').then(res => res.data),
  getSignatureDishes: () => apiClient.get<ClientMenuItem[]>('/menu/signature-dishes').then(res => res.data),
};
