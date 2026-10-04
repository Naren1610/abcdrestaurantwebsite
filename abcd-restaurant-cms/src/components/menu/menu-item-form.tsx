"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuItemSchema, MenuItemFormValues, MenuItemFormInput, MenuItemFormOutput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./image-upload";
import { useCategories } from "@/hooks/use-menu";

interface MenuItemFormProps {
  isLoading?: boolean;
  initialData?: MenuItemFormValues | null;
  onSubmit: (data: MenuItemFormOutput) => void;
  onCancel: () => void;
}

export function MenuItemForm({ initialData, onSubmit, onCancel, isLoading }: MenuItemFormProps) {
  const { data: categoriesResponse } = useCategories({ size: 100 });
  const categories = categoriesResponse?.items || [];

    const form = useForm<MenuItemFormInput, unknown, MenuItemFormOutput>({
        resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      categoryId: initialData?.categoryId || "",
      tags: initialData?.tags || "",
      image: initialData?.image || "",
      isSpicy: initialData?.isSpicy || false,
      isVeg: initialData?.isVeg || false,
      isNonVeg: initialData?.isNonVeg || false,
      isChefSpecial: initialData?.isChefSpecial || false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || 0,
        categoryId: String(initialData.categoryId || ""),
        tags: initialData.tags || "",
        image: initialData.image || "",
        isSpicy: Boolean(initialData.isSpicy),
        isVeg: Boolean(initialData.isVeg),
        isNonVeg: Boolean(initialData.isNonVeg),
        isChefSpecial: Boolean(initialData.isChefSpecial),
      });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <FormField
                            control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-outfit font-semibold">Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Murgh Malai Tikka" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                            control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-outfit font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the dish, its ingredients, and flavor profile..." 
                      className="resize-y min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <FormField
                                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="18.99" {...field} value={field.value as string | number | undefined ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Category</FormLabel>
                    <Select key={categories.length} onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <span className="truncate">
                            {field.value
                              ? categories.find((cat) => String(cat.id) === String(field.value))?.name || field.value
                              : "Select a category"}
                          </span>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
                            control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-outfit font-semibold">Tags (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. spicy, vegan, chef-special" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs font-outfit">
                    Separate tags with commas. (e.g. veg)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <h4 className="font-outfit font-semibold mb-4 text-lg">Dietary & Flavor Options</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                                    control={form.control}
                  name="isVeg"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <div className="space-y-0.5">
                        <FormLabel className="font-outfit font-medium flex items-center gap-2 cursor-pointer">
                          Veg
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (checked) form.setValue("isNonVeg", false);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                                    control={form.control}
                  name="isNonVeg"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <div className="space-y-0.5">
                        <FormLabel className="font-outfit font-medium flex items-center gap-2 cursor-pointer">
                          Non-Veg
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (checked) form.setValue("isVeg", false);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                                    control={form.control}
                  name="isSpicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <div className="space-y-0.5">
                        <FormLabel className="font-outfit font-medium flex items-center gap-2 cursor-pointer">
                          Spicy
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                                    control={form.control}
                  name="isChefSpecial"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3">
                      <div className="space-y-0.5">
                        <FormLabel className="font-outfit font-medium flex items-center gap-2 cursor-pointer">
                          Chef&apos;s Special
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-6 bg-muted/10 p-6 rounded-xl border border-border/50 h-fit">
            <FormField
                            control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-outfit font-semibold mb-2 block">Item Image</FormLabel>
                  <FormControl>
                    <ImageUpload value={field.value} onChange={field.onChange} aspectRatio="square" className="w-full" />
                  </FormControl>
                  <FormDescription className="font-outfit text-xs mt-2">
                    Upload an appetizing photo of the dish.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-border">
          <Button type="button" variant="outline" onClick={onCancel} className="font-outfit">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="font-outfit bg-brand text-white hover:bg-brand/90">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}            {initialData ? "Save" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}


