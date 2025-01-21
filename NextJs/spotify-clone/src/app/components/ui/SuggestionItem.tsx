import Image from "next/image";
import React from "react";

interface SuggestionProps {
  href: string;
  title: string;
}

const SuggestionItem: React.FC<SuggestionProps> = ({ href, title }) => {
  return (
    <div className="flex flex-col gap-2 px-2 py-4 w-[20%] relative">
      <Image
        src={href}
        width={100}
        height={70}
        alt=""
        className="w-full relative"
      />

      <p className="text-neutral-400 text-wrap text-xs truncate">{title}</p>
      <div className="absolute bottom-11 right-3 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-sm"></div>
    </div>
  );
};

export default SuggestionItem;
