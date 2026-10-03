"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Lock, Mail, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@/lib/api-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2070&auto=format&fit=crop"
];

const TESTIMONIALS = [
  {
    name: "Head Chef",
    quote: "The secret of success is to eat what you like.",
  },
  {
    name: "General Manager",
    quote: "Great food and flawless service create lasting memories.",
  },
  {
    name: "Sous Chef",
    quote: "Cooking is an art, but consistency is a science.",
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const response = await apiClient.post("/auth/login", data);
      toast.success("Successfully logged in!");
      
      // Store session expiry (response.expires_in) somewhere if needed, 
      // or rely on a global AuthProvider to manage it.
      if (response?.expires_in) {
        localStorage.setItem("session_expires_at", (Date.now() + response.expires_in * 1000).toString());
      }
      
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      {/* Left side: Premium Carousel Background */}
      <div className="hidden md:flex flex-col flex-1 relative bg-black text-white overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          <Carousel 
            opts={{ loop: true, watchDrag: false }} 
            plugins={[Autoplay({ delay: 4000 })]}
            className="w-full h-full"
          >
            <CarouselContent className="h-full ml-0">
              {BACKGROUND_IMAGES.map((src, index) => (
                <CarouselItem key={index} className="h-screen w-full basis-full pl-0">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url('${src}')` }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-black/20" />
        
        {/* Content */}
        <div className="relative z-20 flex flex-col justify-between h-full p-12 lg:p-16">
          <div>
            <div className="flex flex-col items-start w-fit">
              <div className="flex gap-1">
                {['A', 'B', 'C', 'D'].map(letter => (
                  <div key={letter} className="w-10 h-10 bg-brand rounded-sm flex items-center justify-center shadow-md">
                    <span className="font-playfair text-white text-xl font-bold">{letter}</span>
                  </div>
                ))}
              </div>
              <span className="font-playfair text-xl font-bold text-white tracking-[0.2em] mt-1 ml-0.5">RESTAURANT</span>
            </div>
          </div>

          <div className="max-w-lg">
            <h2 className="text-3xl lg:text-4xl font-playfair font-medium leading-tight mb-4 text-white/90">
              Elevating the digital dining experience.
            </h2>
            <p className="font-outfit text-lg text-white/70 mb-8 leading-relaxed">
              Manage your digital storefront, analyze orders, and update menus with a powerful, modern content management system.
            </p>

            <div className="border-t border-white/20 pt-6">
              <Carousel 
                opts={{ loop: true, watchDrag: false }} 
                plugins={[Autoplay({ delay: 5000 })]}
                className="w-full"
              >
                <CarouselContent>
                  {TESTIMONIALS.map((t, idx) => (
                    <CarouselItem key={idx}>
                      <div className="flex flex-col gap-1">
                        <p className="font-outfit text-sm text-white/60 italic">"{t.quote}"</p>
                        <p className="font-outfit font-medium text-white">— {t.name}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Clean Form (No Card borders) */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md mx-auto space-y-10">
          
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-foreground">Welcome Back</h2>
            <p className="font-outfit text-muted-foreground text-lg">
              Please sign in to access your dashboard.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-outfit text-sm font-medium">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-brand" />
                        <Input 
                          placeholder="Enter your email address" 
                          className="pl-11 font-outfit h-12 bg-muted/30 border-border focus-visible:ring-brand focus-visible:border-brand transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-outfit text-xs" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex items-center justify-between">
                      <FormLabel className="font-outfit text-sm font-medium">Password</FormLabel>
                      <a href="#" className="font-outfit text-sm font-medium text-brand hover:underline" tabIndex={-1}>
                        Forgot password?
                      </a>
                    </div>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-brand" />
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          className="pl-11 pr-11 font-outfit h-12 bg-muted/30 border-border focus-visible:ring-brand focus-visible:border-brand transition-all"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground focus:outline-none"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="font-outfit text-xs" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full h-12 font-outfit bg-brand text-white hover:bg-brand/90 group transition-all mt-4" 
                disabled={isLoading || !form.formState.isValid}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span className="text-base">Sign In to Dashboard</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="pt-6 border-t border-border/50">
            <p className="text-sm text-center text-muted-foreground font-outfit flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Secure, encrypted portal.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
