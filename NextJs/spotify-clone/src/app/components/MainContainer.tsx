"use client";
import Box from "@/app/components/Box";
import Button from "@/app/components/Button";
import RightBar from "@/app/components/RightBar";
import SidebarItem from "@/app/components/SidebarItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { BsMusicNoteList } from "react-icons/bs";
import {
  FaHeart,
  FaHome,
  FaMusic,
  FaSearch,
  FaSpotify,
  FaUsers,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { GiImperialCrown } from "react-icons/gi";
import { twMerge } from "tailwind-merge";

interface MainConTainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainConTainerProps> = ({ children }) => {
  const pathName = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: FaHome,
        label: "Home",
        active: pathName === "/",
        href: "/",
      },
      {
        icon: FaSearch,
        label: "Search",
        active: pathName === "/search",
        href: "/search",
      },
      {
        icon: FaHeart,
        label: "Favorites",
        active: pathName === "/favorites",
        href: "/favorites",
      },
    ],
    [pathName]
  );

  return (
    <div className={twMerge(`flex h-full`, "")}>
      <div className="flex h-full flex-col backdrop-blur-sm bg-black/50">
        <div className="w-full flex items-center gap-3 px-4 py-6">
          <FaSpotify className="text-4xl text-emerald-500" />
          <p className="hidden md:block text-xl font-semibold">Spotify</p>
        </div>

        {/* routes */}
        <div className="hidden md:flex flex-col gap-2 w-[300px] h-full">
          <Box>
            <div className="flex flex-col gap-y-4 py-4 px-4">
              {routes.map((item) => (
                <SidebarItem key={item.label} {...item} />
              ))}
            </div>
          </Box>
        </div>

        <div className="flex md:hidden transition flex-col items-center justify-center">
          <Box>
            <div className="flex flex-col gap-y-4 px-4 py-4">
              {routes.map((item) => (
                <SidebarItem key={item.label} {...item} />
              ))}
            </div>
          </Box>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto py-6">{children}</main>
      <RightBar>
        <div className="w-12 h-12 rounded-full bg-neutral-600 cursor-pointer flex items-center relative"></div>
        <Button>
          <FaUser size={20} className="text-black" />
        </Button>
        <Link
          href={"/artist"}
          className="bg-transparent placeholder-zinc-200 py-2"
        >
          <FaUsers />
        </Link>

        <Link
          href={"/artist"}
          className="bg-transparent placeholder-zinc-200 py-2"
        >
          <BsMusicNoteList />
        </Link>

        <div className="flex flex-col items-center justify-center gap-y-2 mt-auto relative">
          <GiImperialCrown size={24} className="text-white" />
          <p className="whitespace-nowrap text-neutral-400 flex gap-1 cursor-pointer">
            Go <span>Pro</span>
          </p>
        </div>
      </RightBar>
    </div>
  );
};

export default MainContainer;
