import productAPIRequest from "@/apiRequests/product";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteProduct from "@/app/products/_components/delete-product";

const ProductList = async () => {
  const { payload } = await productAPIRequest.getList();
  const productList = payload.data;
  console.log("listtttttt", productList);

  return (
    <div>
      <Button className="mb-2">
        <Link href={"/products/add"}>Thêm sản phẩm</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Hình ảnh</TableHead>
            <TableHead>Thời gian tạo</TableHead>
            <TableHead>Thời gian cập nhật</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productList.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <img src={product.image} alt="" width={50} height={50} />
              </TableCell>
              <TableCell>{new Date(product.createdAt).toISOString()}</TableCell>
              <TableCell>
                {new Date(product.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button variant={"default"}>
                  <Link href={`/products/${product.id}`}>Sửa</Link>
                </Button>
                <DeleteProduct product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;
