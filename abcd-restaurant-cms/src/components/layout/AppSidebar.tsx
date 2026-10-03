"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  UtensilsCrossed, Layers, 
  LayoutDashboard, 
  Home, 
  Info, 
  Settings, 
  Image as ImageIcon,
  CalendarDays,
  Files,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const contentNav = [
  { title: "Home", url: "/home-content", icon: Home },
  { title: "Our Story", url: "/our-story", icon: Info },
  { title: "Menu", url: "/menu", icon: UtensilsCrossed },

  { title: "Gallery", url: "/gallery", icon: ImageIcon },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-sidebar-border/50 overflow-hidden group-data-[collapsible=icon]:hidden">
        <h2 className="font-cinzel font-bold text-xl text-brand uppercase tracking-wider md:block">
          ABCD CMS
        </h2>
      </SidebarHeader>
      
      <SidebarContent className="px-2 pt-4 overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 group-data-[collapsible=icon]:hidden">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  render={<Link href="/" className="flex items-center gap-3 w-full overflow-hidden group-data-[collapsible=icon]:justify-center" />} 
                  isActive={pathname === "/"} 
                  tooltip="Dashboard"
                  className="transition-all hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                >
                  <LayoutDashboard className="w-5 h-5 flex-shrink-0 opacity-80" />
                  <span className="font-outfit text-sm truncate group-data-[collapsible=icon]:hidden">
                    Dashboard
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  render={<Link href="/reservations" className="flex items-center gap-3 w-full overflow-hidden group-data-[collapsible=icon]:justify-center" />} 
                  isActive={pathname.startsWith("/reservations")} 
                  tooltip="Reservations"
                  className="transition-all hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                >
                  <CalendarDays className="w-5 h-5 flex-shrink-0 opacity-80" />
                  <span className="font-outfit text-sm truncate group-data-[collapsible=icon]:hidden">
                    Reservations
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Manage Content" className="transition-all hover:bg-sidebar-accent/70">
                      <Files className="w-5 h-5 flex-shrink-0 opacity-80" />
                      <span className="font-outfit text-sm truncate group-data-[collapsible=icon]:hidden">Manage Content</span>
                      <ChevronRight className="ml-auto w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="mt-1 gap-1 border-sidebar-border">
                      {contentNav.map((item) => {
                        const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                        return (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              render={<Link href={item.url} />}
                              isActive={isActive}
                              className="font-outfit transition-all data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                            >
                              <span>{item.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible defaultOpen={pathname.startsWith("/orders")} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Orders" className="transition-all hover:bg-sidebar-accent/70">
                      <UtensilsCrossed className="w-5 h-5 flex-shrink-0 opacity-80" />
                      <span className="font-outfit text-sm truncate group-data-[collapsible=icon]:hidden">Orders</span>
                      <ChevronRight className="ml-auto w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="mt-1 gap-1 border-sidebar-border">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          render={<Link href="/orders/kitchen" />}
                          isActive={pathname === "/orders/kitchen"}
                          className="font-outfit transition-all data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                        >
                          <span>Kitchen (Live)</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          render={<Link href="/orders/overview" />}
                          isActive={pathname === "/orders/overview"}
                          className="font-outfit transition-all data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                        >
                          <span>Overview</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          render={<Link href="/orders/payments" />}
                          isActive={pathname === "/orders/payments"}
                          className="font-outfit transition-all data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                        >
                          <span>Payments</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          render={<Link href="/orders/history" />}
                          isActive={pathname === "/orders/history"}
                          className="font-outfit transition-all data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                        >
                          <span>Order History</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  render={<Link href="/settings" className="flex items-center gap-3 w-full overflow-hidden group-data-[collapsible=icon]:justify-center" />} 
                  isActive={pathname.startsWith("/settings")} 
                  tooltip="Settings"
                  className="transition-all hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                >
                  <Settings className="w-5 h-5 flex-shrink-0 opacity-80" />
                  <span className="font-outfit text-sm truncate group-data-[collapsible=icon]:hidden">
                    Settings
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    </Sidebar>
  );
}
