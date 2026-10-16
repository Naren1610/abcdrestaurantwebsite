"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSettings } from "@/hooks/use-settings";
import CartPill from "./CartPill";
import CartDrawer from "./CartDrawer";

function CartContainerInner() {
  const { data: settings } = useSettings();
  const isOnlineOrderingEnabled = settings?.is_online_ordering_enabled ?? false;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const shouldBeOpen = searchParams.get("cart") === "open";
  const [prevShouldBeOpen, setPrevShouldBeOpen] = useState(shouldBeOpen);
  const [isDrawerOpen, setIsDrawerOpen] = useState(shouldBeOpen);

  if (shouldBeOpen !== prevShouldBeOpen) {
    setPrevShouldBeOpen(shouldBeOpen);
    setIsDrawerOpen(shouldBeOpen);
  }

  const handleOpen = () => {
    setIsDrawerOpen(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("cart", "open");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("cart");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // If online ordering is paused, suppress both the floating pill and drawer
  if (!isOnlineOrderingEnabled) {
    return null;
  }

  return (
    <>
      <CartPill onClick={handleOpen} />
      <CartDrawer isOpen={isDrawerOpen} onClose={handleClose} />
    </>
  );
}

export default function CartContainer() {
  return (
    <Suspense fallback={null}>
      <CartContainerInner />
    </Suspense>
  );
}
