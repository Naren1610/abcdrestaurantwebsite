"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/constants/navigation";

type NavLinkProps = {
  item: NavItem;
};

export default function NavLink({ item }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href === "/our-story" && pathname === "/about");

  return (
    <Link
      href={item.href}
      className={[
        "relative pb-1 text-[15px] font-medium font-outfit tracking-wide transition-colors duration-200",
        isActive
          ? "text-brand font-semibold"
          : "text-nav-text hover:text-brand",
      ].join(" ")}
    >
      {item.label}
      {isActive && (
        <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-brand" />
      )}
    </Link>
  );
}
