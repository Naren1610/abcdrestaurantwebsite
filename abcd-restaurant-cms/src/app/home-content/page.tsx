"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HomeContentForm } from "@/components/content/home-content-form";
import { mockHomeContent } from "@/lib/mockData";
import { HomeContentFormValues } from "@/lib/schemas";

export default function HomeContentPage() {
  const handleSave = (values: HomeContentFormValues) => {
    // API call stub
    console.log("Saving home content:", values);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Home Page Content</h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Manage the hero banner, call-to-actions, and featured menu items on the homepage.
          </p>
        </div>
        
        <HomeContentForm onSubmit={handleSave} initialData={mockHomeContent} />
      </div>
    </DashboardLayout>
  );
}

