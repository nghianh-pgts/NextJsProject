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

//Sử dụng z.object từ zod để định nghĩa schema cho dữ liệu của form.
const formSchema = z
  .object({
    /**
     * Trường username:
        z.string(): Xác định đây là một chuỗi.
        min(2): Đảm bảo chuỗi có độ dài tối thiểu là 2 ký tự.
        max(50): Đảm bảo chuỗi có độ dài tối đa là 50 ký tự.
     */
    name: z
      .string()
      .min(5, { message: "tên phải tối thiểu 5 kí tự" })
      .max(50, { message: "tên tối đa là 50 kí tự" }),
    email: z.string().email({ message: "email không hợp lệ" }),
    password: z
      .string()
      .min(6, { message: "mật khẩu tối thiểu 6 kí tự" })
      .max(100, { message: "mật khẩu tối đa 100 kí tự" }),
    confirmPassword: z
      .string()
      .min(6, { message: "mật khẩu tối thiểu 6 kí tự" })
      .max(100, { message: "mật khẩu tối đa 100 kí tự" }),
  })
  .strict() //strict() để đảm bảo rằng dữ liệu không chứa các trường không được định nghĩa trong schema.
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      return ctx.addIssue({
        code: "custom",
        message: "mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
  // 1. Define your form.
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormValues) {
    const result = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
      {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    ).then((res) => res.json());

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
