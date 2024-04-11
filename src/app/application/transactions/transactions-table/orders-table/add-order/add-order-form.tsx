import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useProducts } from "@/hooks/useProducts";
import { useSelector } from "react-redux";
import OrderCartOptions from "./add-order-table/lists";
import { useDispatch } from "react-redux";
import { resetCart } from "@/redux/slices/orderCartSlice";

export const orderSchema = z.object({
  customer_first_name: z.string().nullable(),
  customer_last_name: z.string().nullable(),
  customer_email: z.string().nullable(),
  customer_contact_number: z.coerce.number().nullable(),
  status: z.string(),
  inventory_id: z.coerce.number(),
  employee_id: z.coerce.number(),
  total_price: z.coerce.number(),
  purchase_products: z
    .array(
      z.object({
        product_id: z.coerce.number(),
        inventory_id: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        uom_name: z.string(),
        quantity: z.coerce.number(),
        price: z.coerce.number(),
      })
    )
    .nullable(),
  purchase_parts: z
    .array(
      z.object({
        part_id: z.coerce.number(),
        inventory_id: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        brand_name: z.string(),
        quantity: z.coerce.number(),
        price: z.coerce.number(),
      })
    )
    .nullable(),
});

export default function OrderForm({ setDialogOpen }: any) {
  const [isPending, startTransition] = useTransition();
  const { createProduct } = useProducts();
  const dispatch = useDispatch();

  const orderCart = useSelector((state: any) => state.orderCart);
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer_first_name: "",
      customer_last_name: "",
      customer_email: "",
      customer_contact_number: 0,
      status: "pending",
      inventory_id: 0,
      employee_id: 0,
      purchase_products: orderCart.productsCart,
      purchase_parts: orderCart.partsCart,
      total_price: 0,
    },
    values: {
      customer_first_name: null,
      customer_last_name: null,
      customer_email: null,
      customer_contact_number: null,
      status: "",
      inventory_id: 0,
      employee_id: 0,
      total_price: (
        orderCart.productsTotalPrice + orderCart.partsTotalPrice
      ).toFixed(2),
      purchase_products: orderCart.productsCart,
      purchase_parts: orderCart.partsCart,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      // const result = await createProduct(data, 5000);

      // const { error } = result;
      // if (error?.message) {
      //   toast({
      //     variant: "destructive",
      //     title: "⚠️Error",
      //     description: error.message,
      //   });
      //   return;
      // }
      // sonner("✨Success", {
      //   description: `Order Successful!`,
      // });
      toast({
        title: "✨Success",
        description: (
          <pre className="mt-2 w-[340px] max-h-[600px] rounded-md bg-slate-950 p-4 overflow-y-scroll">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });

      setDialogOpen(false);
      new Promise((resolve) => setTimeout(resolve, 1500)).then(() => {
        dispatch(resetCart());
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex justify-between gap-4">
          <div className="w-[60%] h-full rounded-lg overflow-hidden">
            <OrderCartOptions />
          </div>
          <div className="w-full h-full bg-darkBg rounded-lg">
            
          </div>
        </div>

        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Create Order</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
