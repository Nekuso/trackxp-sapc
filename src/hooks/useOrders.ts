import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useOrders: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [ordersData, setOrdersData] = useState<any>([]);
  const [currentOrderData, setCurrentOrderData] = useState<any>([]);

  const createOrder = async (props: any, duration?: any) => {
    const result = await supabase.from("orders").insert({
      name: props.name,
      description: props.description,
      image_url: props.image_url,
      total: props.total,
      inventory_id: props.inventory_id,
      status: props.status,
      payment_method: props.payment_method,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getOrders = async () => {
    const result = await supabase.from("orders").select(`
        id,
        customer_first_name,
        customer_last_name,
        customer_contact_number,
        customer_email,
        employees(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          )
        ),
        inventory(
          id,
          branches(
            id,
            branch_name,
            branch_location
          )
        ),
        purchase_products(
          id,
          product_id,
          name,
          description,
          image_url,
          price,
          quantity,
          uom_name
        ),
        purchase_parts(
          id,
          part_id,
          name,
          description,
          image_url,
          price,
          quantity,
          brand
        ),
        total_price,
        status,
        payment_method,
        created_at
    `);

    const { data, error } = result;
    console.log(result);
    if (error) {
      return error;
    }
    return setOrdersData(data);
  };
  const getOrder = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        customer_first_name,
        customer_last_name,
        customer_contact_number,
        customer_email,
        employees(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email
        ),
        inventory(
          id,
          branches(
            id,
            branch_name,
            branch_location
          )
        ),
        purchase_products(
          id,
          product_id,
          name,
          description,
          image_url,
          price,
          quantity,
          uom_name
        ),
        purchase_parts(
          id,
          part_id,
          name,
          description,
          image_url,
          price,
          quantity,
          brand
        ),
        total_price,
        status,
        payment_method,
        created_at
      `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentOrderData(data);
  };
  const updateOrder = async (props: any, duration?: number) => {
    const result = await supabase
      .from("orders")
      .update({
        name: props.name,
        description: props.description,
        image_url: props.image_url,
        barcode: props.barcode,
        uom_id: props.uom_id,
        stock_quantity: props.stock_quantity,
        price: props.price,
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
  const updateOrderStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("orders")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteOrder = async (props: any, duration: number = 2000) => {
    const result = await supabase.from("orders").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    ordersData,
    currentOrderData,

    // methods
    createOrder,
    getOrder,
    getOrders,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
  };
};
