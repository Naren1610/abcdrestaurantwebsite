"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ImageUpload } from "@/components/menu/image-upload";
import { useGalleryCategories, useCreateGalleryImage, useUpdateGalleryImage } from "@/hooks/use-gallery";

export function GalleryImageForm({ initialData }: { initialData?: import('@/types/api/gallery').GalleryImage }) {
  const router = useRouter();
  
  const { data: categoriesData, isLoading: isLoadingCategories } = useGalleryCategories(1, 100);
  const categories = categoriesData?.items || [];
  const createMutation = useCreateGalleryImage();
  const updateMutation = useUpdateGalleryImage();
  
  const [title, setTitle] = useState(initialData?.title || "");
  const [categoryId, setCategoryId] = useState<string>(initialData?.category_id?.toString() || "");
  const [isTopPick, setIsTopPick] = useState(initialData?.is_top_pick || false);
  const [caption, setCaption] = useState(initialData?.caption || "");
  const [captionError, setCaptionError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image_url || null);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }
    
    if (!previewUrl) {
      toast.error("Please upload an image.");
      return;
    }

    if (isTopPick && !caption.trim()) {
      setCaptionError("A caption is required for Top Picks.");
      return;
    }

    const payload = {
      category_id: parseInt(categoryId),
      title: title || null,
      image_url: previewUrl,
      is_top_pick: isTopPick,
      caption: caption || null,
    };

    try {
      if (initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, data: payload });
        toast.success("Image updated successfully!");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Image uploaded successfully!");
      }
      router.push("/gallery?tab=images");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save image. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-outfit font-medium text-brand">Image Title (Optional)</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Signature Pasta"
                  className="font-outfit"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-outfit font-medium text-brand">Category <span className="text-destructive">*</span></label>
                <Select value={categoryId} onValueChange={(val) => setCategoryId(val || "")} required>
                  <SelectTrigger className="font-outfit w-full">
                    <span className="truncate">
                      {isLoadingCategories ? "Loading..." : categoryId
                        ? categories.find((cat) => String(cat.id) === categoryId)?.name || categoryId
                        : "Select a category"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()} className="font-outfit">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-6 pt-2">
                <div className="space-y-0.5">
                  <label className="text-sm font-outfit font-medium text-brand">Top Pick</label>
                  <p className="font-outfit text-xs text-muted-foreground">
                    Display on the storefront home screen
                  </p>
                </div>
                <Switch 
                  checked={isTopPick} 
                  onCheckedChange={setIsTopPick}
                />
              </div>

              {isTopPick && (
                <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-sm font-outfit font-medium text-brand">Polaroid Caption <span className="text-destructive">*</span></label>
                  <Input
                    value={caption}
                    onChange={(e) => {
                      setCaption(e.target.value);
                      if (captionError) setCaptionError("");
                    }}
                    placeholder="e.g. Evenings done right."
                    className={`font-outfit ${captionError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    maxLength={40}
                  />
                  <div className="flex justify-between items-start">
                    {captionError ? (
                      <p className="text-[11px] text-destructive font-medium">{captionError}</p>
                    ) : (
                      <div></div>
                    )}
                    <p className="text-[10px] text-muted-foreground text-right">{caption.length}/40</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-outfit font-medium text-brand">Image File <span className="text-destructive">*</span></label>
              
              <ImageUpload
                value={previewUrl || ""}
                onChange={(url) => setPreviewUrl(url)}
                aspectRatio="video"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-border/50">
            <Link href="/gallery?tab=images">
              <Button type="button" variant="outline" className="font-outfit rounded-xl">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting} className="font-outfit bg-brand text-white hover:bg-brand/90 rounded-xl min-w-[120px]">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : initialData ? "Save Changes" : "Upload Image"}
            </Button>
          </div>
        </form>
    </div>
  );
}
