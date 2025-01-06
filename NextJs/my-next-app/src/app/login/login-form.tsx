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
const loginSchema = z
  .object({
    email: z.string().email({ message: "email không hợp lệ" }),
    password: z
      .string()
      .min(6, { message: "mật khẩu tối thiểu 6 kí tự" })
      .max(100, { message: "mật khẩu tối đa 100 kí tự" }),
  })
  .strict(); //strict() để đảm bảo rằng dữ liệu không chứa các trường không được định nghĩa trong schema.;

type FormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
  // 1. Define your form.
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormValues) {
    try {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };

        if (!res.ok) {
          throw data;
        }

        return data;
      });

      console.log(result);
    } catch (error: any) {

      const errors = (error as any).payload.errors as {
        field: string;
        message: string;
      }[]
      const status = error.status as number;

      if (status === 400) {
        for (const error of errors) {
          form.setError(error.field as 'email'| 'password' , {
            type: "server",
            message: error.message,
          });
        }
      } else {
        console.error(error);
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
