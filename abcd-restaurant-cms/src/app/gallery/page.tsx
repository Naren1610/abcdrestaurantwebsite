"use client";

import { Suspense } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GalleryManager } from "@/components/gallery/gallery-manager";

export default function GalleryPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground font-outfit">Loading gallery...</div>}>
          <GalleryManager />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}