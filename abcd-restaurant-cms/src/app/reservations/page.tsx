"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, MoreHorizontal, CalendarCheck, Users, CheckCircle2, XCircle, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Reservation {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  experience: "Lunch" | "Dinner";
  guests: number;
  seatingType: "Tables" | "Lounge";
  occasion?: string;
  specialRequest?: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

const reservations: Reservation[] = [
  {
    id: "RES-2041",
    fullName: "John Smith",
    phone: "+1 234 567 8900",
    email: "john@example.com",
    date: "2023-10-24",
    time: "19:00",
    experience: "Dinner",
    guests: 4,
    seatingType: "Tables",
    occasion: "Anniversary",
    status: "Confirmed",
  },
  {
    id: "RES-2042",
    fullName: "Emily Davis",
    phone: "+1 987 654 3210",
    email: "emily.d@example.com",
    date: "2023-10-24",
    time: "13:30",
    experience: "Lunch",
    guests: 2,
    seatingType: "Lounge",
    status: "Pending",
  },
  {
    id: "RES-2043",
    fullName: "Michael Johnson",
    phone: "+1 555 123 4567",
    email: "mike.j@example.com",
    date: "2023-10-25",
    time: "20:00",
    experience: "Dinner",
    guests: 6,
    seatingType: "Tables",
    specialRequest: "Window seat if possible",
    status: "Confirmed",
  },
  {
    id: "RES-2044",
    fullName: "Sarah Williams",
    phone: "+1 444 987 6543",
    email: "sarah.w@example.com",
    date: "2023-10-25",
    time: "14:00",
    experience: "Lunch",
    guests: 3,
    seatingType: "Tables",
    status: "Cancelled",
  },
  {
    id: "RES-2045",
    fullName: "David Brown",
    phone: "+1 333 456 7890",
    email: "david.b@example.com",
    date: "2023-10-26",
    time: "19:30",
    experience: "Dinner",
    guests: 8,
    seatingType: "Lounge",
    occasion: "Birthday",
    specialRequest: "Need a high chair",
    status: "Confirmed",
  },
];

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "id",
    header: "Ref ID",
    cell: ({ row }) => <span className="font-outfit font-medium">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "fullName",
    header: "Guest Details",
    cell: ({ row }) => {
      const res = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-outfit font-semibold text-foreground">{res.fullName}</span>
          <span className="font-outfit text-xs text-muted-foreground">{res.phone}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date & Time",
    cell: ({ row }) => {
      const res = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-outfit font-medium">{res.date}</span>
          <span className="font-outfit text-xs text-muted-foreground">{res.time} • {res.experience}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "guests",
    header: "Party Size",
    cell: ({ row }) => {
      const res = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-outfit text-foreground">{res.guests} Guests</span>
          <span className="font-outfit text-xs text-muted-foreground">{res.seatingType}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "occasion",
    header: "Notes",
    cell: ({ row }) => {
      const res = row.original;
      if (!res.occasion && !res.specialRequest) return <span className="text-muted-foreground text-xs italic">None</span>;
      return (
        <div className="flex flex-col gap-1 max-w-[150px]">
          {res.occasion && <Badge variant="secondary" className="w-fit text-[10px] px-1.5 py-0">{res.occasion}</Badge>}
          {res.specialRequest && <span className="font-outfit text-xs truncate text-muted-foreground" title={res.specialRequest}>{res.specialRequest}</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let variant = "default";
      let className = "font-outfit text-xs";
      
      if (status === "Confirmed") className += " bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20";
      else if (status === "Cancelled") className += " bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20";
      else if (status === "Pending") className += " bg-amber-500/10 text-amber-600 border-amber-200 hover:bg-amber-500/20";

      return <Badge variant="outline" className={className}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const res = row.original;
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(res.id)}>
              Copy Ref ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Reservation</DropdownMenuItem>
            {res.status !== "Cancelled" && (
              <DropdownMenuItem className="text-destructive focus:text-destructive">Cancel Booking</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ReservationsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col gap-6 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-playfair tracking-tight text-brand">Reservations</h2>
            <p className="text-muted-foreground font-outfit mt-1 text-sm">
              Manage incoming table bookings, lounge requests, and VIP lists.
            </p>
          </div>
          <Button variant="outline" size="sm" className="font-outfit border-border/60">
            <Download className="mr-2 h-4 w-4" />
            Export Schedule
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-4">
          <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2 text-brand">
              <CalendarCheck className="w-4 h-4" />
              <h3 className="font-outfit font-semibold text-sm">Today's Bookings</h3>
            </div>
            <p className="font-outfit text-2xl font-bold">24 <span className="text-xs font-normal text-muted-foreground">tables</span></p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2 text-emerald-600">
              <Users className="w-4 h-4" />
              <h3 className="font-outfit font-semibold text-sm">Total Guests Today</h3>
            </div>
            <p className="font-outfit text-2xl font-bold">86 <span className="text-xs font-normal text-muted-foreground">pax</span></p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2 text-amber-500">
              <Clock className="w-4 h-4" />
              <h3 className="font-outfit font-semibold text-sm">Pending Review</h3>
            </div>
            <p className="font-outfit text-2xl font-bold">5 <span className="text-xs font-normal text-muted-foreground">requires action</span></p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2 text-destructive">
              <XCircle className="w-4 h-4" />
              <h3 className="font-outfit font-semibold text-sm">Cancellations</h3>
            </div>
            <p className="font-outfit text-2xl font-bold">2 <span className="text-xs font-normal text-muted-foreground">today</span></p>
          </div>
        </div>

        <DataTable columns={columns} data={reservations} searchKey="fullName" searchPlaceholder="Search by guest name..." />
      </div>
    </DashboardLayout>
  );
}