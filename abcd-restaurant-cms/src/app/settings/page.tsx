"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SettingsForm } from "@/components/settings/settings-form";
import { SettingsFormValues } from "@/lib/schemas";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsPage() {
  const queryClient = useQueryClient();

  const { data: settingsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['settings'],
    queryFn: () => apiClient.get('/settings/').catch((err) => {
      if (err.response?.status === 404) {
        return null;
      }
      throw err;
    })
  });

  const mutation = useMutation({
    mutationFn: (values: SettingsFormValues) => {
      const payload = {
        ...values,
        map_url: values.mapUrl,
        is_online_ordering_enabled: values.isOnlineOrderingEnabled,
        is_table_reservation_enabled: values.isTableReservationEnabled,
        social_links: values.socialLinks?.map((l) => ({ platform: l.platform, url: l.url })) || [],
        operating_hours: values.operatingHours?.map((h) => ({
          day: h.day,
          hours: h.hours
        })) || []
      };
      return apiClient.put('/settings/', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success("Settings updated successfully!");
    },
    onError: (err: unknown) => {
      const axiosError = err as { response?: { data?: { detail?: string } } };
      toast.error(axiosError?.response?.data?.detail || "Failed to update settings. Please try again.");
    }
  });

  const handleSave = async (values: SettingsFormValues) => {
    return mutation.mutateAsync(values);
  };

  const initialData = React.useMemo<SettingsFormValues>(() => {
    const settings = settingsData as {
      email?: string;
      phone?: string;
      address?: string;
      map_url?: string;
      is_online_ordering_enabled?: boolean;
      is_table_reservation_enabled?: boolean;
      social_links?: { platform: string; url: string }[];
      operating_hours?: { day: string; hours: string }[];
    } | null | undefined;

    if (!settings) {
      return {
        email: "",
        phone: "",
        address: "",
        mapUrl: "",
        isOnlineOrderingEnabled: false,
        isTableReservationEnabled: true,
        socialLinks: [],
        operatingHours: [],
      };
    }

    return {
      email: settings.email || "",
      phone: settings.phone || "",
      address: settings.address || "",
      mapUrl: settings.map_url || "",
      isOnlineOrderingEnabled: settings.is_online_ordering_enabled ?? false,
      isTableReservationEnabled: settings.is_table_reservation_enabled ?? true,
      socialLinks: settings.social_links?.map((l) => ({ platform: l.platform, url: l.url })) || [],
      operatingHours: settings.operating_hours?.map((h) => ({
        day: h.day,
        hours: h.hours
      })) || [],
    };
  }, [settingsData]);

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
    content = <SettingsForm onSubmit={handleSave} initialData={initialData} isSaving={mutation.isPending} />;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Settings</h2>
          <p className="text-muted-foreground font-outfit mt-1 text-sm">
            Manage your restaurant&apos;s operational availability, contact information, and account settings.
          </p>
        </div>
        
        {content}
      </div>
    </DashboardLayout>
  );
}
