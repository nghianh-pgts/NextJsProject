"use client";
import CategoryItem from "@/app/components/ui/CategoryItem";
import { usePathname } from "next/navigation";
import React from "react";

const CategoryBar = () => {
  const pathname = usePathname();
  const categories = [
    {
      label: "Tất cả",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Âm nhạc",
      href: "/music",
      active: pathname === "/music",
    },
    {
      label: "Podcasts",
      href: "/podcasts",
      active: pathname === "/podcasts",
    },
  ];
  return (
    <div className="flex  gap-2 py-4 items-center relative  bg-opacity-60 top-0 right-0 left-0   p-8">
      {categories.map((item) => (
        <CategoryItem
          key={item.label}
          href={item.href}
          label={item.label}
          active={item.active}
        />
      ))}
    </div>
  );
};

export default CategoryBar;
