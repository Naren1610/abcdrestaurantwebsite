import { apiClient } from '@/lib/api-client';
import type { ClientGalleryResponse, ClientGalleryTopPick } from '@/types/api/gallery';

export const galleryApi = {
  getClientGallery: () => apiClient.get<ClientGalleryResponse>('/gallery/client').then(res => res.data),
  getTopPicks: () => apiClient.get<ClientGalleryTopPick[]>('/gallery/top-picks').then(res => res.data),
};
