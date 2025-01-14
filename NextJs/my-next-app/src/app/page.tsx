import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ | Productics",
  description: "được tạo bởi Hữu Nghĩa",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Click me</Button>
    </main>
  );
}
