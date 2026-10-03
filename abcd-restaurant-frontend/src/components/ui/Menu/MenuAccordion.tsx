"use client";

import { useState, useEffect } from "react";
import { menuData } from "@/constants/menuData";
import MenuSection from "./MenuSection";
import MenuItemCard from "./MenuItemCard";

function getHashId(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace("#", "").trim();
  return hash || null;
}

export default function MenuAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const validIds = new Set(menuData.map((c) => c.id));

    const syncToHash = () => {
      const id = getHashId();
      if (id && validIds.has(id)) setOpenId(id);
    };

    syncToHash();
    window.addEventListener("hashchange", syncToHash);
    return () => window.removeEventListener("hashchange", syncToHash);
  }, []);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {menuData.map((category) => (
        <MenuSection
          key={category.id}
          id={category.id}
          subtitle={category.subtitle}
          title={category.title}
          isOpen={openId === category.id}
          onToggle={() => handleToggle(category.id)}
        >
          {category.items.map((item, index) => (
            <MenuItemCard
              key={`${category.id}-${item.id}-${index}`}
              item={item}
            />
          ))}
        </MenuSection>
      ))}
    </>
  );
}
