"use client";
import React from "react";

interface RightBarProps {
  children: React.ReactNode;
}

const RightBar: React.FC<RightBarProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center px-4 py-6 w-20 gap-6 bg-black/50">
      {children}
    </div>
  );
};

export default RightBar;
