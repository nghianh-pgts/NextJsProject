"use client";

import authApiRequest from "@/apiRequests/auth";
import { ClientSessionToken } from "@/lib/http";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionTokenFromParam = searchParams.get("sessionToken"); //Lấy token từ URL
  useEffect(() => {
    console.log(sessionTokenFromParam);
    if (sessionTokenFromParam !== ClientSessionToken.value) {
      authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirectFrom=${pathname}`);
        console.log("điều hướng về login khi sai token");
      });
    }
  }, [sessionTokenFromParam, router, pathname]);

  return <div>Logout</div>;
};

export default Logout;
