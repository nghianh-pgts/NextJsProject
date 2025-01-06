import LoginForm from "@/app/login/login-form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import React from "react";

const Login = () => {
  return (
    <div>
      <h1 className="text-center">Đăng nhập</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
