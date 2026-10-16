"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CategoryForm } from "@/components/categories/category-form";
import { CategoryFormValues } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCreateCategory } from "@/hooks/use-menu";
import { toast } from "sonner";

export default function NewCategoryPage() {
  const router = useRouter();
  const createCategory = useCreateCategory();

  const handleCreate = (values: CategoryFormValues) => {
    createCategory.mutate(
      {
        name: values.name,
        subtitle: values.subtitle || null,
        display_order: 0,
        letter_group: values.letter_group || null,
      },
      {
        onSuccess: () => {
          toast.success("Category created successfully!");
          router.push("/menu?tab=categories");
        },
        onError: () => {
          toast.error("Failed to create category. Please try again.");
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
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Add New Category</h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Create a new category to group your menu items.
          </p>
        </div>
        
        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8">
          <CategoryForm isLoading={createCategory.isPending} 
            onSubmit={handleCreate} 
            onCancel={() => router.push("/menu?tab=categories")} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

