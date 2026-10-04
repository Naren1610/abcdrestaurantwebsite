"use client";

import { useState, useEffect } from "react";
import MenuSection from "./MenuSection";
import MenuItemCard from "./MenuItemCard";
import { useClientMenu } from "@/hooks/use-menu";
import MenuSkeleton from "./MenuSkeleton";
import type { MenuItem, DietaryTag } from "@/types/menu";

function getHashId(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace("#", "").trim();
  return hash || null;
}

export default function MenuAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { data: menuData, isLoading, isError } = useClientMenu();

  useEffect(() => {
    if (!menuData) return;
    
    const validIds = new Set(menuData.map((c) => c.id));

    const syncToHash = () => {
      const id = getHashId();
      if (id && validIds.has(id)) setOpenId(id);
    };

    syncToHash();
    window.addEventListener("hashchange", syncToHash);
    return () => window.removeEventListener("hashchange", syncToHash);
  }, [menuData]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return <MenuSkeleton />;
  }

  if (isError || !menuData) {
    return (
      <div className="flex justify-center items-center py-20 w-full">
        <p className="text-red-500 font-outfit text-lg">Failed to load the menu. Please try again later.</p>
      </div>
    );
  }

  if (menuData.length === 0) {
    return (
      <div className="flex justify-center items-center py-20 w-full">
        <p className="text-brand/60 font-outfit text-lg">Our menu is currently being updated. Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      {menuData.map((category) => (
        <MenuSection
          key={category.id}
          id={category.id}
          subtitle={category.subtitle || "Menu"}
          title={category.title}
          isOpen={openId === category.id}
          onToggle={() => handleToggle(category.id)}
        >
          {category.items.map((item, index) => {
            const mappedItem: MenuItem = {
              id: item.id,
              name: item.name,
              description: item.description || "",
              price: item.price,
              image: item.image || undefined,
              tags: item.tags as DietaryTag[],
              isChefPick: item.isChefPick
            };
            return (
              <MenuItemCard
                key={`${category.id}-${item.id}-${index}`}
                item={mappedItem}
              />
            );
          })}
        </MenuSection>
      ))}
    </>
  );
}
