"use client";
import { Button } from "@/components/ui/button";
import { ProductResType } from "@/schemaValidations/product.schema";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import productAPIRequest from "@/apiRequests/product";
import { toast, useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const DeleteProduct = ({ product }: { product: ProductResType["data"] }) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleDeleteProduct = async () => {
    console.log(product);
    try {
      const result = await productAPIRequest.delete(product.id);
      if (result) {
        toast({
          title: "success",
          description: result.payload.message,
        });
        router.refresh();
        // router.push("/products");
      }
    } catch (error) {}
  };

  const alertDelete = () => {
    // console.log(product);
  };

  return (
    <>
      {/* <AlertDialog>
        <AlertDialogTrigger>
          
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>xóa sản phẩm {product.name}</AlertDialogTitle>
            <AlertDialogDescription>
              hành động này sẽ xóa vĩnh viễn sản phẩm và không thể khôi phục
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      <Button
        className="ml-2"
        variant={"destructive"}
        onClick={handleDeleteProduct}
      >
        xóa
      </Button>
    </>
  );
};

export default DeleteProduct;
