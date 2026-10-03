"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MenuItemForm } from "@/components/menu/menu-item-form";
import { MenuItemFormValues } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCreateMenuItem } from "@/hooks/use-menu";
import { toast } from "sonner";

export default function NewMenuItemPage() {
  const router = useRouter();
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
        image_url: values.image,
      },
      {
        onSuccess: () => {
          toast.success("Menu item created successfully!");
          router.push("/menu?tab=items");
        },
        onError: () => {
          toast.error("Failed to create menu item. Please try again.");
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
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Add New Menu Item</h2>
          <p className="text-muted-foreground font-outfit mt-2 text-sm">
            Fill in the details below to add a new item to your menu.
          </p>
        </div>
        
        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8">
          <MenuItemForm isLoading={createMenuItem.isPending} 
            onSubmit={handleCreate} 
            onCancel={() => router.push("/menu?tab=items")} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
