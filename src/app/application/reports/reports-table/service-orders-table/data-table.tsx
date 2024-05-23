"use client";
import { useState } from "react";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/clean-table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue> | any) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    status: false,
    created_at: false,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const [filteredData, setFilteredData] = useState(data);

  return (
    <div className="w-full min-h-[745px] 2xl:min-h-[792px] flex flex-col justify-between gap-3 bg-darkComponentBg border border-lightBorder p-4 rounded-2xl">
      <div className="w-full flex justify-between ">
        <DataTableToolbar
          table={table}
          data={data}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
      </div>
      <div className="w-full h-full overflow-scroll-y">
        <ScrollArea className="w-full h-[640px] 2xl:h-[690px] rounded-2xl relative">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Order ID</TableHead>
                <TableHead className="text-left">Date Created</TableHead>
                <TableHead className="text-left">Customer</TableHead>
                <TableHead className="text-left">Method</TableHead>
                <TableHead className="text-left">Parts Purchase</TableHead>
                <TableHead className="text-left">Products Purchase</TableHead>
                <TableHead className="text-left">Service Purchase</TableHead>
                <TableHead className="text-left">Subtotal</TableHead>
                <TableHead className="text-left">Discount</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.customer_first_name} {order.customer_last_name}
                  </TableCell>
                  <TableCell>{order.payment_method}</TableCell>
                  <TableCell>
                    ₱{" "}
                    {order.purchase_parts
                      .reduce(
                        (acc: number, part: any) =>
                          acc + part.price * part.quantity,
                        0
                      )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </TableCell>
                  <TableCell>
                    ₱{" "}
                    {order.purchase_products
                      .reduce(
                        (acc: number, product: any) =>
                          acc + product.price * product.quantity,
                        0
                      )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </TableCell>
                  <TableCell>
                    ₱{" "}
                    {order.purchase_services
                      .reduce(
                        (acc: number, service: any) => acc + service.price,
                        0
                      )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </TableCell>
                  <TableCell>
                    {`₱ ${(
                      order.purchase_products.reduce(
                        (acc: any, product: any) =>
                          acc + product.price * product.quantity,
                        0
                      ) +
                      order.purchase_parts.reduce(
                        (acc: any, part: any) =>
                          acc + part.price * part.quantity,
                        0
                      ) +
                      order.purchase_services.reduce(
                        (acc: any, service: any) => acc + service.price,
                        0
                      )
                    )
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </TableCell>
                  <TableCell>
                    (%{order.discount}){" "}
                    {`- ₱ ${(
                      (order.purchase_products.reduce(
                        (acc: any, product: any) =>
                          acc + product.price * product.quantity,
                        0
                      ) +
                        order.purchase_parts.reduce(
                          (acc: any, part: any) =>
                            acc + part.price * part.quantity,
                          0
                        ) +
                        order.purchase_services.reduce(
                          (acc: any, service: any) => acc + service.price,
                          0
                        )) *
                      (order.discount / 100)
                    )
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </TableCell>
                  <TableCell className="text-right">
                    ₱{" "}
                    {(
                      (order.purchase_products.reduce(
                        (acc: any, product: any) =>
                          acc + product.price * product.quantity,
                        0
                      ) +
                        order.purchase_parts.reduce(
                          (acc: any, part: any) =>
                            acc + part.price * part.quantity,
                          0
                        ) +
                        order.purchase_services.reduce(
                          (acc: any, service: any) => acc + service.price,
                          0
                        )) *
                      ((100 - order.discount) / 100)
                    )
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
