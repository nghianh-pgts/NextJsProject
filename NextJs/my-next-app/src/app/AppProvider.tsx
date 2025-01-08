"use client";
import { ClientSessionToken } from "@/lib/http";
import { createContext, useLayoutEffect, useState } from "react";

const AppContext = createContext({});

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  useLayoutEffect(() => {
    if (typeof window !== undefined) {
      ClientSessionToken.value = initialSessionToken;
    }
  }, [initialSessionToken]);

  return <>{children}</>;
}
