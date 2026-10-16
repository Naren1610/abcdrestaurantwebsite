"use client";

import { Suspense, useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { columns as menuColumns } from "@/components/menu/columns";
import { columns as categoryColumns } from "@/components/categories/columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2, AlertCircle, RotateCw, Search, Filter, Trash2, Pencil, Flame } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from "@/components/ui/custom-tabs";
import { useSearchParams, useRouter } from "next/navigation";
import { useCategories, useMenuItems, useBulkDeleteMenuItems, useBulkDeleteCategories, useBulkReorderMenuItems, useBulkReorderCategories } from "@/hooks/use-menu";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

const CategorySubItems = ({ categoryId }: { categoryId: number }) => {
  const { data, isLoading, isError } = useMenuItems({ page: 1, size: 50, category_id: categoryId });
  if (isLoading) return <div className="py-6 flex items-center justify-center text-sm font-outfit text-muted-foreground gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Loading items...</div>;
  if (isError) return <div className="p-4 text-sm text-destructive">Failed to load items.</div>;
  if (!data?.items?.length) return <div className="p-8 text-center text-sm font-outfit text-muted-foreground">No items in this category.</div>;

  return (
    <div className="p-4 px-6 bg-muted/10 border-y border-border/40">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.items.map((item: import('@/types/api/menu').MenuItem) => (
          <div
            key={item.id}
            className="group flex items-center justify-between gap-3 bg-white dark:bg-card p-3 rounded-lg border border-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-brand/40 hover:bg-brand/[0.015] hover:shadow-sm transition-all duration-200"
          >
            {/* Left: Thumbnail */}
            <div className="relative h-12 w-12 shrink-0 rounded-md overflow-hidden bg-muted border border-border/40 flex items-center justify-center">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-[10px] font-medium text-muted-foreground">IMG</span>
              )}
            </div>

            {/* Middle: Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              {/* Title row */}
              <div className="flex items-center gap-1.5">
                {/* Veg / Non-Veg Indicator Dot */}
                {item.is_veg ? (
                  <span
                    className="inline-flex items-center justify-center w-3 h-3 border border-emerald-600 rounded-[2px] p-[1.5px] shrink-0"
                    title="Vegetarian"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center justify-center w-3 h-3 border border-rose-600 rounded-[2px] p-[1.5px] shrink-0"
                    title="Non-Vegetarian"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  </span>
                )}
                <p className="font-outfit text-sm font-medium leading-tight truncate text-foreground" title={item.name}>
                  {item.name}
                </p>
              </div>

              {/* Price & Tags row - with generous spacing from title */}
              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                <span className="font-outfit text-xs font-semibold text-brand">
                  ${Number(item.price).toFixed(2)}
                </span>

                {item.is_veg ? (
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-[10px] font-medium px-1.5 py-0 h-4">
                    Veg
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-rose-500/10 text-rose-600 border-rose-200 text-[10px] font-medium px-1.5 py-0 h-4">
                    Non-Veg
                  </Badge>
                )}

                {item.is_spicy && (
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-700 border-amber-200 text-[10px] font-medium px-1.5 py-0 h-4 flex items-center gap-0.5">
                    <Flame className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                    Spicy
                  </Badge>
                )}
              </div>
            </div>

            {/* Right: Quick Edit Action */}
            <Link
              href={`/menu/${item.id}/edit?from=categories`}
              className="h-8 w-8 flex items-center justify-center rounded-md border border-border/50 text-muted-foreground hover:text-brand hover:border-brand/40 hover:bg-brand/5 transition-colors shrink-0"
              title={`Edit ${item.name}`}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

function MenuManagementContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab = tabParam === "categories" ? "categories" : "items";

  const handleTabChange = (val: string) => {
    router.replace(`/menu?tab=${val}`, { scroll: false });
  };

  // --- Filter State ---
  const [itemsSearch, setItemsSearch] = useState("");
  const debouncedItemsSearch = useDebounce(itemsSearch, 500);
  
  const [categoryId, setCategoryId] = useState<string>("all");
  const [isVegetarian, setIsVegetarian] = useState<string>("all");
  const [isSpicy, setIsSpicy] = useState<string>("all");
  const [highlightFilter, setHighlightFilter] = useState<string>("all");

  const [{ pageIndex: itemsPageIndex, pageSize: itemsPageSize }, setItemsPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [categoriesSearch, setCategoriesSearch] = useState("");
  const debouncedCategoriesSearch = useDebounce(categoriesSearch, 500);
  const [{ pageIndex: catPageIndex, pageSize: catPageSize }, setCatPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Reset pagination to first page when search or filters change
  useEffect(() => {
    setItemsPagination((prev) => (prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 }));
  }, [debouncedItemsSearch, categoryId, isVegetarian, isSpicy, highlightFilter]);

  useEffect(() => {
    setCatPagination((prev) => (prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 }));
  }, [debouncedCategoriesSearch]);

  // --- Row Selection & Bulk Actions ---
  const [itemsRowSelection, setItemsRowSelection] = useState<Record<string, boolean>>({});
  const [categoriesRowSelection, setCategoriesRowSelection] = useState<Record<string, boolean>>({});

  const [showBulkDeleteItems, setShowBulkDeleteItems] = useState(false);
  const [showBulkDeleteCategories, setShowBulkDeleteCategories] = useState(false);

  const bulkDeleteMenuItems = useBulkDeleteMenuItems();
  const bulkDeleteCategories = useBulkDeleteCategories();

  const handleBulkDeleteItems = () => {
    const selectedIds = Object.keys(itemsRowSelection).filter(k => itemsRowSelection[k]).map(Number);
    
    if (selectedIds.length === 0) return;
    
    bulkDeleteMenuItems.mutate({ ids: selectedIds }, {
      onSuccess: () => {
        toast.success(`Successfully deleted ${selectedIds.length} items`);
        setItemsRowSelection({});
        setShowBulkDeleteItems(false);
      },
      onError: () => toast.error("Failed to delete items")
    });
  };

  const handleBulkDeleteCategories = () => {
    const selectedIds = Object.keys(categoriesRowSelection).filter(k => categoriesRowSelection[k]).map(Number);
    
    if (selectedIds.length === 0) return;
    
    bulkDeleteCategories.mutate({ ids: selectedIds }, {
      onSuccess: () => {
        toast.success(`Successfully deleted ${selectedIds.length} categories`);
        setCategoriesRowSelection({});
        setShowBulkDeleteCategories(false);
      },
      onError: () => toast.error("Failed to delete categories")
    });
  };

  const bulkReorderMenuItems = useBulkReorderMenuItems();
  const bulkReorderCategories = useBulkReorderCategories();

  const handleReorderItems = (reorderedData: import('@/types/api/menu').MenuItem[]) => {
    const payload = reorderedData.map((item, index) => ({
      id: item.id,
      display_order: index + (itemsPageIndex * itemsPageSize), // maintain absolute order
    }));
    bulkReorderMenuItems.mutate({ items: payload }, {
      onSuccess: () => toast.success("Menu items reordered successfully!"),
      onError: () => toast.error("Failed to reorder menu items."),
    });
  };

  const handleReorderCategories = (reorderedData: import('@/types/api/menu').Category[]) => {
    const payload = reorderedData.map((cat, index) => ({
      id: cat.id,
      display_order: index + (catPageIndex * catPageSize),
    }));
    bulkReorderCategories.mutate({ items: payload }, {
      onSuccess: () => toast.success("Categories reordered successfully!"),
      onError: () => toast.error("Failed to reorder categories."),
    });
  };

  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: catError,
    refetch: refetchCategories,
  } = useCategories({
    page: catPageIndex + 1,
    size: catPageSize,
    search: debouncedCategoriesSearch || undefined,
  });

  const {
    data: allCategoriesResponse,
  } = useCategories({ page: 1, size: 100 }); // Fetch all for dropdown

  const {
    data: itemsResponse,
    isLoading: itemsLoading,
    isError: itemsError,
    error: itmError,
    refetch: refetchItems,
  } = useMenuItems({
    page: itemsPageIndex + 1,
    size: itemsPageSize,
    search: debouncedItemsSearch || undefined,
    category_id: categoryId !== "all" ? Number(categoryId) : undefined,
    is_vegetarian: isVegetarian !== "all" ? isVegetarian === "true" : undefined,
    is_spicy: isSpicy !== "all" ? isSpicy === "true" : undefined,
    is_chef_special: highlightFilter === "chef" ? true : undefined,
    is_signature_dish: highlightFilter === "signature" ? true : undefined,
  });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <CustomTabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Menu Management</h2>
            <p className="text-muted-foreground font-outfit mt-2 text-sm">
              Manage your restaurant&apos;s food offerings and categories.
            </p>
          </div>
          <CustomTabsList className="w-auto border-none">
            <CustomTabsTrigger value="items" className="text-base px-8">
              Menu Items
            </CustomTabsTrigger>
            <CustomTabsTrigger value="categories" className="text-base px-8">
              Categories
            </CustomTabsTrigger>
          </CustomTabsList>
        </div>

        <CustomTabsContent value="items" className="space-y-4 mt-0">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between rounded-xl border bg-card/60 backdrop-blur-sm p-4 overflow-hidden">
            <div className="flex flex-1 flex-wrap items-center gap-3 w-full md:w-auto">
              {Object.keys(itemsRowSelection).length > 0 ? (
                <Button 
                  variant="destructive" 
                  onClick={() => setShowBulkDeleteItems(true)}
                  className="font-outfit"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete ({Object.keys(itemsRowSelection).filter(k => itemsRowSelection[k]).length})
                </Button>
              ) : (
                <>
                  <div className="relative flex-1 min-w-[200px] max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search menu items..."
                      value={itemsSearch}
                      onChange={(e) => setItemsSearch(e.target.value)}
                      className="pl-9 font-outfit text-sm bg-background"
                    />
                  </div>
                  
                  <Select value={categoryId} onValueChange={(val) => val && setCategoryId(val)}>
                    <SelectTrigger className="w-[160px] font-outfit text-sm bg-background">
                      <div className="flex items-center truncate">
                        <Filter className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">
                          {categoryId === "all" ? "All Categories" : allCategoriesResponse?.items?.find((c: import('@/types/api/menu').Category) => c.id.toString() === categoryId)?.name || "Category"}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="font-outfit text-sm">
                      <SelectItem value="all">All Categories</SelectItem>
                      {allCategoriesResponse?.items?.map((cat: import('@/types/api/menu').Category) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={isVegetarian} onValueChange={(val) => val && setIsVegetarian(val)}>
                    <SelectTrigger className="w-[130px] font-outfit text-sm bg-background">
                      <div className="flex items-center truncate">
                        <span className="truncate">
                          {isVegetarian === "all" ? "Any Diet" : isVegetarian === "true" ? "Veg" : "Non-Veg"}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="font-outfit text-sm">
                      <SelectItem value="all">Any Diet</SelectItem>
                      <SelectItem value="true">Veg</SelectItem>
                      <SelectItem value="false">Non-Veg</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={isSpicy} onValueChange={(val) => val && setIsSpicy(val)}>
                    <SelectTrigger className="w-[120px] font-outfit text-sm bg-background">
                      <div className="flex items-center truncate">
                        <span className="truncate">
                          {isSpicy === "all" ? "Any Spice" : isSpicy === "true" ? "Spicy" : "Non-Spicy"}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="font-outfit text-sm">
                      <SelectItem value="all">Any Spice</SelectItem>
                      <SelectItem value="true">Spicy</SelectItem>
                      <SelectItem value="false">Non-Spicy</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={highlightFilter} onValueChange={(val) => val && setHighlightFilter(val)}>
                    <SelectTrigger className="w-[145px] font-outfit text-sm bg-background">
                      <div className="flex items-center truncate">
                        <span className="truncate">
                          {highlightFilter === "all" ? "All Highlights" : highlightFilter === "signature" ? "✨ Signature" : "👨‍🍳 Chef's Pick"}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="font-outfit text-sm">
                      <SelectItem value="all">All Highlights</SelectItem>
                      <SelectItem value="signature">✨ Signature Dish</SelectItem>
                      <SelectItem value="chef">👨‍🍳 Chef&apos;s Special</SelectItem>
                    </SelectContent>
                  </Select>

                  {(itemsSearch !== "" || categoryId !== "all" || isVegetarian !== "all" || isSpicy !== "all" || highlightFilter !== "all") && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setItemsSearch("");
                        setCategoryId("all");
                        setIsVegetarian("all");
                        setIsSpicy("all");
                        setHighlightFilter("all");
                      }}
                      className="text-muted-foreground hover:text-foreground font-outfit text-sm"
                    >
                      Reset Filters
                    </Button>
                  )}
                </>
              )}
            </div>
            
            <Link href="/menu/new" className="w-full md:w-auto">
              <Button className="w-full md:w-auto font-outfit bg-brand text-white hover:bg-brand/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </Link>
          </div>

          {itemsError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-card border border-border/60 rounded-xl">
              <div className="rounded-full bg-destructive/10 p-3 mb-4 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">Failed to Load Menu Items</h3>
              <p className="font-outfit text-sm text-muted-foreground max-w-sm mb-6">
                {(itmError as Error)?.message || "We encountered an issue fetching the menu items. Please try again."}
              </p>
              <Button onClick={() => refetchItems()} className="font-outfit bg-brand text-white hover:bg-brand/90">
                <RotateCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          ) : itemsLoading ? (
            <div className="flex items-center justify-center py-12 bg-card border border-border/60 rounded-xl">
              <Loader2 className="h-6 w-6 animate-spin text-brand" />
              <span className="ml-2 font-outfit text-muted-foreground">Loading menu items...</span>
            </div>
          ) : (
            <DataTable 
              columns={menuColumns} 
              data={itemsResponse?.items || []} 
              emptyMessage="No menu items match your filters."
              manualPagination
              pageCount={itemsResponse?.pages || -1}
              pagination={{ pageIndex: itemsPageIndex, pageSize: itemsPageSize }}
              onPaginationChange={setItemsPagination}
              rowSelection={itemsRowSelection}
              onRowSelectionChange={setItemsRowSelection}
              onReorder={handleReorderItems}
            />
          )}
        </CustomTabsContent>

        <CustomTabsContent value="categories" className="space-y-4 mt-0">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between rounded-xl border bg-card/60 backdrop-blur-sm p-4 overflow-hidden">
            <div className="flex items-center gap-2 w-full md:max-w-md">
              {Object.keys(categoriesRowSelection).length > 0 ? (
                <Button 
                  variant="destructive" 
                  onClick={() => setShowBulkDeleteCategories(true)}
                  className="font-outfit"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete ({Object.keys(categoriesRowSelection).filter(k => categoriesRowSelection[k]).length})
                </Button>
              ) : (
                <>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search categories..."
                      value={categoriesSearch}
                      onChange={(e) => setCategoriesSearch(e.target.value)}
                      className="pl-9 font-outfit text-sm bg-background"
                    />
                  </div>
                  {categoriesSearch !== "" && (
                    <Button
                      variant="ghost"
                      onClick={() => setCategoriesSearch("")}
                      className="text-muted-foreground hover:text-foreground font-outfit text-sm ml-2"
                    >
                      Reset
                    </Button>
                  )}
                </>
              )}
            </div>
            <Link href="/categories/new" className="w-full md:w-auto">
              <Button className="w-full md:w-auto font-outfit bg-brand text-white hover:bg-brand/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </Link>
          </div>

          {categoriesError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-card border border-border/60 rounded-xl">
              <div className="rounded-full bg-destructive/10 p-3 mb-4 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">Failed to Load Categories</h3>
              <p className="font-outfit text-sm text-muted-foreground max-w-sm mb-6">
                {(catError as Error)?.message || "We encountered an issue fetching the categories. Please try again."}
              </p>
              <Button onClick={() => refetchCategories()} className="font-outfit bg-brand text-white hover:bg-brand/90">
                <RotateCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          ) : categoriesLoading ? (
            <div className="flex items-center justify-center py-12 bg-card border border-border/60 rounded-xl">
              <Loader2 className="h-6 w-6 animate-spin text-brand" />
              <span className="ml-2 font-outfit text-muted-foreground">Loading categories...</span>
            </div>
          ) : (
            <DataTable 
              columns={categoryColumns} 
              data={categoriesResponse?.items || []} 
              emptyMessage="No categories match your filters."
              manualPagination
              pageCount={categoriesResponse?.pages || -1}
              pagination={{ pageIndex: catPageIndex, pageSize: catPageSize }}
              onPaginationChange={setCatPagination}
              rowSelection={categoriesRowSelection}
              onRowSelectionChange={setCategoriesRowSelection}
              renderSubComponent={({ row }) => <CategorySubItems categoryId={row.original.id} />}
              onReorder={handleReorderCategories}
            />
          )}
        </CustomTabsContent>
      </CustomTabs>

      <ConfirmDeleteDialog
        open={showBulkDeleteItems}
        onOpenChange={setShowBulkDeleteItems}
        onConfirm={handleBulkDeleteItems}
        title="Bulk Delete Items"
        description={`Are you sure you want to delete ${Object.keys(itemsRowSelection).filter(k => itemsRowSelection[k]).length} items? This action cannot be undone.`}
        isDeleting={bulkDeleteMenuItems.isPending}
      />
      
      <ConfirmDeleteDialog
        open={showBulkDeleteCategories}
        onOpenChange={setShowBulkDeleteCategories}
        onConfirm={handleBulkDeleteCategories}
        title="Bulk Delete Categories"
        description={`Are you sure you want to delete ${Object.keys(categoriesRowSelection).filter(k => categoriesRowSelection[k]).length} categories? This action cannot be undone.`}
        isDeleting={bulkDeleteCategories.isPending}
      />
    </div>
  );
}

export default function MenuManagementPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <MenuManagementContent />
      </Suspense>
    </DashboardLayout>
  );
}
