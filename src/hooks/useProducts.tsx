import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export const useProducts: any = () => {
  const [productsData, setProductsData] = useState<any>([]);
  const [currentProductData, setCurrentProductData] = useState<any>([]);

  const createProduct = async (props: any, duration?: any) => {
    const result = await supabase.from("products").insert({
      name: props.name,
      description: props.description,
      image_url: props.image_url,
      stock_quantity: props.stock_quantity,
      uom: props.uom,
      price: props.price,
      barcode: props.barcode,
      status: props.status,
    });

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, duration));

    return data;
  };
  const getProducts = async () => {
    const result = await supabase.from("products").select(`
        id,
        name,
        description,
        image_url,
        stock_quantity,
        uoms(
            id,
            unit_name
        ),
        price,
        barcode,
        status,
        inventory(
            id,
            branches(
                id,
                branch_name,
                branch_location
            )
        ),
        created_at
    `);

    const { data, error } = result;
    if (error) {
      return error;
    }
    console.log(data);
    return setProductsData(data);
  };
  const getProduct = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id,
        name,
        description,
        image_url,
        stock_quantity,
        uoms(
            id,
            unit_name
        ),
        price,
        barcode,
        status,
        inventory(
            id,
            branches(
                id,
                branch_name,
                branch_location
            )
        ),
        created_at
      `
      )
      .eq("id", id);
    if (error) return error;
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentProductData(data);
  };
  const updateProducts = async (props: any, duration?: number) => {
    const result = await supabase
      .from("products")
      .update({
        name: props.name,
        description: props.description,
        image_url: props.image_url,
        stock_quantity: props.stock_quantity,
        uom: props.uom,
        price: props.price,
        barcode: props.barcode,
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const updateProductStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("products")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteProduct = async (props: any, duration?: number) => {
    const result = await supabase.from("products").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    productsData,
    currentProductData,

    // methods
    createProduct,
    getProduct,
    getProducts,
    updateProducts,
    updateProductStatus,
    deleteProduct,
  };
};
