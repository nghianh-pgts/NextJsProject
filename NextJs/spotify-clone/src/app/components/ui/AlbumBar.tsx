import AlbumItem from "@/app/components/ui/AlbumItem";
import React from "react";

const Albums = [
  {
    image:
      "https://variety.com/wp-content/uploads/2020/06/unnamed-1-2-e1593560403821.jpg",
    title: "Lana Del Rey",
  },
  {
    image:
      "https://variety.com/wp-content/uploads/2020/06/unnamed-1-2-e1593560403821.jpg",
    title: "Bài hát đã thích",
  },
  {
    image:
      "https://variety.com/wp-content/uploads/2020/06/unnamed-1-2-e1593560403821.jpg",
    title: "Imagine Dragons",
  },
  {
    image:
      "https://variety.com/wp-content/uploads/2020/06/unnamed-1-2-e1593560403821.jpg",
    title: "The Weekend",
  },
  {
    image:
      "https://variety.com/wp-content/uploads/2020/06/unnamed-1-2-e1593560403821.jpg",
    title: "This is Lana Dey Rey",
  },
  {
    image:
      "https://variety.com/wp-content/uploads/2020/06/unnamed-1-2-e1593560403821.jpg",
    title: "Sleeping Music 2025",
  },
  {
    image:
      "https://variety.com/wp-content/uploads/2020/06/unnamed-1-2-e1593560403821.jpg",
    title: "daylist- soul crushing hot girl walk tuesday",
  },
  {
    image:
      "https://variety.com/wp-content/uploads/2020/06/unnamed-1-2-e1593560403821.jpg",
    title: "This Is Ariana Grande",
  },
];

const AlbumBar = () => {
  return (
    <div className="flex p-8  flex-wrap gap-2">
      {Albums.map((item) => (
        <AlbumItem key={item.title} image={item.image} label={item.title} />
      ))}
    </div>
  );
};

export default AlbumBar;
