import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterResType,
  RegisterType,
} from "@/schemaValidations/authSchema";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("auth/login", body),
  register: (body: RegisterType) =>
    http.post<RegisterResType>("auth/login", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
};

export default authApiRequest;
