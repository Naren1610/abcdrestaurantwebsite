import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UtensilsCrossed, 
  CalendarCheck, 
  Image as ImageIcon, 
  ChefHat, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Dashboard Overview</h2>
            <p className="text-muted-foreground font-outfit mt-2 text-sm">
              Welcome back! Here&apos;s what&apos;s happening at ABCD Restaurant today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/menu/new">
              <Button className="bg-brand text-white hover:bg-brand/90 font-outfit shadow-none">
                <UtensilsCrossed className="mr-2 w-4 h-4" />
                Add Menu Item
              </Button>
            </Link>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card/60 backdrop-blur-sm p-6 shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground tracking-wide font-outfit">Today&apos;s Revenue</h3>
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold font-outfit text-foreground">$4,250</p>
            <p className="text-xs text-emerald-600 font-outfit mt-2 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +12% from yesterday
            </p>
          </div>
          <div className="rounded-xl border bg-card/60 backdrop-blur-sm p-6 shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground tracking-wide font-outfit">Active Orders</h3>
              <div className="p-2 bg-brand/10 rounded-lg text-brand">
                <ChefHat className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold font-outfit text-foreground">18</p>
            <p className="text-xs text-muted-foreground font-outfit mt-2 flex items-center">
              <Clock className="w-3 h-3 mr-1" /> 5 ready to serve
            </p>
          </div>
          <div className="rounded-xl border bg-card/60 backdrop-blur-sm p-6 shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground tracking-wide font-outfit">Reservations</h3>
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold font-outfit text-foreground">32</p>
            <p className="text-xs text-muted-foreground font-outfit mt-2 flex items-center">
              <Users className="w-3 h-3 mr-1" /> 120 total guests today
            </p>
          </div>
          <div className="rounded-xl border bg-card/60 backdrop-blur-sm p-6 shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground tracking-wide font-outfit">Menu Items</h3>
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-600">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold font-outfit text-foreground">84</p>
            <p className="text-xs text-muted-foreground font-outfit mt-2 flex items-center">
              <ImageIcon className="w-3 h-3 mr-1" /> Across 8 categories
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          
          {/* Recent Orders List */}
          <div className="col-span-1 lg:col-span-4 rounded-xl border bg-card/60 backdrop-blur-sm shadow-none overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border/60 flex items-center justify-between">
              <div>
                <h3 className="font-playfair text-lg font-bold text-foreground">Recent Orders</h3>
                <p className="text-sm text-muted-foreground font-outfit mt-1">Live updates from the kitchen</p>
              </div>
              <Link href="/orders/kitchen">
                <Button variant="ghost" size="sm" className="font-outfit text-brand">
                  View Kitchen <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="p-0 flex-1">
              {[
                { id: "#T-1024", type: "Dine In", time: "2 mins ago", items: 4, status: "Preparing" },
                { id: "#P-1015", type: "Pickup", time: "6 mins ago", items: 3, status: "Preparing" },
                { id: "#T-1019", type: "Dine In", time: "12 mins ago", items: 2, status: "Ready" },
                { id: "#D-1008", type: "Delivery", time: "15 mins ago", items: 5, status: "Ready" },
                { id: "#T-1022", type: "Dine In", time: "18 mins ago", items: 3, status: "Served" },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <ChefHat className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-outfit font-bold text-sm text-foreground">{order.id} <span className="font-normal text-muted-foreground ml-1">· {order.type}</span></p>
                      <p className="font-outfit text-xs text-muted-foreground mt-0.5">{order.items} items</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-outfit text-xs text-muted-foreground">{order.time}</span>
                    <Badge variant={order.status === "Ready" ? "default" : order.status === "Preparing" ? "secondary" : "outline"} className="font-outfit text-[10px] uppercase">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Reservations */}
          <div className="col-span-1 lg:col-span-3 rounded-xl border bg-card/60 backdrop-blur-sm shadow-none overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border/60 flex items-center justify-between">
              <div>
                <h3 className="font-playfair text-lg font-bold text-foreground">Upcoming Bookings</h3>
                <p className="text-sm text-muted-foreground font-outfit mt-1">Next 2 hours</p>
              </div>
              <Link href="/reservations">
                <Button variant="ghost" size="sm" className="font-outfit text-brand p-0 hover:bg-transparent">
                  View All
                </Button>
              </Link>
            </div>
            <div className="p-6 space-y-6">
              {[
                { name: "John Smith", time: "19:00", guests: 4, type: "VIP Table", status: "Confirmed" },
                { name: "Emily Davis", time: "19:15", guests: 2, type: "Lounge", status: "Arrived" },
                { name: "Michael Johnson", time: "19:30", guests: 6, type: "Standard", status: "Confirmed" },
                { name: "Sarah Williams", time: "20:00", guests: 3, type: "Standard", status: "Running Late" },
              ].map((res, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 text-center shrink-0">
                    <p className="font-outfit font-bold text-sm text-foreground">{res.time}</p>
                    <p className="font-outfit text-[10px] text-muted-foreground uppercase mt-0.5">PM</p>
                  </div>
                  <div className="flex-1 bg-muted/30 border border-border/60 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-outfit font-semibold text-sm text-foreground">{res.name}</p>
                      <Badge variant="outline" className="font-outfit text-[10px] bg-background">
                        {res.status}
                      </Badge>
                    </div>
                    <p className="font-outfit text-xs text-muted-foreground">
                      {res.guests} Guests · {res.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}