"use client";
import authApiRequest from "@/apiRequests/auth";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonLogout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await authApiRequest.logoutFromNextClientToNextServer();
      console.log("Logout response:", response);
      router.push("/login");
    } catch (error) {
      handleErrorApi({ error });
    } finally {
      router.refresh();
    }
  };

  return (
    <Button size={"sm"} onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
};

export default ButtonLogout;
