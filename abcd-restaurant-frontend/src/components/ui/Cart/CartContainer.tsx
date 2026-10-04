"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CartPill from "./CartPill";
import CartDrawer from "./CartDrawer";

function CartContainerInner() {
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
