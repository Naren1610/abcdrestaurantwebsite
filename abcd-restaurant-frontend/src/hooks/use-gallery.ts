import { useQuery } from '@tanstack/react-query';
import { galleryApi } from '@/services/gallery-api';

export const galleryKeys = {
  clientGallery: ['client-gallery'] as const,
};

export function useClientGallery() {
  return useQuery({
    queryKey: galleryKeys.clientGallery,
    queryFn: galleryApi.getClientGallery,
  });
}
