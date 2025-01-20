import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `w-full rounded-md bg-emerald-500 px-3 py-3 disabled:cursor-not-allowed border disabled:opacity-50 font-bold text-black hover:opacity-75`,
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button"; // Đặt displayName cho component

export default Button;
