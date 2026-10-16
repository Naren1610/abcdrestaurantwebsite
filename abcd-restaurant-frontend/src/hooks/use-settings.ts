import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/services/settings-api';

export const settingsKeys = {
  globalSettings: ['global-settings'] as const,
};

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.globalSettings,
    queryFn: settingsApi.getSettings,
    staleTime: 1000 * 60 * 2, // 2 minutes cache
  });
}
