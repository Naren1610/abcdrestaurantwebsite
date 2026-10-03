"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useDeleteCategory } from "@/hooks/use-menu";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import { CategoryWithCount } from "./columns";

export function CategoryActions({ category }: { category: CategoryWithCount }) {
  const [open, setOpen] = useState(false);
  const deleteCategory = useDeleteCategory();

  const handleDelete = () => {
    deleteCategory.mutate(category.id, {
      onSuccess: () => {
        toast.success("Category deleted successfully!");
        setOpen(false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.detail || "Failed to delete category.");
        setOpen(false);
      }
    });
  };

  const hasItems = category.itemCount > 0;
  const deleteTitle = `Delete "${category.name}"?`;
  const deleteDescription = hasItems 
    ? `WARNING: This category contains ${category.itemCount} menu item(s). Deleting it might cascade delete those items or fail depending on database constraints. Are you sure you want to proceed?`
    : `Are you sure you want to delete this category? This action cannot be undone.`;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted/50 p-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/categories/${category.id}/edit`}>
            <DropdownMenuItem className="cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog 
        open={open}
        onOpenChange={setOpen}
        title={deleteTitle}
        description={deleteDescription}
        onConfirm={handleDelete}
        isDeleting={deleteCategory.isPending}
      />
    </>
  );
}
