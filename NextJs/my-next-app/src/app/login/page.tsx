import LoginForm from "@/app/login/login-form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "được tạo bởi Hữu Nghĩa",
};

const Login = ({ params }: { params: any }) => {
  console.log("param: ", params);
  return (
    <div>
      <h1 className="text-center">Đăng nhập</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
