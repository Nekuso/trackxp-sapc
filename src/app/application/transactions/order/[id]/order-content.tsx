import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import UpdateProductButton from "./update-order/update-order-dialog";
import DeleteProductButton from "./delete-order/delete-product-dialog";
import Barcode from "react-barcode";
import { toast as sonner } from "sonner";

import { DataTable as ProductOrders } from "./order-tables/product-orders/data-table";
import { DataTable as PartOrders } from "./order-tables/part-orders/data-table";
import { initiateColumns as initiateProductOrdersColumns } from "./order-tables/product-orders/columns";
import { initiateColumns as initiatePartsOrdersColumns } from "./order-tables/part-orders/columns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function OrderContent({ order }: any) {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex max-w-[1840px] justify-center place-items-start gap-4">
      <ScrollArea className="w-[650px] 2xl:w-[55%] h-[90%] px-8 pt-4 pb-8  bg-darkComponentBg rounded-xl border border-lightBorder gap-0 relative shadow-inner">
        <Accordion
          type="multiple"
          className="w-full rounded-none relative"
          defaultValue={["item-2", "item-3"]}
        >
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold sticky top-0">
              Purchased Products
            </AccordionTrigger>
            <AccordionContent className="rounded-xl">
              <ProductOrders
                columns={initiateProductOrdersColumns()}
                data={order[0].purchase_products}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold sticky top-0">
              Purchased Parts
            </AccordionTrigger>
            <AccordionContent className="bg-darkComponentBg rounded-xl">
              <PartOrders
                columns={initiatePartsOrdersColumns()}
                data={order[0].purchase_parts}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
      <div className="w-[30%] 2xl:w-[25%] min-h-[600px] 2xl:min-h-[680px] p-8 bg-darkComponentBg flex flex-col gap-5 2xl:gap-7 rounded-xl shadow-lg border border-lightBorder">
        <div className="flex flex-col justify-between gap-2">
          <div className="w-full flex justify-between">
            <h2 className="text-xl font-bold">Order Details</h2>
            <div
              className={cn(
                "text-xs rounded-full py-0.5 px-2 border font-normal flex place-items-center gap-1 cursor-pointer",
                order[0].status === "Paid"
                  ? "text-green-500 bg-green-500 bg-opacity-20 border-green-500 px-4"
                  : order[0].status === "Pending"
                  ? "text-yellow-300 bg-yellow-300 bg-opacity-20 border-yellow-300"
                  : "text-red-500 bg-red-500 bg-opacity-20 border-red-500"
              )}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  order[0].status === "Paid"
                    ? " bg-green-500 "
                    : order[0].status === "Pending"
                    ? "bg-yellow-300 "
                    : "bg-red-500"
                )}
              ></div>
              {order[0].status}
            </div>
          </div>
          <p className="text-xs 2xl:text-sm text-slate-400">
            Order ID: {order[0].id}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Customer Name</p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              {order[0].customer_first_name} {order[0].customer_last_name}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Contact Number</p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              {order[0].customer_contact_number}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Email</p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              {order[0].customer_email}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Payment Method</p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              {order[0].payment_method}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Status</p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              {order[0].status}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Created At</p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              {format(new Date(order[0].created_at), "PPPP")}
            </p>
          </div>
        </div>
        <Separator className="bg-slate-400" />
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Products Total</p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              ₱{" "}
              {order[0].purchase_products
                .reduce(
                  (acc: any, item: any) => acc + item.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Parts Total</p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              ₱{" "}
              {order[0].purchase_parts
                .reduce(
                  (acc: any, item: any) => acc + item.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Tax</p>
            <p className="text-xs 2xl:text-sm text-slate-50">₱ 0</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">
              Discount ({order[0].discount}%)
            </p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              - ₱{" "}
              {(
                (order[0].purchase_products.reduce(
                  (acc: any, item: any) => acc + item.price * item.quantity,
                  0
                ) +
                  order[0].purchase_parts.reduce(
                    (acc: any, item: any) => acc + item.price * item.quantity,
                    0
                  )) *
                (order[0].discount / 100)
              ).toFixed(2)}
            </p>
          </div>
        </div>

        <Separator className="bg-slate-400" />
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Total</p>
            <p className="text-md 2xl:text-lg text-slate-50 font-bold">
              ₱ {order[0].total_price.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Amount Paid</p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              - ₱ {order[0].amount_paid.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs 2xl:text-sm text-slate-400">Change</p>
            <p className="text-xs 2xl:text-sm text-slate-50">
              ₱ {(order[0].amount_paid - order[0].total_price).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="w-full max-w-full flex flex-col place-items-center gap-4">
          <Barcode
            value={order[0].id ? order[0].id : "No Barcode"}
            displayValue={false}
            background="transparent"
            lineColor="white"
            width={1}
            height={70}
            margin={0}
            renderer="img"
          />
        </div>
      </div>
    </div>
  );
}
