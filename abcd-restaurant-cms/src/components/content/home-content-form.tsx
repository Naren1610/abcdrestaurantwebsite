"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { homeContentSchema, HomeContentFormValues } from "@/lib/schemas";
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
import { Checkbox } from "@/components/ui/checkbox";

interface HomeContentFormProps {
  initialData?: HomeContentFormValues | null;
  onSubmit: (data: HomeContentFormValues) => void;
}

const mockMenuItems = [
  { id: "murgh-malai-tikka", label: "Murgh Malai Tikka" },
  { id: "paneer-achari-tikka", label: "Paneer Achari Tikka" },
  { id: "seekh-kebab", label: "Seekh Kebab" },
  { id: "butter-chicken", label: "Butter Chicken" },
];

export function HomeContentForm({ initialData, onSubmit }: HomeContentFormProps) {
  const form = useForm<HomeContentFormValues>({
        resolver: zodResolver(homeContentSchema),
    defaultValues: initialData || {
      heroHeadline: "",
      heroSubheadline: "",
      heroImage: "",
      ctaText: "",
      ctaLink: "",
      featuredItems: [],
    },
  });

  const handleSubmit = (data: HomeContentFormValues) => {
    try {
      onSubmit(data);
      toast.success("Home content updated successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-12">
        
        {/* Hero Section */}
        <div>
          <h3 className="text-xl font-playfair font-semibold mb-4 text-brand">Hero Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/20 p-6 rounded-xl border border-border/50">
            <div className="space-y-6">
              <FormField
                                control={form.control}
                name="heroHeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Headline</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Experience Authentic Indian Cuisine" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                                control={form.control}
                name="heroSubheadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Subheadline</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. A taste of the imperial tandoor right in your city."
                        className="resize-none h-24"
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
                name="heroImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Hero Background Image</FormLabel>
                    <FormControl>
                      <ImageUpload value={field.value} onChange={field.onChange} aspectRatio="video" />
                    </FormControl>
                    <FormDescription className="font-outfit text-xs">Recommended size: 1920x1080.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div>
          <h3 className="text-xl font-playfair font-semibold mb-4 text-brand">Call to Action (CTA)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/20 p-6 rounded-xl border border-border/50">
            <FormField
                            control={form.control}
              name="ctaText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-outfit font-semibold">Button Text</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Book a Table" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                            control={form.control}
              name="ctaLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-outfit font-semibold">Button Link</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. /reservations" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Featured Items Section */}
        <div>
          <h3 className="text-xl font-playfair font-semibold mb-4 text-brand">Featured Menu Items</h3>
          <div className="bg-muted/20 p-6 rounded-xl border border-border/50">
            <FormField
                            control={form.control}
              name="featuredItems"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="font-outfit font-semibold">Select Featured Items</FormLabel>
                    <FormDescription className="font-outfit text-xs">
                      These items will be displayed prominently on the homepage.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockMenuItems.map((item) => (
                      <FormField
                        key={item.id}
                                                control={form.control}
                        name="featuredItems"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value: string) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-outfit text-sm font-medium cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
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
