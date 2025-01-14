import accountApiRequest from "@/apiRequests/account";
import ButtonLogout from "@/components/ui/button-logout";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  let user = null;
  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken);
    user = data.payload.data;
  }

  console.log(user);

  return (
    <div className="flex justify-between items-center p-4">
      <ul className="flex space-x-3">
        {user ? (
          <>
            <li>Xin chào {user.name}</li>

            <li>
              <ButtonLogout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Đăng nhập</Link>
            </li>

            <li>
              <Link href="/register">Đăng ký</Link>
            </li>
          </>
        )}

        <li>
          <Link href="/products">Danh sách sản phẩm</Link>
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
};

export default Header;
