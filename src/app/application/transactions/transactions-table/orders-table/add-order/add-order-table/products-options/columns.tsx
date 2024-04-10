"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addProductToCart } from "@/redux/slices/orderCartSlice";
import { useSelector, useDispatch } from "react-redux";

type option = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  price: number;
  barcode: string;
  status: string;
  created_at: string;
  uoms: any;
  inventory: any;
};

export const initiateColumns = (dispatch: any, productsCart: any) => {
  const columns: ColumnDef<option>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-between gap-4">
            <Avatar className="w-14 h-14 2xl:w-20 2xl:h-20 cursor-pointer z-0 rounded-md">
              <AvatarImage
                src={row.original.image_url}
                alt={row.original.image_url}
              />
              <AvatarFallback className="bg-lightBorder rounded-md">
                {row.original.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-between 2xl:py-2">
              <p className="text-xs max-w-[150px] 2xl:max-w-[220px] truncate font-semibold">
                {row.original.name}
              </p>
              <p className="text-md max-w-[181px] truncate text-white font-bold">
                {`₱ ${row.original.price}`}
              </p>
              <p className="text-xs max-w-[181px] truncate text-white/50">
                {`Stock: ${row.original.stock_quantity}`}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <Button
            className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary/70 hover:text-white transition-all duration-300 px-6 py-2 cursor-pointer"
            type="button"
            disabled={productsCart.some(
              (product: any) => product.product_id === row.original.id
            )}
            onClick={() => {
              dispatch(
                addProductToCart({
                  product_id: row.original.id,
                  inventory_id: row.original.inventory.id,
                  name: row.original.name,
                  description: row.original.description,
                  image: row.original.image_url,
                  uom_name: row.original.uoms.unit_name,
                  quantity: 1,
                  price: row.original.price,
                })
              );
            }}
          >
            Add
          </Button>
        );
      },
    },
  ];
  return columns;
};
