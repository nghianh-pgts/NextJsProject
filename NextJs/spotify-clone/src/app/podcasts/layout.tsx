import AlbumBar from "@/app/components/ui/AlbumBar";
import CategoryBar from "@/app/components/ui/CategoryBar";
import React from "react";

const PodCastLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CategoryBar />
      <AlbumBar />
      <main>{children}</main>
    </div>
  );
};

export default PodCastLayout;
