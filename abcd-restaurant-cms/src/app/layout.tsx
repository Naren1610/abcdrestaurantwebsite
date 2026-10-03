import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { outfit, playfairDisplay, inter, cinzel, lato, poppins } from "@/lib/fonts";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABCD Restaurant CMS",
  description: "Content Management System for ABCD Restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${playfairDisplay.variable} ${inter.variable} ${cinzel.variable} ${lato.variable} ${poppins.variable} antialiased font-outfit min-h-screen bg-background text-foreground`}
      >
        <QueryProvider>
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
