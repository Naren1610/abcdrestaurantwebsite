"use client";
import { AxiosError } from 'axios';

import { Suspense } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MenuItemForm } from "@/components/menu/menu-item-form";
import { MenuItemFormValues } from "@/lib/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCreateMenuItem } from "@/hooks/use-menu";
import { toast } from "sonner";

function NewMenuItemContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const returnUrl = from === "categories" ? "/menu?tab=categories" : "/menu?tab=items";
  const backLabel = from === "categories" ? "Back to Categories" : "Back to Menu";
  const createMenuItem = useCreateMenuItem();

  const handleCreate = (values: MenuItemFormValues) => {
    createMenuItem.mutate(
      {
        name: values.name,
        description: values.description || null,
        price: Number(values.price),
        category_id: Number(values.categoryId),
        is_veg: values.isVeg,
        is_spicy: values.isSpicy,
        is_chef_special: values.isChefSpecial,
        is_signature_dish: values.isSignatureDish,
        image_url: values.image,
      },
      {
        onSuccess: () => {
          toast.success("Menu item created successfully!");
          router.push(returnUrl);
        },
        onError: (error: unknown) => {
          const axiosError = error as AxiosError<{"detail": string}>;
          const message = axiosError.response?.data?.detail || "Failed to create menu item. Please try again.";
          toast.error(message);
        },
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div>
          <Link href={returnUrl}>
            <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Button>
          </Link>
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Add Menu Item</h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Create a new dish or beverage to add to your menu.
          </p>
        </div>

        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8">
          <MenuItemForm
            onSubmit={handleCreate}
            onCancel={() => router.push(returnUrl)}
            isLoading={createMenuItem.isPending}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function NewMenuItemPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-brand" />
          </div>
        </DashboardLayout>
      }
    >
      <NewMenuItemContent />
    </Suspense>
  );
}
