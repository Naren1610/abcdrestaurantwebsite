"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, SettingsFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Loader2, ShoppingBag, CalendarCheck, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from "@/components/ui/custom-tabs";
import { AccountSettingsForm } from "@/components/settings/account-settings-form";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface SettingsFormProps {
  initialData?: SettingsFormValues | null;
  onSubmit: (data: SettingsFormValues) => Promise<unknown> | void;
  isSaving?: boolean;
}

export function SettingsForm({ initialData, onSubmit, isSaving }: SettingsFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get active tab from URL or default to 'operations'
  const tabFromUrl = searchParams.get("tab") || "operations";
  const [activeTab, setActiveTab] = React.useState(tabFromUrl);

  // Sync state with URL changes
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
      isOnlineOrderingEnabled: false,
      isTableReservationEnabled: true,
      socialLinks: [],
      operatingHours: [],
    },
  });

  // Track initialData changes safely: only reset when data from server genuinely changes
  // and NOT while an edit/save is in flight
  const lastResetDataRef = React.useRef(JSON.stringify(initialData));
  React.useEffect(() => {
    const currentSerialized = JSON.stringify(initialData);
    if (initialData && currentSerialized !== lastResetDataRef.current && !isSaving && !form.formState.isSubmitting) {
      lastResetDataRef.current = currentSerialized;
      form.reset(initialData);
    }
  }, [initialData, form, isSaving]);

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const { fields: hourFields, append: appendHours, remove: removeHours } = useFieldArray({
    control: form.control,
    name: "operatingHours",
  });

  const handleSubmit = async (data: SettingsFormValues) => {
    try {
      await onSubmit(data);
      // Toast notification is handled in mutation onSuccess after DB confirmation
    } catch {
      // Handled in mutation onError
    }
  };

  return (
    <TooltipProvider delay={150}>
      <CustomTabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <CustomTabsList className="mb-8">
          <CustomTabsTrigger value="operations">
            Operations & Availability
          </CustomTabsTrigger>
          <CustomTabsTrigger value="contact">
            Contact & Social
          </CustomTabsTrigger>
          <CustomTabsTrigger value="hours">
            Operating Hours
          </CustomTabsTrigger>
          <CustomTabsTrigger value="account">
            Account
          </CustomTabsTrigger>
        </CustomTabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className={activeTab === "account" ? "hidden" : "space-y-8"}>

            {/* Operations & Availability Tab */}
            <CustomTabsContent value="operations" className="space-y-8 mt-0">
              <div>
                <h3 className="text-xl font-playfair font-semibold mb-2 text-brand">Service Availability & Operations</h3>
                <p className="text-muted-foreground text-sm font-outfit mb-6">
                  Manage whether your website accepts online food orders or dining table bookings. Hover over the info icon for details.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Online Ordering Toggle Card */}
                  <FormField
                    control={form.control}
                    name="isOnlineOrderingEnabled"
                    render={({ field }) => (
                      <div className="group flex flex-col justify-between p-5 sm:p-6 rounded-xl border border-border/70 bg-card shadow-none hover:border-brand/40 hover:shadow-[0_4px_20px_rgba(78,18,30,0.04)] transition-all">
                        <div className="flex items-center justify-between gap-4">
                          {/* Left: Icon + Title + Tooltip */}
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
                              <ShoppingBag className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-playfair font-bold text-base sm:text-lg text-foreground group-hover:text-brand leading-tight transition-colors">
                                  Online Food Ordering
                                </h4>
                                <Tooltip>
                                  <TooltipTrigger className="text-muted-foreground hover:text-brand transition-colors p-0.5 rounded-full focus:outline-none cursor-pointer">
                                    <Info className="w-4 h-4" />
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs text-xs font-outfit p-3 leading-relaxed shadow-lg">
                                    When enabled, menu and signature dish cards show &quot;+ Add&quot; and quantity buttons, allowing customers to add dishes to cart, view the cart drawer, and complete checkout. When disabled, the website operates in a luxury digital menu showcase mode with all transaction buttons hidden.
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <p className="text-xs text-muted-foreground font-outfit mt-0.5">
                                Menu Cards &amp; Digital Cart
                              </p>
                            </div>
                          </div>

                          {/* Right: Badge on Top, Toggle Switch directly underneath */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <Badge 
                              variant="outline" 
                              className={field.value 
                                ? "bg-emerald-500/10 text-emerald-700 border-emerald-300/80 font-outfit text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5" 
                                : "bg-amber-500/10 text-amber-700 border-amber-300/80 font-outfit text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5"}
                            >
                              <span className={field.value ? "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" : "w-1.5 h-1.5 rounded-full bg-amber-500"} />
                              {field.value ? "Accepting Orders" : "Digital Menu Mode"}
                            </Badge>

                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              aria-label="Toggle Online Food Ordering"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  {/* Table Reservations Toggle Card */}
                  <FormField
                    control={form.control}
                    name="isTableReservationEnabled"
                    render={({ field }) => (
                      <div className="group flex flex-col justify-between p-5 sm:p-6 rounded-xl border border-border/70 bg-card shadow-none hover:border-brand/40 hover:shadow-[0_4px_20px_rgba(78,18,30,0.04)] transition-all">
                        <div className="flex items-center justify-between gap-4">
                          {/* Left: Icon + Title + Tooltip */}
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
                              <CalendarCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-playfair font-bold text-base sm:text-lg text-foreground group-hover:text-brand leading-tight transition-colors">
                                  Table Reservations
                                </h4>
                                <Tooltip>
                                  <TooltipTrigger className="text-muted-foreground hover:text-brand transition-colors p-0.5 rounded-full focus:outline-none cursor-pointer">
                                    <Info className="w-4 h-4" />
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs text-xs font-outfit p-3 leading-relaxed shadow-lg">
                                    When enabled, the &quot;Reserve&quot; navigation link is displayed and guests can book dining tables through the reservation wizard. When disabled, the reservation link is hidden from navigation and calls-to-action prompt guests to call the restaurant directly.
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <p className="text-xs text-muted-foreground font-outfit mt-0.5">
                                Dine-in Bookings &amp; Wizard
                              </p>
                            </div>
                          </div>

                          {/* Right: Badge on Top, Toggle Switch directly underneath */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <Badge 
                              variant="outline" 
                              className={field.value 
                                ? "bg-emerald-500/10 text-emerald-700 border-emerald-300/80 font-outfit text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5" 
                                : "bg-amber-500/10 text-amber-700 border-amber-300/80 font-outfit text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5"}
                            >
                              <span className={field.value ? "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" : "w-1.5 h-1.5 rounded-full bg-amber-500"} />
                              {field.value ? "Bookings Active" : "Call-In Only"}
                            </Badge>

                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              aria-label="Toggle Table Reservations"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </CustomTabsContent>

            {/* Contact & Social Tab */}
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
                          <Input placeholder="e.g. +1 (555) 000-0000" {...field} />
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
                        <FormLabel className="font-outfit font-semibold">Physical Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Restaurant Way, City, State" {...field} />
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

            {/* Operating Hours Tab */}
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
    </TooltipProvider>
  );
}

