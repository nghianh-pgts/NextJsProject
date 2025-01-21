"use client";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface CategoryItemProps {
  label: string;
  href: string;
  active?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ label, href, active }) => {
  return (
    <Link
      href={href}
      className={twMerge(
        ` px-3 py-1 text-center text-white text-xs rounded-xl `,
        active && "bg-white text-black"
      )}
    >
      {label}
    </Link>
  );
};

export default CategoryItem;
