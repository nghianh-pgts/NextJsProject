import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterResType,
  RegisterType,
} from "@/schemaValidations/authSchema";
import { MessageResType } from "@/schemaValidations/commonSchema";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>("auth/login", body),
  register: (body: RegisterType) =>
    http.post<RegisterResType>("auth/register", body),
  auth2: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),

  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),

  logoutFromNextClientToNextServer: () => {
    http.post<MessageResType>(
      "/api/auth/logout",
      {},
      {
        baseUrl: "",
      }
    );
  },
};

export default authApiRequest;
