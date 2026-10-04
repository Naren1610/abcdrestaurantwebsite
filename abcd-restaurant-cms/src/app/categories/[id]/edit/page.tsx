"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CategoryForm } from "@/components/categories/category-form";
import { CategoryFormValues } from "@/lib/schemas";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle, RotateCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCategory, useUpdateCategory } from "@/hooks/use-menu";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  
  const { data: category, isLoading: isFetching, isError, error, refetch } = useCategory(id);
  const updateCategory = useUpdateCategory();
  
  const [initialData, setInitialData] = useState<CategoryFormValues | null>(null);

  const [prevCategory, setPrevCategory] = useState(category);
  if (category !== prevCategory) {
    setPrevCategory(category);
    if (category) {
      setInitialData({
        name: category.name,
        subtitle: category.subtitle || "",
      });
    }
  }

  const handleUpdate = (values: CategoryFormValues) => {
    updateCategory.mutate(
      { id, data: { name: values.name, subtitle: values.subtitle || null } },
      {
        onSuccess: () => {
          toast.success("Category updated successfully!");
          router.push("/menu?tab=categories");
        },
        onError: () => {
          toast.error("Failed to update category. Please try again.");
        },
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div>
          <Link href="/menu?tab=categories">
            <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Edit Category</h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Modify the details of your category below.
          </p>
        </div>
        
        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8">
          {isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-destructive/10 p-3 mb-4 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">Failed to Load Category</h3>
              <p className="font-outfit text-sm text-muted-foreground max-w-sm mb-6">
                {(error as Error)?.message || "We encountered an issue fetching the category details. Please try again."}
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => router.push("/menu?tab=categories")} className="font-outfit">
                  Back to Categories
                </Button>
                <Button onClick={() => refetch()} className="font-outfit bg-brand text-white hover:bg-brand/90">
                  <RotateCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </div>
          ) : isFetching || !initialData ? (
             <div className="flex items-center justify-center py-12">
               <Loader2 className="h-6 w-6 animate-spin text-brand" />
               <span className="ml-2 font-outfit text-muted-foreground">Loading category details...</span>
             </div>
          ) : (
            <CategoryForm 
              initialData={initialData}
              onSubmit={handleUpdate} 
              onCancel={() => router.push("/menu?tab=categories")} 
              isLoading={updateCategory.isPending}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
