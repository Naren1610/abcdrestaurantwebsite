import { apiClient } from '@/lib/api-client';
import type { ClientSettings } from '@/types/api/settings';

export const settingsApi = {
  getSettings: () => apiClient.get<ClientSettings>('/settings/').then(res => res.data),
};
