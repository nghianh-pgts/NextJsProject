import { z } from "zod";

//Sử dụng z.object từ zod để định nghĩa schema cho dữ liệu của form.
export const RegisterSchema = z
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

export type RegisterType = z.infer<typeof RegisterSchema>;

//Sử dụng z.object từ zod để định nghĩa schema cho dữ liệu của form.
export const loginSchema = z
  .object({
    email: z.string().email({ message: "email không hợp lệ" }),
    password: z
      .string()
      .min(6, { message: "mật khẩu tối thiểu 6 kí tự" })
      .max(100, { message: "mật khẩu tối đa 100 kí tự" }),
  })
  .strict(); //strict() để đảm bảo rằng dữ liệu không chứa các trường không được định nghĩa trong schema.;

export type LoginBodyType = z.infer<typeof loginSchema>;

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
