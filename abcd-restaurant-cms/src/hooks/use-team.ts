import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "@/services/team-api";
import type { TeamMemberBulkItem } from "@/types/api/team";
import { toast } from "sonner";

export const TEAM_QUERY_KEY = ["team-members"] as const;

export function useTeamMembers() {
  return useQuery({
    queryKey: TEAM_QUERY_KEY,
    queryFn: teamApi.getAll,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSyncTeamMembers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items: TeamMemberBulkItem[]) => teamApi.syncBulk(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_QUERY_KEY });
      toast.success("Team & chefs updated successfully.");
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || "Failed to update team members.";
      toast.error(message);
    },
  });
}
