"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ourStorySchema, OurStoryFormValues } from "@/lib/schemas";
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
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/menu/image-upload";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface OurStoryFormProps {
  initialData?: OurStoryFormValues | null;
  onSubmit: (data: OurStoryFormValues) => void;
}

export function OurStoryForm({ initialData, onSubmit }: OurStoryFormProps) {
  const form = useForm<OurStoryFormValues>({
        resolver: zodResolver(ourStorySchema),
    defaultValues: initialData || {
      storyHeadline: "",
      storyContent: "",
      storyImage: "",
      teamMembers: [
        { name: "", role: "", description: "", image: "", facebookUrl: "", instagramUrl: "" }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "teamMembers",
    control: form.control,
  });

  const handleSubmit = (data: OurStoryFormValues) => {
    try {
      onSubmit(data);
      toast.success("Our Story updated successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10">
        
        {/* Main Story Content Section */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-muted/10 p-6 rounded-xl border border-border/50">
            <div className="space-y-6">
              <FormField
                                control={form.control}
                name="storyHeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Story Headline</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. A Legacy of Flavor" {...field} />
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
                        className="resize-none h-48"
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
                      <ImageUpload value={field.value} onChange={field.onChange} aspectRatio="video" />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-playfair font-semibold text-brand">Team & Chefs</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "", role: "", description: "", image: "", facebookUrl: "", instagramUrl: "" })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
          
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 bg-muted/10 p-6 rounded-xl border border-border/50">
                
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                                            control={form.control}
                      name={`teamMembers.${index}.name` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-outfit font-semibold">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Rahul Sharma" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                                            control={form.control}
                      name={`teamMembers.${index}.role` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-outfit font-semibold">Role</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Head Chef" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                                        control={form.control}
                    name={`teamMembers.${index}.description` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-outfit font-semibold">Biography</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A short biography..."
                            className="resize-none h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                                            control={form.control}
                      name={`teamMembers.${index}.facebookUrl` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-outfit font-semibold text-xs text-muted-foreground">Facebook URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                                            control={form.control}
                      name={`teamMembers.${index}.instagramUrl` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-outfit font-semibold text-xs text-muted-foreground">Instagram URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-6 pt-2">
                  <FormField
                                        control={form.control}
                    name={`teamMembers.${index}.image` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-outfit font-semibold">Portrait Image</FormLabel>
                        <FormControl>
                          <ImageUpload value={field.value} onChange={field.onChange} aspectRatio="square" className="w-64 max-w-full" />
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

        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" className="font-outfit bg-brand text-white hover:bg-brand/90 px-8">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}





