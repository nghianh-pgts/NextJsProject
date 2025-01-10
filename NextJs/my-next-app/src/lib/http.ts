import { headers } from "next/headers";
import envConfig from "../../config";
import { ok } from "assert";
import { LoginResType } from "@/schemaValidations/authSchema";
import { normalizePath } from "@/lib/utils";
import { promises } from "dns";
import { redirect } from "next/navigation";

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };

  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;

  constructor({ status, payload }: { status: 422; payload: any }) {
    super({ status, payload });

    if (status !== ENTITY_ERROR_STATUS) {
      throw new Error("EntityError must have status 422");
    }

    this.status = status;
    this.payload = payload;
  }
}

class SessionToken {
  private token = "";
  get value() {
    return this.token;
  }

  set value(token: string) {
    //Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === undefined) {
      throw new Error("Cannot set token on server side");
    }
    this.token = token;
  }
}

//object chỉ thực hiện ở client
export const ClientSessionToken = new SessionToken();

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let clientLogoutRequest = null;

  const body = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: ClientSessionToken.value
      ? `Bearer ${ClientSessionToken.value}`
      : "",
  };

  // Nếu không truyền baseURL hoặc baseUrl = undefined thì lấy từ envConfig (localhost:4000)
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc gọi API đến Next.js Server
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  //fetch
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });

  const payload: Response = await res.json();

  const data = {
    status: res.status,
    payload,
  };

  //Intercepter là nơi xử lí request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      //nếu là client component thì xử lí logic này
      if (typeof window !== "undefined") {
        if (!clientLogoutRequest) {
          clientLogoutRequest = await fetch("/api/auth/logout", {
            method: "POST",
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            },
          });
          await clientLogoutRequest;
          ClientSessionToken.value = ""; //set sessionToken = rỗng
          location.href = "/login"; //điều hướng về login
        }
      } else {
        //còn là server thì
        //lấy token từ headers
        const sessionTokenFromHeaders = (
          options?.headers as any
        )?.Authorization.split(" ")[1];
        redirect(`/logout?sessionToken=${sessionTokenFromHeaders}`);
      }
    } else {
      throw new HttpError(data);
    }
  }

  //Đảm bảo logic dưới đây chỉ chạy ở phía client (Browser)
  if (typeof window !== undefined) {
    if (
      ["auth/login"].some((item) => {
        item === normalizePath(url);
      })
    ) {
      ClientSessionToken.value = (payload as LoginResType).data.token;
    } else if ("auth/logout" === normalizePath(url)) {
      ClientSessionToken.value = "";
    }
  }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
