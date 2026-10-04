"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SettingsForm } from "@/components/settings/settings-form";
import { AccountSettingsForm } from "@/components/settings/account-settings-form";
import { mockSettings } from "@/lib/mockData";
import { SettingsFormValues } from "@/lib/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const queryClient = useQueryClient();

  const { data: settingsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['settings'],
    queryFn: () => apiClient.get('/settings/').catch((err) => {
      if (err.response?.status === 404) {
        return null; // No settings found yet, perfectly valid for first run
      }
      throw err;
    })
  });

  const mutation = useMutation({
    mutationFn: (values: SettingsFormValues) => {
      // API expects map_url (snake_case)
      const payload = {
        ...values,
        map_url: values.mapUrl,
        social_links: values.socialLinks?.map((l: { platform: string, url: string }) => ({ platform: l.platform, url: l.url })) || [],
        operating_hours: values.operatingHours?.map((h: { day: string, hours: string }) => ({
          day: h.day,
          hours: h.hours
        })) || []
      };
      return apiClient.put('/settings/', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    }
  });

  const handleSave = (values: SettingsFormValues) => {
    mutation.mutate(values);
  };

  let content;
  
  if (isLoading) {
    content = (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <div className="space-y-1">
          <p className="font-semibold font-outfit text-lg">Failed to load settings</p>
          <p className="text-muted-foreground text-sm font-outfit">There was a problem communicating with the server.</p>
        </div>
        <Button onClick={() => refetch()} variant="outline" className="font-outfit">
          Try Again
        </Button>
      </div>
    );
  } else {
    const settings = settingsData as { email?: string, phone?: string, address?: string, map_url?: string, social_links?: { platform: string, url: string }[], operating_hours?: { day: string, hours: string }[] };
    // Transform backend snake_case to frontend camelCase
    const initialData = settings ? {
      email: settings.email,
      phone: settings.phone,
      address: settings.address,
      mapUrl: settings.map_url || "",
      socialLinks: settings.social_links?.map((l: { platform: string, url: string }) => ({ platform: l.platform, url: l.url })) || [],
      operatingHours: settings.operating_hours?.map((h: { day: string, hours: string }) => ({
        day: h.day,
        hours: h.hours
      })) || [],
    } : {
      email: "",
      phone: "",
      address: "",
      mapUrl: "",
      socialLinks: [],
      operatingHours: [],
    };

    content = <SettingsForm onSubmit={handleSave} initialData={initialData as import('@/lib/schemas').SettingsFormValues} isSaving={mutation.isPending} />;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Settings</h2>
          <p className="text-muted-foreground font-outfit mt-1 text-sm">
            Manage your restaurant&apos;s global configuration and your account settings.
          </p>
        </div>
        
        {content}
      </div>
    </DashboardLayout>
  );
}

