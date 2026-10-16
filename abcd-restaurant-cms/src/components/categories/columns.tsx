"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/api/menu";
import { ChevronDown, ChevronRight, MoreHorizontal, Pencil, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryActions } from "./category-actions";
import { useMenuItems } from "@/hooks/use-menu";
import { Checkbox } from "@/components/ui/checkbox";

export type CategoryWithCount = Category & { itemCount?: number };

const CategoryItemCount = ({ categoryId }: { categoryId: number }) => {
  const { data, isLoading } = useMenuItems({ category_id: categoryId, size: 1 });
  if (isLoading) return <span className="font-outfit font-medium bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">...</span>;
  return <span className="font-outfit font-medium bg-muted px-2 py-1 rounded-md text-xs">{data?.total || 0} Items</span>;
};

export const columns: ColumnDef<Category, any>[] = [
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
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={row.getToggleExpandedHandler()}
          className="h-8 w-8 p-0"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <span className="font-medium font-outfit text-foreground">{name}</span>;
    },
  },
  {
    accessorKey: "subtitle",
    header: "Subtitle",
    cell: ({ row }) => {
      const desc = row.getValue("subtitle") as string;
      return <span className="text-muted-foreground font-outfit text-sm line-clamp-1 max-w-xs">{desc || "-"}</span>;
    },
  },
  {
    accessorKey: "letter_group",
    header: "ABCD Chapter",
    cell: ({ row }) => {
      const group = row.original.letter_group;
      if (!group) {
        return <span className="text-muted-foreground/40 font-outfit text-xs font-mono">-</span>;
      }
      return (
        <span className="inline-flex items-center justify-center font-bold font-outfit text-xs bg-brand text-white rounded-md w-6 h-6 shadow-sm">
          {group}
        </span>
      );
    },
  },
  {
    id: "itemCount",
    header: "Items",
    cell: ({ row }) => <CategoryItemCount categoryId={row.original.id} />
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex justify-end"><CategoryActions category={category} /></div>
      );
    },
  },
];

