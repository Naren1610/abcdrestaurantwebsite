import * as z from "zod";

export const menuItemSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().min(0.01, "Price must be greater than 0."),
  categoryId: z.string().min(1, "Please select a category."),
  tags: z.string().optional(), // We'll parse this into an array
  image: z.string().optional(),
  isSpicy: z.boolean().default(false),
  isVeg: z.boolean().default(false),
  isNonVeg: z.boolean().default(false),
  isChefSpecial: z.boolean().default(false),
    isSignatureDish: z.boolean().default(false),
}).refine((data) => data.isVeg || data.isNonVeg, {
  message: "Please select either Veg or Non-Veg.",
  path: ["isVeg"],
});

export type MenuItemFormOutput = z.output<typeof menuItemSchema>;
export type MenuItemFormInput = z.input<typeof menuItemSchema>;
export type MenuItemFormValues = MenuItemFormOutput;

export const categorySchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  subtitle: z.string().optional(),
  letter_group: z.enum(["A", "B", "C", "D"]).nullable().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export const homeContentSchema = z.object({
  heroHeadline: z.string().min(2, "Headline must be at least 2 characters."),
  heroSubheadline: z.string().optional(),
  heroImage: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  featuredItems: z.array(z.string()).optional(),
});

export type HomeContentFormValues = z.infer<typeof homeContentSchema>;

export const teamMemberItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  description: z.string().optional().default(""),
  image: z.string().optional().default(""),
});

export const ourStorySchema = z.object({
  storyHeadline: z.string().optional(),
  storyContent: z.string().optional(),
  storyImage: z.string().optional(),
  teamMembers: z.array(teamMemberItemSchema).default([]),
});

export type OurStoryFormValues = z.infer<typeof ourStorySchema>;

export const settingsSchema = z.object({
  email: z.string().email("Invalid email address."),
  phone: z.string().min(5, "Phone is required."),
  address: z.string().min(5, "Address is required."),
  mapUrl: z.string().optional(),
  isOnlineOrderingEnabled: z.boolean(),
  isTableReservationEnabled: z.boolean(),
  socialLinks: z.array(z.object({
    platform: z.string().min(1, "Platform name is required"),
    url: z.string().url("Must be a valid URL"),
  })).optional(),
  operatingHours: z.array(z.object({
    day: z.string().min(1, "Day(s) required"),
    hours: z.string().min(1, "Hours required"),
  })).optional(),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;


