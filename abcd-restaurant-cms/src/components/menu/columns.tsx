// @ts-nocheck
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MenuItem } from "@/types/api/menu";
import { MoreHorizontal, Pencil, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import { useDeleteMenuItem } from "@/hooks/use-menu";
import { toast } from "sonner";

const MenuItemActions = ({ item }: { item: MenuItem }) => {
  const [open, setOpen] = useState(false);
  const deleteMenuItem = useDeleteMenuItem();

  const handleDelete = () => {
    deleteMenuItem.mutate(item.id, {
      onSuccess: () => {
        toast.success("Item deleted successfully!");
        setOpen(false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.detail || "Failed to delete item.");
        setOpen(false);
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="font-outfit">
          <DropdownMenuGroup>
            <Link href={`/menu/${item.id}/edit`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        title={`Delete "${item.name}"?`}
        description="Are you sure you want to delete this menu item? This action cannot be undone."
        isDeleting={deleteMenuItem.isPending}
      />
    </>
  );
};

import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<MenuItem, any>[] = [
  {
    id: "drag-handle",
    header: () => null,
    cell: () => <GripVertical className="h-4 w-4 text-muted-foreground/50 hover:text-foreground transition-colors" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image_url") as string;
      const name = row.getValue("name") as string;
      return (
        <Avatar className="h-10 w-10 rounded-md">
          <AvatarImage src={image} alt={name} className="object-cover" />
          <AvatarFallback className="rounded-md bg-muted text-xs">IMG</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Item Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <span className="font-medium font-outfit text-foreground">{name}</span>;
    },
  },
  {
    accessorKey: "category_id",
    header: "Category",
    cell: ({ row }) => {
      const categoryName = row.original.category?.name || String(row.getValue("category_id"));
      return <span className="text-muted-foreground">{categoryName}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <span className="font-outfit">{formatted}</span>;
    },
  },
  {
    accessorKey: "is_veg",
    header: "Dietary",
    cell: ({ row }) => {
      const isVeg = row.getValue("is_veg") as boolean; const isSpicy = row.original.is_spicy;
      if (!isVeg && !isSpicy) return null;
      return (
        <div className="flex gap-1 flex-wrap">{isVeg && <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-200">Veg</Badge>}{isSpicy && <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-red-200 text-xs">🌶️ Spicy</Badge>}</div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <div className="flex justify-end"><MenuItemActions item={row.original as any} /></div>,
  },
];







