import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <ul className="flex space-x-3">
        <li>
          <Link href="/login">Đăng nhập</Link>
        </li>

        <li>
          <Link href="/register">Đăng ký</Link>
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
};

export default Header;
