"use client";

import React, { useState, Fragment } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
  getPaginationRowModel,
  ExpandedState,
  Row,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactNode;
  emptyMessage?: string;
  showPageSizeOptions?: boolean;
  pageCount?: number;
  pagination?: { pageIndex: number; pageSize: number };
  onPaginationChange?: (updater: any) => void;
  manualPagination?: boolean;
  rowSelection?: Record<string, boolean>;
  onRowSelectionChange?: (updater: any) => void;
  onReorder?: (data: TData[]) => void;
}

function DraggableRow({ row, renderSubComponent }: { row: Row<any>, renderSubComponent?: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: (row.original as any).id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { position: "relative" as const, zIndex: 1 } : {}),
  };

  return (
    <Fragment>
      <TableRow
        ref={setNodeRef}
        style={style}
        className={`transition-colors hover:bg-muted/40 ${isDragging ? "bg-muted/80 shadow-md" : ""}`}
        data-state={row.getIsExpanded() ? "expanded" : undefined}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell 
            key={cell.id} 
            className="py-3" 
            {...(cell.column.id === "drag-handle" ? { ...attributes, ...listeners, style: { cursor: "grab" } } : {})}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
      {row.getIsExpanded() && renderSubComponent && (
        <TableRow className="bg-muted/10 border-b border-border/50">
          <TableCell colSpan={row.getVisibleCells().length} className="p-0">
            {renderSubComponent({ row })}
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  renderSubComponent,
  emptyMessage = "No results found.",
  showPageSizeOptions = true,
  pageCount,
  pagination,
  onPaginationChange,
  manualPagination = false,
  rowSelection = {},
  onRowSelectionChange,
  onReorder,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && onReorder) {
      const oldIndex = data.findIndex((item: any) => item.id === active.id);
      const newIndex = data.findIndex((item: any) => item.id === over?.id);
      onReorder(arrayMove(data, oldIndex, newIndex));
    }
  };

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      expanded,
      rowSelection,
      ...(pagination ? { pagination } : {}),
    },
    enableRowSelection: true,
    onRowSelectionChange,
    onExpandedChange: setExpanded,
    onPaginationChange,
    manualPagination,
    getRowCanExpand: () => !!renderSubComponent,
    getRowId: (row: any, relativeIndex: number, parent?: any) => row.id ? String(row.id) : String(relativeIndex),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const tableContent = (
    <div className="rounded-xl border bg-card/60 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-outfit text-muted-foreground uppercase text-xs font-semibold tracking-wider h-11">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            onReorder ? (
              <SortableContext
                items={data.map((item: any) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} renderSubComponent={renderSubComponent} />
                ))}
              </SortableContext>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    className="transition-colors hover:bg-muted/40"
                    data-state={row.getIsExpanded() ? "expanded" : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && renderSubComponent && (
                    <TableRow className="bg-muted/10 border-b border-border/50">
                      <TableCell colSpan={row.getVisibleCells().length} className="p-0">
                        {renderSubComponent({ row })}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            )
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground font-outfit">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination UI */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/5">
        <div className="flex-1 text-sm text-muted-foreground font-outfit">
          Showing{" "}
          <span className="font-medium text-foreground">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium text-foreground">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          entries
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          {showPageSizeOptions && (
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-muted-foreground font-outfit hidden sm:block">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px] text-sm font-outfit">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 30, 50, 70, 100].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`} className="font-outfit text-sm">
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium font-outfit">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    </div>
  );

  return onReorder ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {tableContent}
    </DndContext>
  ) : (
    tableContent
  );
}
