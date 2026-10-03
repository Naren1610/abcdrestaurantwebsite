"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type OrderStatus = "in_progress" | "ready";
type OrderType = "Dine In" | "Pickup" | "Delivery";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  customerOrTable: string;
  type: OrderType;
  status: OrderStatus;
  timeElapsed: string;
  timeUnit: "m" | "h";
  timeValue: number;
  items: OrderItem[];
  isAsap?: boolean;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "#T-1024",
    customerOrTable: "Table 12",
    type: "Dine In",
    status: "in_progress",
    timeElapsed: "2m",
    timeUnit: "m",
    timeValue: 2,
    items: [
      { id: "1", name: "Lucknowi Murgh Biryani", quantity: 1 },
      { id: "2", name: "Butter Chicken", quantity: 1 },
      { id: "3", name: "Garlic Naan", quantity: 2 },
      { id: "4", name: "Mango Lassi", quantity: 1 },
    ],
  },
  {
    id: "#P-1015",
    customerOrTable: "John Smith",
    type: "Pickup",
    status: "in_progress",
    timeElapsed: "6m",
    timeUnit: "m",
    timeValue: 6,
    items: [
      { id: "5", name: "Paneer Achari Tikka", quantity: 1 },
      { id: "6", name: "Dal Makhani", quantity: 1 },
      { id: "7", name: "Laccha Paratha", quantity: 1 },
    ],
  },
  {
    id: "#T-1019",
    customerOrTable: "Table 11",
    type: "Dine In",
    status: "in_progress",
    timeElapsed: "12m",
    timeUnit: "m",
    timeValue: 12,
    items: [
      { id: "8", name: "Murgh Malai Tikka", quantity: 1 },
      { id: "9", name: "Chicken 65", quantity: 1 },
      { id: "10", name: "Veg Manchurian", quantity: 1 },
    ],
  },
  {
    id: "#D-1008",
    customerOrTable: "Sarah Johnson",
    type: "Delivery",
    status: "in_progress",
    timeElapsed: "15m",
    timeUnit: "m",
    timeValue: 15,
    items: [
      { id: "11", name: "Hakka Noodles", quantity: 1 },
      { id: "12", name: "Chilli Paneer", quantity: 1 },
      { id: "13", name: "Gulab Jamun", quantity: 1 },
    ],
  },
  {
    id: "#T-1022",
    customerOrTable: "Table 3",
    type: "Dine In",
    status: "in_progress",
    timeElapsed: "18m",
    timeUnit: "m",
    timeValue: 18,
    items: [
      { id: "14", name: "Tandoori Chicken", quantity: 1 },
      { id: "15", name: "Laccha Paratha", quantity: 2 },
      { id: "16", name: "Dal Makhani", quantity: 1 },
    ],
  },
  {
    id: "#T-1024-R",
    customerOrTable: "Table 12",
    type: "Dine In",
    status: "ready",
    timeElapsed: "Ready",
    timeUnit: "m",
    timeValue: 0,
    items: [
      { id: "1", name: "Lucknowi Murgh Biryani", quantity: 1 },
      { id: "2", name: "Butter Chicken", quantity: 1 },
      { id: "3", name: "Garlic Naan", quantity: 2 },
      { id: "4", name: "Mango Lassi", quantity: 1 },
    ],
  },
  {
    id: "#P-1015-R",
    customerOrTable: "John Smith",
    type: "Pickup",
    status: "ready",
    timeElapsed: "Ready",
    timeUnit: "m",
    timeValue: 0,
    isAsap: true,
    items: [
      { id: "5", name: "Paneer Achari Tikka", quantity: 1 },
      { id: "6", name: "Dal Makhani", quantity: 1 },
      { id: "7", name: "Laccha Paratha", quantity: 1 },
    ],
  },
  {
    id: "#T-1019-R",
    customerOrTable: "Table 11",
    type: "Dine In",
    status: "ready",
    timeElapsed: "Ready",
    timeUnit: "m",
    timeValue: 0,
    items: [
      { id: "8", name: "Murgh Malai Tikka", quantity: 1 },
      { id: "9", name: "Chicken 65", quantity: 1 },
      { id: "10", name: "Veg Manchurian", quantity: 1 },
    ],
  },
  {
    id: "#D-1008-R",
    customerOrTable: "Sarah Johnson",
    type: "Delivery",
    status: "ready",
    timeElapsed: "Ready",
    timeUnit: "m",
    timeValue: 0,
    items: [
      { id: "11", name: "Hakka Noodles", quantity: 1 },
      { id: "12", name: "Chilli Paneer", quantity: 1 },
      { id: "13", name: "Gulab Jamun", quantity: 1 },
    ],
  },
];

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleMarkReady = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "ready", timeElapsed: "Ready" } : o
      )
    );
  };

  const handleMarkServed = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const filteredOrders = orders.filter((o) => {
    if (activeTab === "all") return true;
    if (activeTab === "dine-in") return o.type === "Dine In";
    if (activeTab === "pickup") return o.type === "Pickup";
    if (activeTab === "delivery") return o.type === "Delivery";
    return true;
  });

  const inProgressOrders = filteredOrders.filter((o) => o.status === "in_progress");
  const readyOrders = filteredOrders.filter((o) => o.status === "ready");

  const totalAll = orders.length;
  const totalDineIn = orders.filter((o) => o.type === "Dine In").length;
  const totalPickup = orders.filter((o) => o.type === "Pickup").length;
  const totalDelivery = orders.filter((o) => o.type === "Delivery").length;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-6 h-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-brand tracking-tight">Kitchen Display</h1>
            <p className="text-muted-foreground font-outfit mt-1 text-sm">
              Real-time order updates from all channels.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xl font-outfit font-semibold text-foreground">
              {currentTime || "9:41 AM"}
            </div>
            <Button className="bg-brand text-white hover:bg-brand/90 font-outfit rounded-full px-5">
              View Completed (12)
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <div>
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-0 flex-wrap justify-start border rounded-lg overflow-hidden inline-flex shadow-none">
              <TabsTrigger
                value="all"
                className="rounded-none border-r px-4 py-2 font-outfit text-sm font-semibold data-[state=active]:bg-brand data-[state=active]:text-white data-[state=inactive]:bg-card/60 data-[state=inactive]:backdrop-blur-sm data-[state=inactive]:text-foreground data-[state=inactive]:hover:bg-muted/50"
              >
                All Orders ({totalAll})
              </TabsTrigger>
              <TabsTrigger
                value="dine-in"
                className="rounded-none border-r px-4 py-2 font-outfit text-sm font-semibold data-[state=active]:bg-brand data-[state=active]:text-white data-[state=inactive]:bg-card/60 data-[state=inactive]:backdrop-blur-sm data-[state=inactive]:text-foreground data-[state=inactive]:hover:bg-muted/50"
              >
                Dine In ({totalDineIn})
              </TabsTrigger>
              <TabsTrigger
                value="pickup"
                className="rounded-none border-r px-4 py-2 font-outfit text-sm font-semibold data-[state=active]:bg-brand data-[state=active]:text-white data-[state=inactive]:bg-card/60 data-[state=inactive]:backdrop-blur-sm data-[state=inactive]:text-foreground data-[state=inactive]:hover:bg-muted/50"
              >
                Pickup ({totalPickup})
              </TabsTrigger>
              <TabsTrigger
                value="delivery"
                className="rounded-none px-4 py-2 font-outfit text-sm font-semibold data-[state=active]:bg-brand data-[state=active]:text-white data-[state=inactive]:bg-card/60 data-[state=inactive]:backdrop-blur-sm data-[state=inactive]:text-foreground data-[state=inactive]:hover:bg-muted/50"
              >
                Delivery ({totalDelivery})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* IN PROGRESS SECTION */}
        <div className="mt-2">
          <h2 className="font-outfit font-bold text-xs tracking-widest text-muted-foreground uppercase mb-4">
            In Progress ({inProgressOrders.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {inProgressOrders.map((order) => (
              <OrderCard key={order.id} order={order} onReady={() => handleMarkReady(order.id)} />
            ))}
          </div>
        </div>

        {/* READY TO SERVE SECTION */}
        <div className="mt-6 mb-8">
          <h2 className="font-outfit font-bold text-xs tracking-widest text-muted-foreground uppercase mb-4">
            Ready To Serve ({readyOrders.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {readyOrders.map((order) => (
              <OrderCard key={order.id} order={order} onServed={() => handleMarkServed(order.id)} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function OrderCard({ order, onReady, onServed }: { order: Order; onReady?: () => void; onServed?: () => void }) {
  const isReady = order.status === "ready";
  const isUrgent = !isReady && order.timeValue <= 5; 
  
  const cardBorder = "border-border/60";
  
  return (
    <div className={cn("bg-card/60 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col shadow-none", "border", cardBorder)}>
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex justify-between items-start mb-1.5">
          <h3 className="font-outfit font-bold text-lg text-brand">{order.id}</h3>
          <span className={cn(
            "font-outfit font-bold text-sm",
            isReady ? "text-emerald-600" : isUrgent ? "text-red-600" : "text-emerald-600"
          )}>
            {order.timeElapsed}
          </span>
        </div>
        <div className="font-outfit text-xs text-muted-foreground flex items-center">
          {order.customerOrTable} <span className="mx-1.5 font-bold">·</span> {order.type} 
          {order.isAsap && <><span className="mx-1.5 font-bold">·</span> <span className="text-foreground font-medium">ASAP</span></>}
        </div>
      </div>

      {/* Divider */}
      <div className="w-[calc(100%-2rem)] mx-auto h-[1px] bg-border/50"></div>

      {/* Items */}
      <div className="p-4 flex-1">
        <ul className="space-y-2.5">
          {order.items.map((item, idx) => (
            <li key={idx} className="flex font-outfit text-sm text-foreground">
              <span className="w-5 font-semibold shrink-0 text-brand">{item.quantity}x</span>
              <span className="opacity-90">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Buttons */}
      <div className="p-4 pt-2 mt-auto">
        {!isReady ? (
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 bg-brand text-white hover:bg-brand/90 font-outfit rounded-full font-medium">
              Preparing
            </Button>
            <Button 
              size="sm"
              onClick={onReady}
              variant="outline" 
              className="flex-1 border-brand text-brand hover:bg-brand/5 hover:text-brand font-outfit rounded-full font-medium"
            >
              Ready
            </Button>
          </div>
        ) : (
          <Button 
            size="sm"
            onClick={onServed}
            className="w-full bg-brand text-white hover:bg-brand/90 font-outfit rounded-full font-medium"
          >
            Mark as Served
          </Button>
        )}
      </div>
    </div>
  );
}
