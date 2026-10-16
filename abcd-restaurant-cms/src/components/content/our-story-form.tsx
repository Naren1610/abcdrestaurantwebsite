"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/menu/image-upload";
import { ourStorySchema, OurStoryFormValues } from "@/lib/schemas";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useEffect } from "react";

interface OurStoryFormProps {
  initialData?: OurStoryFormValues;
  onSubmit: (values: OurStoryFormValues) => void;
  isLoading?: boolean;
}

export function OurStoryForm({ initialData, onSubmit, isLoading = false }: OurStoryFormProps) {
  const form = useForm<OurStoryFormValues>({
    resolver: zodResolver(ourStorySchema) as any,
    values: initialData,
    resetOptions: {
      keepDirtyValues: true,
    },
    defaultValues: {
      storyHeadline: "Our Story",
      storyContent: "",
      storyImage: "/images/about/abcd-restaurant.png",
      teamMembers: [{ name: "", role: "", description: "", image: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teamMembers",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* Story Information Section (Static Context Preserved) */}
        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-border/40 pb-5">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-brand">
              Story Information
            </h3>
            <p className="text-sm font-outfit text-muted-foreground mt-1">
              General restaurant story headline, narrative content, and featured showcase image.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="storyHeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Story Headline</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Our Story" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storyContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Story Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share the history and passion behind your restaurant..."
                        className="resize-none h-44"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="storyImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Story Image</FormLabel>
                    <FormControl>
                      <ImageUpload value={field.value} onChange={field.onChange} aspectRatio="video" entityType="content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Team Members / Chefs Section */}
        <div className="bg-card border border-border/60 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-brand">
                Meet the People & Chefs
              </h3>
              <p className="text-sm font-outfit text-muted-foreground mt-1">
                Manage the chefs and team members displayed in the &quot;Meet the people behind ABCD&quot; section.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "", role: "", description: "", image: "" })}
              className="shrink-0 font-outfit"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Chef / Member
            </Button>
          </div>
          
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 bg-muted/15 p-6 rounded-xl border border-border/60 transition-colors"
              >
                {/* Delete button (only disabled if only 1 card left) */}
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    title="Remove member"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Left 2 Columns: Name, Role, Biography */}
                <div className="lg:col-span-2 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`teamMembers.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-outfit font-semibold">
                            Full Name <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Mr. Jena" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`teamMembers.${index}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-outfit font-semibold">
                            Role / Designation <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. FOUNDER & CHEF" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`teamMembers.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-outfit font-semibold">Biography</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A storyteller at heart and a chef by passion, Arjun brings memories, spices, and creativity to every plate..."
                            className="resize-none h-[110px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column: Portrait Photo */}
                <div className="lg:col-span-1 space-y-2">
                  <FormField
                    control={form.control}
                    name={`teamMembers.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-outfit font-semibold">Portrait Photo</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            aspectRatio="square"
                            entityType="team"
                            className="w-full max-w-[220px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            size="lg"
            disabled={isLoading || form.formState.isSubmitting}
            className="font-outfit bg-brand text-white hover:bg-brand/90 px-8"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
