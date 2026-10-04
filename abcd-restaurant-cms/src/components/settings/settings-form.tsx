"use client";

import * as React from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, SettingsFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from "@/components/ui/custom-tabs";
import { AccountSettingsForm } from "@/components/settings/account-settings-form";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface SettingsFormProps {
  initialData?: SettingsFormValues | null;
  onSubmit: (data: SettingsFormValues) => void;
  isSaving?: boolean;
}

export function SettingsForm({ initialData, onSubmit, isSaving }: SettingsFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get active tab from URL or default to 'account'
  const tabFromUrl = searchParams.get("tab") || "account";
  const [activeTab, setActiveTab] = React.useState(tabFromUrl);

  // Sync state with URL changes (e.g. browser back/forward)
  const [prevTabFromUrl, setPrevTabFromUrl] = React.useState(tabFromUrl);
  if (tabFromUrl !== prevTabFromUrl) {
    setPrevTabFromUrl(tabFromUrl);
    if (tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
    defaultValues: initialData || {
      email: "",
      phone: "",
      address: "",
      mapUrl: "",
      socialLinks: [],
      operatingHours: [],
    },
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const { fields: hourFields, append: appendHours, remove: removeHours } = useFieldArray({
    control: form.control,
    name: "operatingHours",
  });

  const handleSubmit = (data: SettingsFormValues) => {
    try {
      onSubmit(data);
      toast.success("Settings updated successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <CustomTabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <CustomTabsList className="mb-8">
        <CustomTabsTrigger value="account">
          Account
        </CustomTabsTrigger>
        <CustomTabsTrigger value="contact">
          Contact & Social
        </CustomTabsTrigger>
        <CustomTabsTrigger value="hours">
          Operating Hours
        </CustomTabsTrigger>
      </CustomTabsList>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={activeTab === "account" ? "hidden" : "space-y-8"}>

          <CustomTabsContent value="contact" className="space-y-8 mt-0">
            <div>
              <h3 className="text-xl font-playfair font-semibold mb-4 text-brand">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/10 p-6 rounded-xl border border-border/50">
                <FormField
                                    control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-outfit font-semibold">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. hello@restaurant.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                                    control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-outfit font-semibold">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. +1 234 567 8900" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                                    control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-outfit font-semibold">Address</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 123 Spice Avenue..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                                    control={form.control}
                  name="mapUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-outfit font-semibold">Map URL (Google Maps)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://maps.google.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-playfair font-semibold text-brand">Social Media Links</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendSocial({ platform: "", url: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>
              <div className="space-y-4">
                {socialFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-4 bg-muted/5 p-4 rounded-xl border border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <FormField
                                                control={form.control}
                        name={`socialLinks.${index}.platform` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-outfit font-semibold text-xs">Platform (e.g. TikTok)</FormLabel>
                            <FormControl>
                              <Input placeholder="Platform Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                                                control={form.control}
                        name={`socialLinks.${index}.url` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-outfit font-semibold text-xs">Profile URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive mt-6"
                      onClick={() => removeSocial(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {socialFields.length === 0 && (
                  <p className="text-muted-foreground text-sm font-outfit p-4 text-center border border-dashed border-border/50 rounded-xl">
                    No social links added yet. Click &quot;Add Link&quot; to get started.
                  </p>
                )}
              </div>
            </div>
          </CustomTabsContent>

          <CustomTabsContent value="hours" className="space-y-8 mt-0">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-playfair font-semibold text-brand">Operating Hours</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendHours({ day: "", hours: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Schedule
                </Button>
              </div>
              
              <div className="space-y-4">
                {hourFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-4 bg-muted/5 p-4 rounded-xl border border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <FormField
                                                control={form.control}
                        name={`operatingHours.${index}.day` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-outfit font-semibold text-xs">Days (e.g. Mon - Fri)</FormLabel>
                            <FormControl>
                              <Input placeholder="Mon - Fri" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                                                control={form.control}
                        name={`operatingHours.${index}.hours` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-outfit font-semibold text-xs">Hours (e.g. 11:00 AM - 10:00 PM)</FormLabel>
                            <FormControl>
                              <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 font-outfit"
                                placeholder="11:00 AM - 3:00 PM&#10;5:00 PM - 10:00 PM"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive mt-6"
                      onClick={() => removeHours(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {hourFields.length === 0 && (
                  <p className="text-muted-foreground text-sm font-outfit p-4 text-center border border-dashed border-border/50 rounded-xl">
                    No operating hours added yet. Click &quot;Add Schedule&quot; to get started.
                  </p>
                )}
              </div>
            </div>
          </CustomTabsContent>

          <div className="flex justify-end pt-6 border-t border-border/50">
            <Button type="submit" size="lg" disabled={isSaving} className="font-outfit bg-brand text-white hover:bg-brand/90 px-8">
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Settings
            </Button>
          </div>
        </form>
      </Form>

      <CustomTabsContent value="account" className="space-y-8 mt-0">
        <AccountSettingsForm />
      </CustomTabsContent>
    </CustomTabs>
  );
}