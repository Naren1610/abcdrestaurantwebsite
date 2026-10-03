"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrdersOverviewPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-8 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Orders Overview</h2>
            <p className="text-muted-foreground font-outfit mt-2 text-sm">
              Monthly analytics, revenue, and order trends.
            </p>
          </div>
          <Button variant="outline" className="font-outfit border-border/60">
            Download Report
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/60 backdrop-blur-sm shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-outfit text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-brand" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-outfit text-foreground">$45,231.89</div>
              <p className="text-xs font-outfit text-emerald-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" /> +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/60 backdrop-blur-sm shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-outfit text-muted-foreground">Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-brand" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-outfit text-foreground">+2,350</div>
              <p className="text-xs font-outfit text-emerald-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" /> +15.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/60 backdrop-blur-sm shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-outfit text-muted-foreground">Active Diners</CardTitle>
              <Users className="h-4 w-4 text-brand" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-outfit text-foreground">+12,234</div>
              <p className="text-xs font-outfit text-emerald-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" /> +10.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/60 backdrop-blur-sm shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-outfit text-muted-foreground">Avg. Prep Time</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-outfit text-foreground">18 mins</div>
              <p className="text-xs font-outfit text-emerald-500 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 rotate-180" /> -2.5% from last month (Faster)
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4 bg-card/60 backdrop-blur-sm shadow-none">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t border-border/50 bg-muted/10 rounded-b-xl">
              <p className="text-muted-foreground font-outfit">Chart placeholder (Recharts/Chart.js)</p>
            </CardContent>
          </Card>
          
          <Card className="col-span-3 bg-card/60 backdrop-blur-sm shadow-none">
            <CardHeader>
              <CardTitle className="font-playfair text-xl">Top Selling Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Butter Chicken", sales: "324 sales", amount: "$5,832.00" },
                  { name: "Garlic Naan", sales: "840 sales", amount: "$3,360.00" },
                  { name: "Lamb Biryani", sales: "215 sales", amount: "$4,730.00" },
                  { name: "Paneer Tikka", sales: "198 sales", amount: "$3,168.00" },
                  { name: "Mango Lassi", sales: "450 sales", amount: "$2,250.00" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium font-outfit leading-none">{item.name}</p>
                      <p className="text-sm text-muted-foreground font-outfit">{item.sales}</p>
                    </div>
                    <div className="font-outfit font-bold">{item.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
