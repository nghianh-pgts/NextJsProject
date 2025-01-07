"use client";
//dùng client component vì ở đây dùng hook useForm của react-hook-form

import React, { useEffect } from "react";
import { z } from "zod"; //thư viện giúp validate
import { zodResolver } from "@hookform/resolvers/zod"; //Kết hợp zod với react-hook-form để tích hợp validate schema trong biểu mẫu.
import { useForm } from "react-hook-form"; //lấy ra từ react-hook-form
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import envConfig from "../../../config";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/app/AppProvider";
import http from "@/lib/http";
import { LoginBodyType, loginSchema } from "@/schemaValidations/authSchema";
import authApiRequest from "@/apiRequests/auth";

const LoginForm = () => {
  //console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
  // 1. Define your form.
  console.log("re-render");
  const { setSessionToken } = useAppContext();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await authApiRequest.login(values);
      toast({
        title: "success",
        description: "Đăng nhập thành công",
      });

      // const resultFromNextServer = await fetch("/api/auth", {
      //   method: "POST",
      //   body: JSON.stringify(result),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }).then(async (res) => {
      //   const payload = await res.json();
      //   const data = {
      //     status: res.status,
      //     payload,
      //   };

      //   if (!res.ok) {
      //     throw data;
      //   }
      //   return data;
      // });
      await authApiRequest.auth({ sessionToken: result.payload.data.token });

      // console.log(resultFromNextServer);
      setSessionToken(result.payload.data.token);
    } catch (error: any) {
      const errors = error.payload.errors as {
        message: string;
        field: string;
      }[];

      const status = error.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as "email" | "password", {
            type: "server",
            message: error.message,
          });
        });
      } else {
        toast({
          title: "Error: lỗi đăng nhập",
          description: "Đã có lỗi xảy ra",
        });
      }
    }
  }

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
