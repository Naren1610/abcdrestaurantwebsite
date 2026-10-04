"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GalleryImageForm } from "@/components/gallery/gallery-image-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, AlertCircle, RotateCw } from "lucide-react";
import { useGalleryImage } from "@/hooks/use-gallery";
import { useParams, useRouter } from "next/navigation";

export default function GalleryImageEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { data: image, isLoading, isError, error, refetch } = useGalleryImage(id);

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
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Edit Gallery Image</h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Update the title, category, or replace the image file.
          </p>
        </div>
        
        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8">
          {isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-destructive/10 p-3 mb-4 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">Failed to Load Image</h3>
              <p className="font-outfit text-sm text-muted-foreground max-w-sm mb-6">
                {(error as Error)?.message || "We encountered an issue fetching the image details. Please try again."}
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => router.push("/gallery?tab=images")} className="font-outfit">
                  Back to Gallery
                </Button>
                <Button onClick={() => refetch()} className="font-outfit bg-brand text-white hover:bg-brand/90">
                  <RotateCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-brand mb-4" />
              <p className="font-outfit text-muted-foreground">Loading image details...</p>
            </div>
          ) : image ? (
            <GalleryImageForm initialData={image} />
          ) : (
             <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-outfit text-muted-foreground">Image not found.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
