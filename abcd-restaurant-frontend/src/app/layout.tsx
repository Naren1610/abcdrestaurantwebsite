import type { Metadata } from "next";
import { outfit, playfairDisplay, inter, cinzel, lato, poppins } from "@/lib/fonts";
import { QueryProvider } from "@/providers/query-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABCD Restaurant - The Ultimate Dining Experience",
  description: "Experience fine dining at its best with ABCD Restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${playfairDisplay.variable} ${inter.variable} ${cinzel.variable} ${lato.variable} ${poppins.variable} antialiased font-outfit min-h-screen flex flex-col`}
      >
        <QueryProvider>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
