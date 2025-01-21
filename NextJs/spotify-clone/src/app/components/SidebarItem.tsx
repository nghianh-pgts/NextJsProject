"use client";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex h-auto items-center w-full gap-x-4 text-neutral-400 font-medium cursor-pointer transition hover:text-white py-1 relative`,
        active && "text-white"
      )}
    >
      <div
        className={twMerge(
          `hidden absolute top-0 bottom-0 h-full w-2 rounded-[2px] bg-emerald-500 trasition ease-in-out -left-5`,
          active && "block"
        )}
      ></div>
      <Icon />
      <p className="hidden md:block truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
