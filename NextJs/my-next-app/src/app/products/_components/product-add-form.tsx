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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateProductBody,
  CreateProductBodyType,
} from "@/schemaValidations/product.schema";
import productAPIRequest from "@/apiRequests/product";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

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

const ProductAddForm = () => {
  //console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
  // 1. Define your form.

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
    },
  });

  console.log(form);

  const { toast } = useToast();
  const router = useRouter();
  const { control, handleSubmit, setValue } = useForm();

  const [file, setFile] = useState<File | null>(null);
  //dùng use callback để ghi nhớ hàm debounce khi gọi, tránh tạo mới 1 hàm debounce mỗi lần click
  const onSubmit = useCallback(
    debounce(async (values: CreateProductBodyType) => {
      try {
        const formData = new FormData();
        formData.append("file", file as Blob);
        const uploadImageResult = await productAPIRequest.uploadImage(formData); //up load ảnh lên server

        const imageUrl = uploadImageResult.payload.data;

        const result = await productAPIRequest.create({
          ...values,
          image: imageUrl,
        });
        if (result) {
          toast({
            title: "success",
            description: "Thêm sản phẩm thành công",
          });
        }

        console.log(result);

        router.push("/products");
      } catch (error: any) {
        handleErrorApi({ error, setError: form.setError, duration: 5000 });
      }
      console.log("Gọi lại hàm onsubmit");
    }, 300), //delay sau 300ms
    []
  );

  const handleFileRemove = (field: any) => {
    setFile(null);
    // field.onChange(null);
    setValue("file", null);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.log(error);
            console.log("image", form.getValues("image"));
          })}
          className="space-y-2 max-w-md mx-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên sản phẩm</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="nhập giá" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea placeholder="nhập mô tả" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFile(file);
                        //setValue("file", file);
                        field.onChange(`http://localhost:3000/${file.name}`);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {file && (
            <div>
              <Image
                src={URL.createObjectURL(file)} //Chuyển file ảnh sang object URL
                width={128}
                height={128}
                alt="preview"
                className="w-32 h-32 object-cover"
              />
              <Button
                variant={"destructive"}
                size={"sm"}
                onClick={handleFileRemove}
              >
                Xóa hình ảnh
              </Button>
            </div>
          )}

          <Button type="submit" className="mx-auto block w-full mt-12">
            Thêm sản phẩm
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductAddForm;
