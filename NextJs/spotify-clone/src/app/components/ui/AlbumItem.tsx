"use client";
import Image from "next/image";
import React from "react";

interface AlbumItemProps {
  image: string;
  //   href: string;
  label: string;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ image, label }) => {
  return (
    <div className="flex w-[calc(50%-0.5rem)] md:w-[calc(25%-0.5rem)] bg-neutral-800 bg-transparent rounded-lg hover:cursor-pointer hover:bg-slate-700 transition">
      <Image
        src={image}
        width={50}
        height={50}
        alt="anh"
        className="rounded-l-lg"
      />
      <p className="px-1 py-2 font-semibold text-xs text-white flex-1 truncate">
        {label}
      </p>
    </div>
  );
};

export default AlbumItem;
