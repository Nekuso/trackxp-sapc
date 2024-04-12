import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import BranchInput from "./branch-input";
import PaymentInput from "./payment-input";
import StatusInput from "./status-input";

import { DataTable as ProductsCart } from "./add-order-cart/products-cart/data-table";
import { DataTable as PartsCart } from "./add-order-cart/parts-cart/data-table";

import { initiateColumns as initiateProductsCartColumns } from "./add-order-cart/products-cart/columns";
import { initiateColumns as initiatePartsCartColumns } from "./add-order-cart/parts-cart/columns";

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
import { useEffect, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useProducts } from "@/hooks/useProducts";
import { useSelector } from "react-redux";
import OrderCartOptions from "./add-order-table/lists";
import { useDispatch } from "react-redux";
import { resetCart } from "@/redux/slices/orderCartSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export const orderSchema = z.object({
  customer_first_name: z.string().nullable(),
  customer_last_name: z.string().nullable(),
  customer_email: z.string().nullable(),
  customer_contact_number: z.coerce.number().nullable(),
  status: z.string(),
  payment_method: z.string(),
  inventory_id: z
    .string()
    .min(1, { message: "Branch is required" })
    .transform((arg) => new Number(arg)),
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
  const orderCartOptions = useSelector(
    (state: any) => state.orderCartOptionSlice
  );
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer_first_name: "",
      customer_last_name: "",
      customer_email: "",
      customer_contact_number: 0,
      employee_id: 0,
      total_price: 0,
    },
  });

  useEffect(() => {
    form.setValue("purchase_products", orderCart.productsCart);
    form.setValue("purchase_parts", orderCart.partsCart);
    form.setValue(
      "total_price",
      (
        orderCart.productsCart.reduce(
          (acc: any, product: any) => acc + product.price * product.quantity,
          0
        ) +
        orderCart.partsCart.reduce(
          (acc: any, part: any) => acc + part.price * part.quantity,
          0
        )
      ).toFixed(2)
    );
  }, [orderCart.productsCart, orderCart.partsCart, form]);

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
          <div className="w-[60%] 2xl:w-[50%] h-full rounded-lg overflow-hidden">
            <OrderCartOptions />
          </div>
          <ScrollArea className="w-full h-[553px] 2xl:h-[657px] flex flex-col justify-between bg-darkBg rounded-lg border border-lightBorder p-0 px-4 gap-0 relative">
            <div className="w-full h-full flex flex-col justify-between relative">
              <Accordion
                type="multiple"
                className="w-full rounded-none relative"
                defaultValue={["item-1", "item-2", "item-3"]}
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Customer
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="w-full flex flex-col gap-4 px-2">
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="customer_first_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  First Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="customer_last_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <FormField
                            control={form.control}
                            name="customer_contact_number"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Contact Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    {...field}
                                    accept="number"
                                    type="number"
                                    placeholder="#"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col ">
                          <FormField
                            control={form.control}
                            name="inventory_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Branch
                                </FormLabel>
                                <BranchInput data={field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col ">
                          <FormField
                            control={form.control}
                            name="payment_method"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Payment
                                </FormLabel>
                                <PaymentInput data={field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full flex flex-col ">
                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Status
                                </FormLabel>
                                <StatusInput data={field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-[29%] flex flex-col">
                        <FormField
                          control={form.control}
                          name="customer_email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Email</FormLabel>
                              <FormControl>
                                <Input
                                  className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                  {...field}
                                  type="text"
                                  placeholder="example@gmail.com"
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Products Summary
                  </AccordionTrigger>
                  <AccordionContent>
                    <ProductsCart
                      columns={initiateProductsCartColumns(
                        dispatch,
                        orderCartOptions.productsData
                      )}
                      data={orderCart.productsCart}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Parts Summary
                  </AccordionTrigger>
                  <AccordionContent>
                    <PartsCart
                      columns={initiatePartsCartColumns(
                        dispatch,
                        orderCartOptions.partsData
                      )}
                      data={orderCart.partsCart}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="w-full py-6 flex justify-between position sticky bottom-[-4px] bg-darkBg m-0 text-lg font-bold">
                <span>Total</span>
                <span>{`₱ ${
                  // sum all the products and parts
                  (
                    orderCart.productsCart.reduce(
                      (acc: any, product: any) =>
                        acc + product.price * product.quantity,
                      0
                    ) +
                    orderCart.partsCart.reduce(
                      (acc: any, part: any) => acc + part.price * part.quantity,
                      0
                    )
                  ).toFixed(2)
                }`}</span>
              </div>
            </div>
          </ScrollArea>
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
