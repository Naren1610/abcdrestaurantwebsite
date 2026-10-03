"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MediaUploadForm } from "@/components/media/media-upload-form";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewMediaPage() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div>
          <Link href="/media">
            <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Button>
          </Link>
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Upload Media</h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Upload new images to your gallery.
          </p>
        </div>
        
        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8">
          <MediaUploadForm onSuccess={() => router.push("/media")} />
        </div>
      </div>
    </DashboardLayout>
  );
}