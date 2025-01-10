import ProductAddForm from "@/app/products/_components/product-add-form";
import React from "react";

const ProductList = () => {
  return (
    <div>
      <h1 className="mx-auto text-center">Thêm sản phẩm</h1>
      <ProductAddForm />
    </div>
  );
};

export default ProductList;
