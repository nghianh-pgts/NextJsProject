import productAPIRequest from "@/apiRequests/product";
import React from "react";

const EditProduct = async ({ params }: { params: { id: string } }) => {
  let product = null;
  try {
    const { payload } = await productAPIRequest.getDetail(params.id);
    product = payload.data;
    console.log(product);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {!product && <h2>không tìm thấy sản phẩm</h2>}
      {product && <h2>{product.name}</h2>}
    </div>
  );
};

export default EditProduct;
