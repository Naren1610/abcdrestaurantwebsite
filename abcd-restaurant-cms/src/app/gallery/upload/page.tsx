import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GalleryImageForm } from "@/components/gallery/gallery-image-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function GalleryUploadPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div>
          <Link href="/gallery?tab=images">
            <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Button>
          </Link>
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Upload Gallery Image</h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Add a new high-quality image to display in your storefront gallery.
          </p>
        </div>
        
        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8">
          <GalleryImageForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
