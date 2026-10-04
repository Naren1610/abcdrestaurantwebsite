"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useDeleteMenuItem } from "@/hooks/use-menu";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import type { MenuItem } from "@/types/api/menu";

export function MenuItemActions({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const deleteMenuItem = useDeleteMenuItem();

  const handleDelete = () => {
    deleteMenuItem.mutate(item.id, {
      onSuccess: () => {
        toast.success("Menu item deleted successfully!");
        setOpen(false);
      },
      onError: (err: Error) => {
        const axiosErr = err as import('axios').AxiosError<{detail: string}>;
        toast.error(axiosErr.response?.data?.detail || "Failed to delete menu item.");
        setOpen(false);
      },
    });
  };

  return (
    <>
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted/50 p-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/menu/${item.id}/edit`}>
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
      </div>

      <ConfirmDeleteDialog
        open={open}
        onOpenChange={setOpen}
        title={`Delete "${item.name}"?`}
        description="Are you sure you want to delete this menu item? This action cannot be undone."
        onConfirm={handleDelete}
        isDeleting={deleteMenuItem.isPending}
      />
    </>
  );
}
