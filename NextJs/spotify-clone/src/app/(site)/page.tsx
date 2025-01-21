import AlbumBar from "@/app/components/ui/AlbumBar";
import CategoryBar from "@/app/components/ui/CategoryBar";
import Suggestion from "@/app/components/ui/Suggestion";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <CategoryBar />
      <AlbumBar />
      <Suggestion title="Dành Cho Bạn" />
    </div>
  );
};

export default Home;
