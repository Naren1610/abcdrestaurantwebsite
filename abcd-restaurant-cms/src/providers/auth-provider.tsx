"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { Loader2 } from "lucide-react";
import { SessionExpiryAlert } from "@/components/auth/SessionExpiryAlert";

interface User {
  id: number;
  email: string;
  name: string | null;
  is_active: boolean;
  role: { id: number; name: string } | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = useCallback(async () => {
    if (pathname === "/login") {
      setIsLoading(false);
      return;
    }
    
    try {
      const data = await apiClient.get("/auth/me");
      setUser(data as unknown as User);
      const existingExpiresAt = localStorage.getItem("session_expires_at");
      // If no expiry is stored or it was from the old 1-hour session (< 3.5h remaining), expand to 5 hours (18000s)
      if (!existingExpiresAt || parseInt(existingExpiresAt, 10) - Date.now() < 3.5 * 3600 * 1000) {
        localStorage.setItem("session_expires_at", (Date.now() + 18000 * 1000).toString());
      }
    } catch {
      setUser(null);
      localStorage.removeItem("session_expires_at");
      if (pathname !== "/login") {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [pathname, router]);

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      localStorage.removeItem("session_expires_at");
      setCountdown(null);
      router.push("/login");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Authentication fetching on mount/route-change requires syncing state
    fetchUser();
  }, [pathname, fetchUser]);

  // Session timer logic
  useEffect(() => {
    if (!user) return;

    const intervalId = setInterval(() => {
      const expiresAtStr = localStorage.getItem("session_expires_at");
      if (!expiresAtStr) return;

      const expiresAt = parseInt(expiresAtStr, 10);
      const now = Date.now();
      const timeLeft = expiresAt - now;

      if (timeLeft <= 0) {
        clearInterval(intervalId);
        setCountdown(null);
        logout();
      } else if (timeLeft <= 90000) { // Start counting down in the last 90 seconds
        setCountdown(Math.ceil(timeLeft / 1000));
      } else {
        setCountdown(null);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [user]);

  // Block rendering of private pages while checking authentication to prevent flashes
  if (isLoading && pathname !== "/login") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  // Prevent rendering private routes if auth failed (waiting for redirect)
  if (!isLoading && !user && pathname !== "/login") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
      <SessionExpiryAlert countdown={countdown} onLogout={logout} maxTime={90} />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
