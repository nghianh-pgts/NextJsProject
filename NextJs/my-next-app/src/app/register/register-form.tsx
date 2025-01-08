"use client";
//dùng client component vì ở đây dùng hook useForm của react-hook-form

import React, { useEffect, useState } from "react";
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
import { RegisterSchema, RegisterType } from "@/schemaValidations/authSchema";
import authApiRequest from "@/apiRequests/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
  // 1. Define your form.
  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterType) {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.register(values);
      toast({
        title: "success",
        description: "Đăng ký thành công",
      });

      console.log(result);

      router.push("/login");
    } catch (error: any) {
      // const errors = error.payload.errors as {
      //   message: string;
      //   field: string;
      // }[];

      // const status = error.status as number;
      // if (status === 422) {
      //   errors.forEach((error) => {
      //     form.setError(error.field as "email" | "password", {
      //       type: "server",
      //       message: error.message,
      //     });
      //   });
      // } else {
      //   toast({
      //     title: "Error: lỗi đăng ký",
      //     description: "Đã có lỗi xảy ra",
      //   });
      // }
      handleErrorApi({ error, setError: form.setError, duration: 5000 });
    } finally {
      setLoading(false);
    }

    const result = await authApiRequest.register(values);
    console.log(result);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mx-auto block w-full mt-12">
            Đăng ký
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
