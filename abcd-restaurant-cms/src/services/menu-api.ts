import { apiClient } from '@/lib/api-client';
import type {
  Category,
  CategoryCreate,
  CategoryUpdate,
  MenuItem,
  MenuItemCreate,
  MenuItemUpdate,
} from '@/types/api/menu';

// --- Common Types ---
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface BulkDeletePayload {
  ids: number[];
}

export interface ReorderItem {
  id: number;
  display_order: number;
}

export interface BulkReorderPayload {
  items: ReorderItem[];
}

// --- Category API calls ---

export const categoryApi = {
  getAll: (params?: { page?: number; size?: number; search?: string }) => 
    apiClient.get<never, PaginatedResponse<Category>>('/menu/categories', { params }),

  getById: (id: number) => apiClient.get<never, Category>(`/menu/categories/${id}`),

  create: (data: CategoryCreate) =>
    apiClient.post<never, Category>('/menu/categories', data),

  update: (id: number, data: CategoryUpdate) =>
    apiClient.put<never, Category>(`/menu/categories/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<never, { message: string }>(`/menu/categories/${id}`),
    
  bulkDelete: (data: BulkDeletePayload) =>
    apiClient.delete<never, { message: string }>('/menu/categories/bulk', { data }),
    
  bulkReorder: (data: BulkReorderPayload) =>
    apiClient.patch<never, { message: string }>('/menu/categories/reorder', data),
};

// --- MenuItem API calls ---

export const menuItemApi = {
  getAll: (params?: { 
    page?: number; 
    size?: number; 
    search?: string;
    category_id?: number;
    is_vegetarian?: boolean;
    is_spicy?: boolean;
    is_chef_special?: boolean;
    is_signature_dish?: boolean;
  }) => 
    apiClient.get<never, PaginatedResponse<MenuItem>>('/menu/items', { params }),

  getById: (id: number) => apiClient.get<never, MenuItem>(`/menu/items/${id}`),

  create: (data: MenuItemCreate) =>
    apiClient.post<never, MenuItem>('/menu/items', data),

  update: (id: number, data: MenuItemUpdate) =>
    apiClient.put<never, MenuItem>(`/menu/items/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<never, { message: string }>(`/menu/items/${id}`),
    
  bulkDelete: (data: BulkDeletePayload) =>
    apiClient.delete<never, { message: string }>('/menu/items/bulk', { data }),
    
  bulkReorder: (data: BulkReorderPayload) =>
    apiClient.patch<never, { message: string }>('/menu/items/reorder', data),
};
