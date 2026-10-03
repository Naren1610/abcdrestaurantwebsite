"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

interface MediaUploadFormProps {
  onSuccess: () => void;
}

export function MediaUploadForm({ onSuccess }: MediaUploadFormProps) {
  const onDrop = (acceptedFiles: File[]) => {
    // Mock upload
    toast.success(`Successfully uploaded ${acceptedFiles.length} files.`);
    
    // In a real app, you would wait for API response here, then call onSuccess
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? "border-brand bg-brand/5" : "border-border/60 bg-muted/10 hover:bg-muted/20"
      }`}
    >
      <input {...getInputProps()} />
      <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
      <p className="font-outfit text-sm font-medium text-foreground">
        {isDragActive ? "Drop images here" : "Drag & drop images, or click to browse"}
      </p>
      <p className="font-outfit text-xs text-muted-foreground mt-2">
        Supports JPG, PNG, WEBP (Max 5MB)
      </p>
    </div>
  );
}