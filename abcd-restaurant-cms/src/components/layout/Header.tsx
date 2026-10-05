import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors rounded-md" />
        <h1 className="font-outfit text-lg font-semibold text-foreground tracking-tight hidden sm:block">
          Dashboard
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded-full cursor-pointer">
            <Avatar className="h-9 w-9 shadow-sm border border-border/50 transition-transform hover:scale-105">
              <AvatarImage src={undefined} alt={user?.name || "Admin"} />
              <AvatarFallback className="bg-brand text-white font-medium text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 font-outfit">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">{user?.name || "Admin"}</span>
                  <span className="text-xs text-muted-foreground font-normal">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Link href="/settings?tab=account">
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}