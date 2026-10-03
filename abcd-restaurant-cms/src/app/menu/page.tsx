"use client";

import { Suspense, useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { columns as menuColumns } from "@/components/menu/columns";
import { columns as categoryColumns } from "@/components/categories/columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2, AlertCircle, RotateCw, Search, Filter, Trash2 } from "lucide-react";
import Link from "next/link";
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from "@/components/ui/custom-tabs";
import { useSearchParams, useRouter } from "next/navigation";
import { useCategories, useMenuItems, useBulkDeleteMenuItems, useBulkDeleteCategories, useBulkReorderMenuItems, useBulkReorderCategories } from "@/hooks/use-menu";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

const CategorySubItems = ({ categoryId }: { categoryId: number }) => {
  const { data, isLoading, isError } = useMenuItems({ page: 1, size: 50, category_id: categoryId });
  if (isLoading) return <div className="p-4 text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Loading items...</div>;
  if (isError) return <div className="p-4 text-sm text-destructive">Failed to load items.</div>;
  if (!data?.items?.length) return <div className="p-8 text-center text-sm font-outfit text-muted-foreground">No items in this category.</div>;

  return (
    <div className="p-4 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.items.map((item: any) => (
          <div key={item.id} className="flex items-center gap-3 bg-background p-3 rounded-lg border border-border/60 shadow-sm">
            {item.image_url ? (
              <img src={item.image_url} alt={item.name} className="h-12 w-12 object-cover rounded-md" />
            ) : (
              <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">IMG</div>
            )}
            <div className="overflow-hidden">
              <p className="font-outfit text-sm font-medium leading-tight truncate">{item.name}</p>
              <p className="font-outfit text-xs text-brand mt-1">${Number(item.price).toFixed(2)}</p>
            </div>
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

  const [{ pageIndex: itemsPageIndex, pageSize: itemsPageSize }, setItemsPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [categoriesSearch, setCategoriesSearch] = useState("");
  const debouncedCategoriesSearch = useDebounce(categoriesSearch, 500);
  const [{ pageIndex: catPageIndex, pageSize: catPageSize }, setCatPagination] = useState({ pageIndex: 0, pageSize: 10 });

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

  const handleReorderItems = (reorderedData: any[]) => {
    const payload = reorderedData.map((item, index) => ({
      id: item.id,
      display_order: index + (itemsPageIndex * itemsPageSize), // maintain absolute order
    }));
    bulkReorderMenuItems.mutate({ items: payload }, {
      onSuccess: () => toast.success("Menu items reordered successfully!"),
      onError: () => toast.error("Failed to reorder menu items."),
    });
  };

  const handleReorderCategories = (reorderedData: any[]) => {
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
  });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <CustomTabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Menu Management</h2>
            <p className="text-muted-foreground font-outfit mt-2 text-sm">
              Manage your restaurant's food offerings and categories.
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
                  
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger className="w-[160px] font-outfit text-sm bg-background">
                      <div className="flex items-center truncate">
                        <Filter className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">
                          {categoryId === "all" ? "All Categories" : allCategoriesResponse?.items?.find((c: any) => c.id.toString() === categoryId)?.name || "Category"}
                        </span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="font-outfit text-sm">
                      <SelectItem value="all">All Categories</SelectItem>
                      {allCategoriesResponse?.items?.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={isVegetarian} onValueChange={setIsVegetarian}>
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

                  <Select value={isSpicy} onValueChange={setIsSpicy}>
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

                  {(itemsSearch !== "" || categoryId !== "all" || isVegetarian !== "all" || isSpicy !== "all") && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setItemsSearch("");
                        setCategoryId("all");
                        setIsVegetarian("all");
                        setIsSpicy("all");
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
                {(itmError as any)?.message || "We encountered an issue fetching the menu items. Please try again."}
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
                {(catError as any)?.message || "We encountered an issue fetching the categories. Please try again."}
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
