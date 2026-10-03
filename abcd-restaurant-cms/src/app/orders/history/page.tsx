"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Eye, Filter } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface OrderHistory {
  id: string;
  customer: string;
  itemsCount: number;
  total: number;
  type: "Dine-in" | "Takeaway" | "Delivery";
  status: "Completed" | "Cancelled";
  date: string;
}

const historyData: OrderHistory[] = [
  { id: "ORD-9020", customer: "John Doe", itemsCount: 3, total: 45.50, type: "Dine-in", status: "Completed", date: "2023-10-24 14:10" },
  { id: "ORD-9019", customer: "Walk-in", itemsCount: 1, total: 12.00, type: "Takeaway", status: "Completed", date: "2023-10-24 13:45" },
  { id: "ORD-9018", customer: "Sarah Smith", itemsCount: 5, total: 120.00, type: "Delivery", status: "Cancelled", date: "2023-10-24 13:30" },
  { id: "ORD-9017", customer: "Table 4", itemsCount: 2, total: 28.50, type: "Dine-in", status: "Completed", date: "2023-10-24 13:15" },
  { id: "ORD-9016", customer: "Mike Johnson", itemsCount: 4, total: 85.75, type: "Delivery", status: "Completed", date: "2023-10-24 12:50" },
];

export default function OrderHistoryPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);

  const columns: ColumnDef<OrderHistory>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <span className="font-outfit font-bold">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "customer",
      header: "Customer / Table",
      cell: ({ row }) => <span className="font-outfit">{row.getValue("customer")}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <Badge variant="secondary" className="font-outfit bg-muted">{row.getValue("type")}</Badge>,
    },
    {
      accessorKey: "itemsCount",
      header: "Items",
      cell: ({ row }) => <span className="font-outfit text-muted-foreground">{row.getValue("itemsCount")} items</span>,
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"));
        const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
        return <div className="font-outfit font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const isCompleted = status === "Completed";
        return (
          <Badge variant="outline" className={`font-outfit ${isCompleted ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <span className="font-outfit text-muted-foreground">{row.getValue("date")}</span>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(row.original)}>
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-8 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Order History</h2>
            <p className="text-muted-foreground font-outfit mt-2 text-sm">
              Complete archive of all past orders and their fulfillment status.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="font-outfit border-border/60">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <DataTable columns={columns} data={historyData} searchKey="id" searchPlaceholder="Search by Order ID..." />

        {/* View Order Modal */}
        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-playfair font-bold text-xl text-brand flex justify-between items-center pr-4">
                {selectedOrder?.id}
                <Badge variant="outline" className={selectedOrder?.status === "Completed" ? 'bg-emerald-500/10 text-emerald-600' : 'bg-destructive/10 text-destructive'}>
                  {selectedOrder?.status}
                </Badge>
              </DialogTitle>
              <DialogDescription className="font-outfit">
                Placed on {selectedOrder?.date} • {selectedOrder?.type}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                <h4 className="font-outfit font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">Order Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between font-outfit">
                    <span>Customer/Table</span>
                    <span className="font-medium">{selectedOrder?.customer}</span>
                  </div>
                  <div className="flex justify-between font-outfit">
                    <span>Total Items</span>
                    <span className="font-medium">{selectedOrder?.itemsCount}</span>
                  </div>
                  <div className="flex justify-between font-outfit text-lg font-bold pt-3 border-t border-border/50">
                    <span>Total Amount</span>
                    <span>${selectedOrder?.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedOrder(null)} className="font-outfit">Close</Button>
                <Button className="font-outfit bg-brand text-white hover:bg-brand/90">Print Receipt</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
