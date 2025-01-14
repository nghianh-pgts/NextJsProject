"use client";
//dùng client component vì ở đây dùng hook useForm của react-hook-form

import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod"; //thư viện giúp validate
import { zodResolver } from "@hookform/resolvers/zod"; //Kết hợp zod với react-hook-form để tích hợp validate schema trong biểu mẫu.
import { useForm } from "react-hook-form"; //lấy ra từ react-hook-form
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import envConfig from "../../../config";
import { useToast } from "@/hooks/use-toast";
import http, { ClientSessionToken } from "@/lib/http";
import { LoginBodyType, loginSchema } from "@/schemaValidations/authSchema";
import authApiRequest from "@/apiRequests/auth";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timeoutId); // Xóa bộ hẹn giờ trước đó
    timeoutId = setTimeout(() => {
      func(...args); // Gọi hàm sau khi hết thời gian trì hoãn
    }, delay);
  };
}

const LoginForm = () => {
  //console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
  // 1. Define your form.

  console.log("re-render");
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  //dùng use callback để ghi nhớ hàm debounce khi gọi, tránh tạo mới 1 hàm debounce mỗi lần click
  const onSubmit = useCallback(
    debounce(async (values: LoginBodyType) => {
      try {
        const result = await authApiRequest.login(values);
        toast({
          title: "success",
          description: "Đăng nhập thành công",
        });

        console.log(result);

        const token = await authApiRequest.auth2({
          sessionToken: result.payload.data.token,
        });
        console.log("token", token);
        // setSessionToken(result.payload.data.token);
        ClientSessionToken.value = result.payload.data.token;
        router.push("/me");
      } catch (error: any) {
        handleErrorApi({ error, setError: form.setError, duration: 5000 });
      } finally {
        router.refresh();
      }
      console.log("Gọi lại hàm onsubmit");
    }, 300), //delay sau 300ms
    []
  );

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 max-w-md mx-auto"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="nhập mật khẩu"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mx-auto block w-full mt-12">
            Đăng nhập
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
