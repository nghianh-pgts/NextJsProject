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
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/accountSchema";
import accountApiRequest from "@/apiRequests/account";

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

type profileType = AccountResType["data"];

const ProfileForm = ({ profile }: { profile: profileType }) => {
  // 1. Define your form.

  console.log(profile);

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name,
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = useCallback(
    debounce(async (values: UpdateMeBodyType) => {
      try {
        const result = await accountApiRequest.updateMe(values);
        toast({
          title: "success",
          description: "Cập nhật thông tin thành công",
        });
        router.refresh();

        console.log(result);
      } catch (error: any) {
        handleErrorApi({ error, setError: form.setError, duration: 5000 });
      }
      console.log("Gọi lại hàm onsubmit");
    }, 300), //delay sau 300ms
    [form, router, toast]
  );

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 max-w-md mx-auto"
        >
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="text" value={profile.email} readOnly />
          </FormControl>
          <FormMessage />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên mới</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="nhập tên mới" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mx-auto block w-full mt-12">
            Cập nhật
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
