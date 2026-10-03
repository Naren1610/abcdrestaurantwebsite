"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MenuItemForm } from "@/components/menu/menu-item-form";
import { MenuItemFormValues } from "@/lib/schemas";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle, RotateCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMenuItem, useUpdateMenuItem } from "@/hooks/use-menu";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function EditMenuItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data: item, isLoading: isFetching, isError, error, refetch } = useMenuItem(id);
  const updateMenuItem = useUpdateMenuItem();

  const [initialData, setInitialData] = useState<MenuItemFormValues | null>(null);

  useEffect(() => {
    if (item) {
      setInitialData({
        name: item.name,
        description: item.description || "",
        price: item.price,
        categoryId: String(item.category_id),
        tags: item.is_veg ? "veg" : "",
        isSpicy: item.is_spicy || false,
        isVeg: item.is_veg || false,
        isNonVeg: false,
        isChefSpecial: item.is_chef_special || false,
        image: item.image_url || "",
      });
    }
  }, [item]);

  const handleUpdate = (values: MenuItemFormValues) => {
    updateMenuItem.mutate(
      {
        id,
        data: {
          name: values.name,
          description: values.description || null,
          price: Number(values.price),
          category_id: Number(values.categoryId),
          is_veg: values.isVeg,
          is_spicy: values.isSpicy,
          is_chef_special: values.isChefSpecial,
          image_url: values.image,
        },
      },
      {
        onSuccess: () => {
          toast.success("Menu item updated successfully!");
          router.push("/menu?tab=items");
        },
        onError: () => {
          toast.error("Failed to update menu item. Please try again.");
        },
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div>
          <Link href="/menu?tab=items">
            <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Menu
            </Button>
          </Link>
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Edit Menu Item</h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Modify the details of your menu item below.
          </p>
        </div>

        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8">
          {isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-destructive/10 p-3 mb-4 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">Failed to Load Menu Item</h3>
              <p className="font-outfit text-sm text-muted-foreground max-w-sm mb-6">
                {(error as any)?.message || "We encountered an issue fetching the menu item details. Please try again."}
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => router.push("/menu?tab=items")} className="font-outfit">
                  Back to Menu
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
              <span className="ml-2 font-outfit text-muted-foreground">Loading menu item details...</span>
            </div>
          ) : (
            <MenuItemForm
              initialData={initialData}
              onSubmit={handleUpdate}
              onCancel={() => router.push("/menu?tab=items")}
              isLoading={updateMenuItem.isPending}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
