"use client";

import { useState, useEffect } from "react";
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from "@/components/ui/custom-tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Edit2, Image as ImageIcon, GripVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";
import { toast } from "sonner";
import {
  useGalleryCategories,
  useGalleryImages,
  useCreateGalleryCategory,
  useUpdateGalleryCategory,
  useDeleteGalleryCategory,
  useDeleteGalleryImage,
  useReorderGalleryCategories
} from "@/hooks/use-gallery";

// dnd-kit imports
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

// Sortable Row Component
function SortableCategoryRow({ 
  category, 
  onEdit, 
  onDelete, 
  onToggle 
}: { 
  category: any, 
  onEdit: (cat: any) => void, 
  onDelete: (cat: any) => void,
  onToggle: (id: number, currentStatus: boolean) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as 'relative',
  };

  return (
    <TableRow ref={setNodeRef} style={style} className={`hover:bg-muted/40 transition-colors group ${isDragging ? 'bg-muted/30 shadow-md' : ''}`}>
      <TableCell className="w-[50px] text-center cursor-grab active:cursor-grabbing text-muted-foreground/50 group-hover:text-muted-foreground" {...attributes} {...listeners}>
        <GripVertical className="h-5 w-5 mx-auto outline-none" />
      </TableCell>
      <TableCell className="font-semibold text-brand">
        <div className="w-8 h-8 rounded-md bg-muted/30 flex items-center justify-center border border-border/50 text-xs">
          {category.display_order}
        </div>
      </TableCell>
      <TableCell className="font-medium font-outfit text-foreground">{category.name}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Switch checked={category.is_active} onCheckedChange={() => onToggle(category.id, category.is_active)} />
          <span className="text-xs font-outfit text-muted-foreground w-12">{category.is_active ? 'Active' : 'Hidden'}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(category)} className="text-brand hover:text-brand hover:bg-brand/10 h-8 w-8">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(category)} className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function GalleryManager() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  
  const [activeTab, setActiveTab] = useState(tabParam === "categories" ? "categories" : "images");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;
  const [imagePageIndex, setImagePageIndex] = useState(0);
  const imagePageSize = 12;

  // React Query Hooks
  const { 
    data: categoriesData, 
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    refetch: refetchCategories
  } = useGalleryCategories(pageIndex + 1, pageSize);
  
  const categories = categoriesData?.items || [];
  const pageCount = categoriesData?.pages || 0;
  const totalCategories = categoriesData?.total || 0;
  
  const { 
    data: topPicksData, 
  } = useGalleryImages(undefined, 1, 100, true);
  
  const topPicks = topPicksData?.items || [];
  
  const { 
    data: imagesData, 
    isLoading: isLoadingImages,
    isError: isErrorImages,
    refetch: refetchImages
  } = useGalleryImages(selectedCategory !== "all" ? Number(selectedCategory) : undefined, imagePageIndex + 1, imagePageSize);
  
  const images = imagesData?.items || [];
  const imagePageCount = imagesData?.pages || 0;
  const totalImages = imagesData?.total || 0;

  const createCategory = useCreateGalleryCategory();
  const updateCategory = useUpdateGalleryCategory();
  const deleteCategory = useDeleteGalleryCategory();
  const reorderCategories = useReorderGalleryCategories();
  const deleteImage = useDeleteGalleryImage();
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Form State
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryOrder, setNewCategoryOrder] = useState(0);
  
  const [editingCategory, setEditingCategory] = useState<any>(null);
  
  // Delete Modals
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [imageToDelete, setImageToDelete] = useState<any>(null);
  // Note: Pagination slicing removed because it's now handled by the backend

  useEffect(() => {
    if (tabParam && (tabParam === "categories" || tabParam === "images" || tabParam === "top-picks")) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  
  useEffect(() => {
    if (isAddModalOpen) {
      setNewCategoryName("");
      setNewCategoryOrder(categories.length + 1);
    }
  }, [isAddModalOpen, categories.length]);

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    router.replace(`/gallery?tab=${val}`, { scroll: false });
  };

  // DnD configuration
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((item) => item.id === active.id);
      const newIndex = categories.findIndex((item) => item.id === over.id);
      const newArray = arrayMove(categories, oldIndex, newIndex);
      
      const updatePayload = newArray.map((item, index) => ({
        id: item.id,
        display_order: index + 1
      }));
      
      try {
        await reorderCategories.mutateAsync(updatePayload);
        toast.success("Order updated successfully!");
      } catch (error) {
        toast.error("Failed to reorder categories");
      }
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory.mutateAsync({
        name: newCategoryName,
        display_order: newCategoryOrder,
        is_active: true
      });
      toast.success("Category created successfully!");
      setIsAddModalOpen(false);
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    try {
      await updateCategory.mutateAsync({
        id: editingCategory.id,
        data: {
          name: editingCategory.name,
          display_order: editingCategory.display_order
        }
      });
      toast.success("Category updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  const confirmDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory.mutateAsync(categoryToDelete.id);
        toast.success("Category deleted successfully!");
        setCategoryToDelete(null);
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  const confirmDeleteImage = async () => {
    if (imageToDelete) {
      try {
        await deleteImage.mutateAsync(imageToDelete.id);
        toast.success("Image deleted successfully!");
        setImageToDelete(null);
      } catch (error) {
        toast.error("Failed to delete image");
      }
    }
  };

  const toggleCategoryStatus = async (id: number, currentStatus: boolean) => {
    try {
      await updateCategory.mutateAsync({
        id,
        data: { is_active: !currentStatus }
      });
      toast.success(`Category ${!currentStatus ? 'activated' : 'hidden'}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <CustomTabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Gallery Management</h2>
            <p className="text-muted-foreground font-outfit mt-2 text-sm">
              Manage your gallery images and control what appears on the storefront.
            </p>
          </div>
          <CustomTabsList className="w-auto border-none">
            <CustomTabsTrigger value="images" className="text-base px-8">
              Manage Images
            </CustomTabsTrigger>
            <CustomTabsTrigger value="categories" className="text-base px-8">
              Manage Categories
            </CustomTabsTrigger>
            <CustomTabsTrigger value="top-picks" className="text-base px-8">
              Top Picks
            </CustomTabsTrigger>
          </CustomTabsList>
        </div>

        <CustomTabsContent value="images" className="space-y-8 mt-0">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <h3 className="text-xl font-playfair font-semibold text-brand">Gallery Images</h3>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-outfit font-medium text-muted-foreground whitespace-nowrap">Filter:</span>
                  <Select value={selectedCategory} onValueChange={(val) => {
                    setSelectedCategory(val || "all");
                    setImagePageIndex(0);
                  }}>
                    <SelectTrigger className="w-[180px] font-outfit">
                      <span className="truncate">
                        {isLoadingCategories ? "Loading..." : selectedCategory === "all" 
                          ? "All Categories" 
                          : categories.find(c => c.id.toString() === selectedCategory)?.name || "Unknown"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="font-outfit">All Categories</SelectItem>
                      {categories.map(c => (
                        <SelectItem key={c.id} value={c.id.toString()} className="font-outfit">{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Link href="/gallery/upload">
                  <Button className="font-outfit bg-brand text-white hover:bg-brand/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </Link>
              </div>
            </div>

            {isErrorImages ? (
              <div className="text-center py-20 border border-destructive/20 bg-destructive/5 rounded-xl mt-4">
                <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
                <p className="font-outfit text-sm text-destructive font-medium mb-4">Failed to load images.</p>
                <Button variant="outline" onClick={() => refetchImages()} className="font-outfit">Try Again</Button>
              </div>
            ) : isLoadingImages ? (
              <div className="flex justify-center items-center py-20 border border-dashed border-border/50 rounded-xl mt-4">
                <Loader2 className="w-8 h-8 text-brand animate-spin" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {images.map((img) => {
                    const category = categories.find(c => c.id === img.category_id);
                    return (
                      <div key={img.id} className="group flex flex-col bg-muted/5 rounded-xl border border-border/50 overflow-hidden">
                        <div className="aspect-[4/3] relative bg-muted/20">
                          <Image 
                            src={img.image_url} 
                            alt={img.title || "Gallery image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/gallery/${img.id}/edit`}>
                              <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white text-brand">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button 
                              size="icon" 
                              className="h-8 w-8 bg-red-600 hover:bg-red-700 text-white shadow-md border-0"
                              onClick={() => setImageToDelete(img)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4 border-t border-border/50 flex-1 flex flex-col justify-center">
                          <h3 className="font-playfair font-semibold text-brand line-clamp-1">{img.title || "Untitled"}</h3>
                          <p className="font-outfit text-xs text-muted-foreground mt-1">Category: {category?.name || "Unknown"}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Image Pagination UI */}
                {totalImages > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/5 rounded-xl mt-6">
                    <div className="flex-1 text-sm text-muted-foreground font-outfit">
                      Showing{" "}
                      <span className="font-medium text-foreground">
                        {totalImages === 0 ? 0 : imagePageIndex * imagePageSize + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium text-foreground">
                        {Math.min((imagePageIndex + 1) * imagePageSize, totalImages)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-foreground">
                        {totalImages}
                      </span>{" "}
                      images
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => setImagePageIndex(0)}
                        disabled={imagePageIndex === 0}
                      >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setImagePageIndex(imagePageIndex - 1)}
                        disabled={imagePageIndex === 0}
                      >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex w-[100px] items-center justify-center text-sm font-medium font-outfit">
                        Page {imagePageCount === 0 ? 0 : imagePageIndex + 1} of {imagePageCount}
                      </div>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setImagePageIndex(imagePageIndex + 1)}
                        disabled={imagePageIndex >= imagePageCount - 1}
                      >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => setImagePageIndex(imagePageCount - 1)}
                        disabled={imagePageIndex >= imagePageCount - 1}
                      >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {images.length === 0 && (
                  <div className="text-center py-20 border border-dashed border-border/50 rounded-xl mt-4">
                    <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="font-outfit text-sm text-muted-foreground">No images found in this category.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </CustomTabsContent>

        <CustomTabsContent value="categories" className="space-y-8 mt-0">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <h3 className="text-xl font-playfair font-semibold text-brand">Category Configuration</h3>
              
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger className="inline-flex items-center justify-center rounded-md font-outfit bg-brand text-white hover:bg-brand/90 px-4 py-2 text-sm font-medium h-10">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="font-playfair font-bold text-xl text-brand">Add New Category</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddSubmit} className="space-y-4 pt-4">
                    <div className="flex gap-4">
                      <div className="space-y-2 flex-1">
                        <label className="block text-sm font-outfit font-medium text-brand mb-1">Category Name</label>
                        <Input 
                          placeholder="e.g. VIP Lounge" 
                          className="font-outfit" 
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={createCategory.isPending} className="w-full font-outfit bg-brand text-white hover:bg-brand/90 mt-4">
                      {createCategory.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : "Create Category"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {isErrorCategories ? (
              <div className="text-center py-20 border border-destructive/20 bg-destructive/5 rounded-xl mt-4">
                <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
                <p className="font-outfit text-sm text-destructive font-medium mb-4">Failed to load categories.</p>
                <Button variant="outline" onClick={() => refetchCategories()} className="font-outfit">Try Again</Button>
              </div>
            ) : isLoadingCategories ? (
              <div className="flex justify-center items-center py-20 border border-dashed border-border/50 rounded-xl mt-4">
                <Loader2 className="w-8 h-8 text-brand animate-spin" />
              </div>
            ) : (
              <div className="rounded-xl border bg-card/60 backdrop-blur-sm overflow-hidden mt-6">
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={categories.map(c => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="w-[50px]"></TableHead>
                          <TableHead className="font-outfit text-muted-foreground uppercase text-xs font-semibold tracking-wider h-11">Order</TableHead>
                          <TableHead className="font-outfit text-muted-foreground uppercase text-xs font-semibold tracking-wider h-11">Category Name</TableHead>
                          <TableHead className="font-outfit text-muted-foreground uppercase text-xs font-semibold tracking-wider h-11">Status</TableHead>
                          <TableHead className="text-right font-outfit text-muted-foreground uppercase text-xs font-semibold tracking-wider h-11">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categories.map((category) => (
                          <SortableCategoryRow 
                            key={category.id} 
                            category={category} 
                            onEdit={(cat) => {
                              setEditingCategory(cat);
                              setIsEditModalOpen(true);
                            }}
                            onDelete={(cat) => setCategoryToDelete(cat)}
                            onToggle={toggleCategoryStatus}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </SortableContext>
                </DndContext>

                {/* Pagination UI */}
                {totalCategories > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/5">
                    <div className="flex-1 text-sm text-muted-foreground font-outfit">
                      Showing{" "}
                      <span className="font-medium text-foreground">
                        {totalCategories === 0 ? 0 : pageIndex * pageSize + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium text-foreground">
                        {Math.min((pageIndex + 1) * pageSize, totalCategories)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-foreground">
                        {totalCategories}
                      </span>{" "}
                      entries
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => setPageIndex(0)}
                        disabled={pageIndex === 0}
                      >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setPageIndex(pageIndex - 1)}
                        disabled={pageIndex === 0}
                      >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex w-[100px] items-center justify-center text-sm font-medium font-outfit">
                        Page {pageCount === 0 ? 0 : pageIndex + 1} of {pageCount}
                      </div>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setPageIndex(pageIndex + 1)}
                        disabled={pageIndex >= pageCount - 1}
                      >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => setPageIndex(pageCount - 1)}
                        disabled={pageIndex >= pageCount - 1}
                      >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {categories.length === 0 && (
                  <div className="text-center py-10 font-outfit text-sm text-muted-foreground">
                    No categories found. Create one to get started.
                  </div>
                )}
              </div>
            )}
          </div>
        </CustomTabsContent>
        
        <CustomTabsContent value="top-picks" className="space-y-6 mt-0">
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-playfair font-semibold text-brand mb-2">Storefront Top Picks</h3>
              <p className="text-muted-foreground font-outfit text-sm">
                Images marked as Top Picks will be displayed directly on the restaurant's home screen.
              </p>
            </div>
            
            <div className={`flex items-center gap-2 mb-6 text-sm font-outfit font-medium ${topPicks.length === 4 ? 'text-emerald-600' : 'text-amber-600'}`}>
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>
                {topPicks.length === 4 
                  ? "Perfect! You have exactly 4 Top Picks configured for the home screen." 
                  : `You currently have ${topPicks.length} Top Pick${topPicks.length === 1 ? '' : 's'}. The home screen requires exactly 4.`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {topPicks.map((img) => {
                const category = categories.find(c => c.id === img.category_id);
                return (
                  <div key={img.id} className="group flex flex-col bg-white p-3 rounded-none shadow-sm border border-border/20 overflow-hidden transition-all hover:shadow mx-auto w-full max-w-[280px]">
                    <div className="aspect-square relative bg-muted/20 w-full">
                      <Image 
                        src={img.image_url} 
                        alt={img.title || "Gallery image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/gallery/${img.id}/edit`}>
                          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white text-brand shadow-sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="pt-6 pb-4 flex-1 flex flex-col justify-center items-center text-center">
                      <p className="font-playfair italic font-bold text-lg text-brand/90">{img.caption || "No caption provided"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {topPicks.length === 0 && (
              <div className="text-center py-20 border border-dashed border-border/50 rounded-xl mt-4">
                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="font-outfit text-sm text-muted-foreground">No Top Picks configured yet.</p>
              </div>
            )}
          </div>
        </CustomTabsContent>
      </CustomTabs>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-playfair font-bold text-xl text-brand">Edit Category</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <label className="block text-sm font-outfit font-medium text-brand mb-1">Category Name</label>
                  <Input 
                    placeholder="e.g. VIP Lounge" 
                    className="font-outfit" 
                    value={editingCategory.name}
                    onChange={e => setEditingCategory({...editingCategory, name: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <Button type="submit" disabled={updateCategory.isPending} className="w-full font-outfit bg-brand text-white hover:bg-brand/90 mt-4">
                {updateCategory.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog for Category */}
      <ConfirmDeleteDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        onConfirm={confirmDeleteCategory}
        title={`Delete "${categoryToDelete?.name}"?`}
        description="Are you sure you want to delete this category? Any associated images will be permanently deleted."
      />

      {/* Delete Confirmation Dialog for Image */}
      <ConfirmDeleteDialog
        open={!!imageToDelete}
        onOpenChange={(open) => !open && setImageToDelete(null)}
        onConfirm={confirmDeleteImage}
        title={`Delete Image?`}
        description={`Are you sure you want to delete "${imageToDelete?.title || "this image"}"? This action cannot be undone.`}
      />
    </div>
  );
}
