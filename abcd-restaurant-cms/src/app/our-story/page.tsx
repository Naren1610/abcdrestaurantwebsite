"use client";

import { useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OurStoryForm } from "@/components/content/our-story-form";
import { useTeamMembers, useSyncTeamMembers } from "@/hooks/use-team";
import { OurStoryFormValues } from "@/lib/schemas";
import { Loader2 } from "lucide-react";

export default function AboutContentPage() {
  const { data: teamMembers, isLoading } = useTeamMembers();
  const syncMutation = useSyncTeamMembers();

  const handleSave = async (values: OurStoryFormValues) => {
    const payload = (values.teamMembers || []).map((m, index) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      bio: m.description || "",
      image_url: m.image || null,
      display_order: index,
      is_active: true,
    }));

    await syncMutation.mutateAsync(payload);
  };

  const initialData = useMemo<OurStoryFormValues>(
    () => ({
      storyHeadline: "Our Story",
      storyContent:
        "ABCD Restaurant was founded with a passion for bringing authentic Indian flavors to our community. Our recipes have been passed down through generations, combining traditional techniques with fresh, local ingredients.",
      storyImage: "/images/about/abcd-restaurant.png",
      teamMembers:
        teamMembers && teamMembers.length > 0
          ? teamMembers.map((m) => ({
              id: m.id,
              name: m.name,
              role: m.role,
              description: m.bio || "",
              image: m.image_url || "",
            }))
          : [{ name: "", role: "", description: "", image: "" }],
    }),
    [teamMembers]
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">
            Our Story &amp; Team
          </h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Manage your restaurant&apos;s team members and chef biographies. Changes sync directly to the live database.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 bg-card rounded-xl border border-border/40">
            <Loader2 className="h-8 w-8 animate-spin text-brand" />
          </div>
        ) : (
          <OurStoryForm
            onSubmit={handleSave}
            initialData={initialData}
            isLoading={syncMutation.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
