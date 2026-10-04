"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OurStoryForm } from "@/components/content/our-story-form";
import { mockOurStoryContent } from "@/lib/mockData";
import { OurStoryFormValues } from "@/lib/schemas";

export default function AboutContentPage() {
  const handleSave = (values: OurStoryFormValues) => {
    // API call stub
    console.log("Saving about content:", values);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Our Story Content</h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Manage your restaurant&apos;s story, history, and chef biographies.
          </p>
        </div>
        
        <OurStoryForm onSubmit={handleSave} initialData={mockOurStoryContent} />
      </div>
    </DashboardLayout>
  );
}

