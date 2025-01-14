import RegisterForm from "@/app/register/register-form";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "được tạo bởi Hữu Nghĩa",
};

const RegisterPage = () => {
  return (
    <>
      <h1 className="text-center">Đăng ký</h1>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
