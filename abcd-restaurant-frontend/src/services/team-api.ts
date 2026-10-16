import { apiClient } from "@/lib/api-client";
import type { TeamMember } from "@/types/api/team";

export const teamApi = {
  getAll: () => apiClient.get<TeamMember[]>("/team-members").then((res) => res.data),
};
