import { useQuery } from "@tanstack/react-query";
import { teamApi } from "@/services/team-api";

export const teamKeys = {
  all: ["team-members"] as const,
};

export function useTeamMembers() {
  return useQuery({
    queryKey: teamKeys.all,
    queryFn: teamApi.getAll,
    staleTime: 1000 * 60 * 5,
  });
}
