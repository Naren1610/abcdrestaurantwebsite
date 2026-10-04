"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, MoreHorizontal, CheckCircle2, XCircle, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Payment {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: "Credit Card" | "Cash" | "UPI" | "Wallet";
  status: "Completed" | "Pending" | "Failed" | "Refunded";
  date: string;
}

const payments: Payment[] = [
  { id: "PAY-1021", orderId: "ORD-9021", customer: "John Doe", amount: 45.50, method: "Credit Card", status: "Completed", date: "2023-10-24 14:32" },
  { id: "PAY-1022", orderId: "ORD-9022", customer: "Sarah Smith", amount: 120.00, method: "UPI", status: "Completed", date: "2023-10-24 14:28" },
  { id: "PAY-1023", orderId: "ORD-9023", customer: "Walk-in Customer", amount: 32.00, method: "Cash", status: "Completed", date: "2023-10-24 14:15" },
  { id: "PAY-1024", orderId: "ORD-9024", customer: "Mike Johnson", amount: 85.75, method: "Credit Card", status: "Failed", date: "2023-10-24 13:55" },
  { id: "PAY-1025", orderId: "ORD-9025", customer: "Emily Davis", amount: 65.00, method: "Wallet", status: "Pending", date: "2023-10-24 13:40" },
  { id: "PAY-1026", orderId: "ORD-9026", customer: "Walk-in Customer", amount: 110.50, method: "Credit Card", status: "Refunded", date: "2023-10-24 12:10" },
];

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => <span className="font-outfit font-medium">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => <span className="font-outfit text-muted-foreground">{row.getValue("orderId")}</span>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <span className="font-outfit">{row.getValue("customer")}</span>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-outfit font-bold">{formatted}</div>;
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => <span className="font-outfit">{row.getValue("method")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = "default";
      let className = "font-outfit";
      
      if (status === "Completed") className += " bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20";
      else if (status === "Failed") className += " bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20";
      else if (status === "Pending") className += " bg-amber-500/10 text-amber-600 border-amber-200 hover:bg-amber-500/20";
      else if (status === "Refunded") className += " bg-muted text-muted-foreground hover:bg-muted/80";

      return <Badge variant="outline" className={className}>{status}</Badge>;
    },
  },
  {
    accessorKey: "date",
    header: "Date & Time",
    cell: ({ row }) => <span className="font-outfit text-muted-foreground">{row.getValue("date")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="font-outfit">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Order Details</DropdownMenuItem>
            <DropdownMenuItem>Download Receipt</DropdownMenuItem>
            {payment.status === "Completed" && (
              <DropdownMenuItem className="text-destructive focus:text-destructive">Initiate Refund</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-8 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Payments & Transactions</h2>
            <p className="text-muted-foreground font-outfit mt-2 text-sm">
              View and manage all financial transactions, refunds, and payment statuses.
            </p>
          </div>
          <Button variant="outline" className="font-outfit border-border/60">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-4">
          <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-outfit font-semibold">Successful Payments</h3>
            </div>
            <p className="font-outfit text-2xl font-bold">142 <span className="text-sm font-normal text-muted-foreground">today</span></p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2 text-amber-500">
              <Clock className="w-5 h-5" />
              <h3 className="font-outfit font-semibold">Pending Settlements</h3>
            </div>
            <p className="font-outfit text-2xl font-bold">$1,245.00</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2 text-destructive">
              <XCircle className="w-5 h-5" />
              <h3 className="font-outfit font-semibold">Failed Transactions</h3>
            </div>
            <p className="font-outfit text-2xl font-bold">3 <span className="text-sm font-normal text-muted-foreground">requires attention</span></p>
          </div>
        </div>

        <DataTable columns={columns} data={payments} searchKey="customer" searchPlaceholder="Search by customer name..." />
      </div>
    </DashboardLayout>
  );
}
