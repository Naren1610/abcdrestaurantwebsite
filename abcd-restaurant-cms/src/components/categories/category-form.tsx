"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategoryFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CategoryFormProps {
  isLoading?: boolean;
  initialData?: CategoryFormValues | null;
  onSubmit: (data: CategoryFormValues) => void;
  onCancel?: () => void;
}

export function CategoryForm({ initialData, onSubmit, onCancel, isLoading }: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      subtitle: "",
    },
  });

  const handleSubmit = (data: CategoryFormValues) => {
    try {
      onSubmit(data);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
                        control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-outfit font-semibold">Category Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="e.g. THE IMPERIAL TANDOOR" className="font-outfit" {...field} />
                </FormControl>
                <FormDescription className="font-outfit text-xs">
                  The primary heading for this menu section.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
                        control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-outfit font-semibold">Subtitle / Tagline</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Flame-charred legacies" className="font-outfit" {...field} />
                </FormControl>
                <FormDescription className="font-outfit text-xs">
                  A catchy tagline that appears below the category name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-border/50 w-full">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="font-outfit"
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading} className="font-outfit bg-brand text-white hover:bg-brand/90">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}            {initialData ? "Save" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}





