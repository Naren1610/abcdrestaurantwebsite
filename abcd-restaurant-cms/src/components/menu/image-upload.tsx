"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  aspectRatio?: "square" | "video" | "banner" | "auto";
}

import { apiClient } from "@/lib/api-client";
import axios from "axios";

export function ImageUpload({ value, onChange, aspectRatio = "auto", className = "w-full" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setPreview(value || null);
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Optional: Set local preview immediately for UX
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // 1. Get Signature from Backend
      interface SignatureResponse {
        signature: string;
        timestamp: number;
        public_id: string;
        folder: string;
        api_key: string;
        cloud_name: string;
      }
      const sigResponse = await apiClient.post<never, SignatureResponse>("/upload/signature", {
        entity_type: "menu",
        entity_name: file.name.split('.')[0] || "image",
      });
      const { signature, timestamp, public_id, folder, api_key, cloud_name } = sigResponse;

      // 2. Prepare Cloudinary FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("public_id", public_id);
      formData.append("folder", folder);

      // 3. Upload to Cloudinary
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );

      // 4. Send final URL back to parent form
      const secureUrl = uploadRes.data.secure_url;
      setPreview(secureUrl);
      onChange(secureUrl);

    } catch (error) {
      console.error("Upload failed:", error);
      // Revert preview on failure
      setPreview(value || null);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [onChange, value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
  });

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onChange("");
  };

  const aspectClass = 
    aspectRatio === "square" ? "aspect-square" :
    aspectRatio === "video" ? "aspect-video" :
    aspectRatio === "banner" ? "aspect-[3/1]" :
    "h-48"; // auto/default

  return (
    <div className={className}>
      {preview ? (
        <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden border border-border`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className={`w-full h-full object-contain ${isUploading ? 'opacity-50' : ''}`}
          />
          {isUploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/20 backdrop-blur-sm">
              <Loader2 className="h-8 w-8 animate-spin text-brand mb-2" />
              <span className="text-sm font-semibold font-outfit text-brand">Uploading...</span>
            </div>
          )}
          {!isUploading && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${aspectClass} ${
            isDragActive ? "border-brand bg-brand/5" : "border-border hover:bg-muted/50"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm font-medium font-outfit text-foreground">
            {isDragActive
              ? "Drop the image here..."
              : "Drag & drop an image here, or click to select"}
          </p>
          <p className="text-xs text-muted-foreground mt-2 font-outfit">
            Supports JPG, PNG, WEBP (Max 5MB)
          </p>
        </div>
      )}
    </div>
  );
}

