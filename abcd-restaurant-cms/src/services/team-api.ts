import { apiClient } from "@/lib/api-client";
import type { TeamMember, TeamMemberBulkItem } from "@/types/api/team";

export const teamApi = {
  getAll: () => apiClient.get<never, TeamMember[]>("/team-members"),
  getById: (id: number) => apiClient.get<never, TeamMember>(`/team-members/${id}`),
  create: (data: Omit<TeamMember, "id">) => apiClient.post<never, TeamMember>("/team-members", data),
  update: (id: number, data: Partial<TeamMember>) => apiClient.put<never, TeamMember>(`/team-members/${id}`, data),
  delete: (id: number) => apiClient.delete<never, { message: string }>(`/team-members/${id}`),
  syncBulk: (items: TeamMemberBulkItem[]) => apiClient.put<never, TeamMember[]>("/team-members/sync/bulk", items),
};
