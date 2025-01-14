import productAPIRequest from "@/apiRequests/product";
import Image from "next/image";
import React from "react";

const EditProduct = async ({ params }: { params: { id: string } }) => {
  console.log("params: ", params);
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
      {product && (
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={180}
            height={180}
          />
          <h3>{product.name}</h3>
          <div>{product.price}</div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
