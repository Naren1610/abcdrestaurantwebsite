"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/providers/auth-provider";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

const accountInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
});

type AccountInfoValues = z.infer<typeof accountInfoSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

export function AccountSettingsForm() {
  const { user } = useAuth();
  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const infoForm = useForm<AccountInfoValues>({
    resolver: zodResolver(accountInfoSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onInfoSubmit = async (data: AccountInfoValues) => {
    setIsSavingInfo(true);
    try {
      await apiClient.put("/auth/me", data);
      toast.success("Account information updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to update account information.");
    } finally {
      setIsSavingInfo(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordValues) => {
    setIsSavingPassword(true);
    try {
      await apiClient.put("/auth/password", {
        current_password: data.currentPassword,
        new_password: data.newPassword,
      });
      toast.success("Password updated successfully!");
      passwordForm.reset({ currentPassword: "", newPassword: "" });
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to update password.");
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Account Information Form */}
      <div>
        <h3 className="text-xl font-playfair font-semibold mb-4 text-brand">Account Information</h3>
        <Form {...infoForm}>
          <form onSubmit={infoForm.handleSubmit(onInfoSubmit)} className="bg-muted/10 p-6 rounded-xl border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <FormField
                control={infoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={infoForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. admin@abcd.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="font-outfit font-semibold text-muted-foreground">Account Role</FormLabel>
                <FormControl>
                  <Input value={user?.role?.name || "User"} readOnly className="bg-muted text-muted-foreground cursor-not-allowed" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>

            <div className="flex justify-end pt-6 border-t border-border/50">
              <Button type="submit" disabled={isSavingInfo} className="font-outfit bg-brand text-white hover:bg-brand/90 min-w-[140px]">
                {isSavingInfo ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Update Account"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Change Password Form */}
      <div>
        <h3 className="text-xl font-playfair font-semibold mb-4 text-brand">Change Password</h3>
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="bg-muted/10 p-6 rounded-xl border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showCurrentPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          {...field} 
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-outfit font-semibold">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showNewPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          {...field} 
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-6 border-t border-border/50">
              <Button type="submit" disabled={isSavingPassword} className="font-outfit bg-brand text-white hover:bg-brand/90 min-w-[140px]">
                {isSavingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
