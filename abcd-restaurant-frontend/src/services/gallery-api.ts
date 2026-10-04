import { apiClient } from '@/lib/api-client';
import type { ClientGalleryResponse } from '@/types/api/gallery';

export const galleryApi = {
  getClientGallery: () => apiClient.get<ClientGalleryResponse>('/gallery/client').then(res => res.data),
};
