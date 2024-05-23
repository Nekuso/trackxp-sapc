"use client";

import ReportLogo from "@/images/receipt-logo.svg";
import {
  Table as CleanTable,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/clean-table";
import { FaFilePdf } from "react-icons/fa6";
import { useRef } from "react";
import React from "react";
import { CiExport } from "react-icons/ci";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import DatePickerWithRange from "./date-picker";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  partsData?: any[];
  productsData?: any[];
  data: any[];
}

export function DataTableToolbar<TData>({
  table,
  data,
  filteredData,
  setFilteredData,
}: DataTableToolbarProps<TData> | any) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const targetRef = useRef<any>();
  const options: Options = {
    filename: "RestockReport.pdf",
    // default is `save`
    method: "save",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.NORMAL,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.MEDIUM,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
    },
    // customize any value passed to the jsPDF instance and html2canvas
    // function
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
    },
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 flex-wrap gap-y-2"></div>
      <div className="flex gap-4">
        <DatePickerWithRange data={data} setFilteredData={setFilteredData} />
        <Button
          className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary active:scale-95 transition-all duration-300 text-white"
          onClick={() => generatePDF(targetRef, options)}
        >
          <CiExport />
          Export
        </Button>
      </div>
      {/* <div
        className="w-[806px] min-h-[1140px] flex flex-col place-items-center bg-white p-8 gap-2"
        ref={targetRef}
      >
        <div className="w-full h-fit flex flex-col place-items-center gap-2">
          <ReportLogo />
          <h1 className="text-md font-bold w-full text-center">
            SUPPLY AND PROPERTY MANAGEMENT OFFICE
          </h1>
          <h1 className="text-lg font-bold w-full text-center">
            Restock Report
          </h1>
          <CleanTable>
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
            <TableFooter>
              <TableRow>
                <TableCell className="text-end" colSpan={5}>
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">
                  ₱
                  {restockReport[0].restock_report_entries
                    .reduce(
                      (acc: any, supply: any) =>
                        acc + supply.price * supply.supply_quantity,
                      0
                    )
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </TableCell>
              </TableRow>
            </TableFooter>
          </CleanTable>
        </div>

        <div className="w-full py-11 ">
          <div className="flex flex-col gap-8">
            <h1 className="text-sm font-bold">Prepared by:</h1>
            <h1 className="w-fit flex flex-col justify-center place-items-center ml-6">
              <span className="text-center w-full ">Glenn D. Lumjod</span>
              <span className="font-bold">Property Supply Officer </span>
            </h1>
          </div>
        </div>
        <div className="w-full py-10 ">
          <h1 className="text-lg font-bold">
            Created at:{" "}
            <span className="underline">
              {new Date(restockReport[0].created_at).toDateString()}
            </span>
          </h1>
        </div>
      </div> */}
    </div>
  );
}
