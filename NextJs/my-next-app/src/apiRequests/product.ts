import http from "@/lib/http";
import { MessageResType } from "@/schemaValidations/commonSchema";
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
} from "@/schemaValidations/product.schema";

export const productAPIRequest = {
  getList: () => {
    try {
      const response = http.get<ProductListResType>("/products", {
        cache: "no-store",
      });
      return response;
    } catch (error) {
      console.error("Error fetching product list:", error);
      throw error;
    }
  },
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>("/products", body),
  getDetail: (id: string) =>
    http.get<ProductResType>(`/products/${id}`, {
      cache: "no-store",
    }),

  delete: (id: number) => http.delete<MessageResType>(`/products/${id}`),
  uploadImage: (body: FormData) =>
    http.post<{
      message: string;
      data: string;
    }>("/media/upload", body),
};
export default productAPIRequest;
