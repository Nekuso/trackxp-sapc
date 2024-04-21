"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  QuestionMarkCircledIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { FaEye } from "react-icons/fa";
import { allPurchaseOrdersDisplay } from "@/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export const statuses = [
  {
    value: "Paid",
    label: "Paid",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Pending",
    label: "Pending",
    icon: CircleIcon,
  },
  {
    value: "Archive",
    label: "Archive ",
    icon: CircleIcon,
  },
];

export const initialState = (branches: any) => {
  const columns: ColumnDef<allPurchaseOrdersDisplay>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
              >
                <span>Order ID</span>
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-darkComponentBg shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-applicationPrimary  text-white group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-applicationPrimary text-white group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex place-items-center gap-2">
            <div className="flex flex-col">
              <p className="max-w-[190px] 2xl:max-w-[220px] truncate font-semibold">
                {row.original.id}
              </p>
              <p className="max-w-[181px] truncate text-white/50">
                {format(row.original.created_at, "PPPP")}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "customer_first_name",
      accessorKey: "customer_first_name",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <p className="max-w-[110px] 2xl:max-w-[220px] truncate">
            {row.original.customer_first_name} {row.original.customer_last_name}
          </p>
        );
      },
    },
    {
      accessorKey: "employees",
      header: "Processed By",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-center gap-2">
            <Avatar className="w-10 h-10 cursor-pointer z-0 rounded-md">
              <AvatarImage
                src={row.original.employees.image_url}
                alt={row.original.employees.first_name}
              />
              <AvatarFallback className="bg-darkBg rounded-md">
                {row.original.employees.first_name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="max-w-[100px] 2xl:max-w-[220px] truncate font-semibold">
                {row.original.employees.first_name}{" "}
                {row.original.employees.last_name}
              </p>
              <p className="max-w-[181px] truncate text-white/50">
                {row.original.employees.roles.role}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "branch",
      accessorKey: "branches",
      accessorFn: (row) => row.inventory.branches.branch_name,
      header: "Branch",
      cell: ({ row }) => {
        const item = branches?.find(
          (item: any) =>
            item.value === row.original.inventory.branches.branch_name
        );

        if (!item) {
          return null;
        }
        return <p className="max-w-[85px] truncate">{item.label}</p>;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "purchased",
      accessorKey: "branches",
      header: "Purchased",
      cell: ({ row }) => {
        if (
          row.original.purchase_products.length > 0 &&
          row.original.purchase_parts.length > 0
        ) {
          return (
            <div className="flex place-items-center gap-1">
              <p
                className={
                  "w-fit text-xs flex place-items-center gap-1 truncate text-white bg-applicationPrimary pl-2 pr-1 py-1 rounded-3xl font-semibold"
                }
              >
                Products
                <span className="rounded-full bg-white text-black p-1 px-3 text-center flex justify-center place-items-center line-clamp-none">
                  {row.original.purchase_products.length}
                </span>
              </p>
              <TooltipProvider delayDuration={0} skipDelayDuration={1000}>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="rounded-full bg-darkGray text-white p-1 px-2 text-center flex justify-center place-items-center line-clamp-none font-semibold">
                      +1
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-transparent border-none shadow-none">
                    <p
                      className={
                        "w-fit text-xs flex place-items-center gap-1 truncate text-white bg-darkGray pl-2 pr-1 py-1 rounded-3xl font-semibold"
                      }
                    >
                      Parts
                      <span className="rounded-full bg-white text-black p-1 px-3 text-center flex justify-center place-items-center line-clamp-none">
                        {row.original.purchase_parts.length}
                      </span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        } else if (row.original.purchase_products.length > 0) {
          return (
            <p
              className={
                "w-fit text-xs flex place-items-center gap-1 truncate text-white bg-applicationPrimary pl-2 pr-1 py-1 rounded-3xl font-semibold"
              }
            >
              Products
              <span className="rounded-full bg-white text-black p-1 px-3 text-center flex justify-center place-items-center line-clamp-none">
                {row.original.purchase_products.length}
              </span>
            </p>
          );
        } else if (row.original.purchase_parts.length > 0) {
          return (
            <p
              className={
                "w-fit text-xs flex place-items-center gap-1 truncate text-white bg-darkGray pl-2 pr-1 py-1 rounded-3xl font-semibold"
              }
            >
              Parts
              <span className="rounded-full bg-white text-black p-1 px-2 text-center flex justify-center place-items-center line-clamp-none">
                {row.original.purchase_parts.length}
              </span>
            </p>
          );
        } else {
          return (
            <p
              className={
                "w-fit text-xs flex place-items-center gap-1 truncate text-white bg-black px-2 py-1 rounded-3xl font-semibold"
              }
            >
              None
            </p>
          );
        }
      },
    },
    {
      id: "total_price",
      accessorKey: "total_price",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
              >
                <span>Total</span>
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-darkComponentBg shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-applicationPrimary  text-white group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-applicationPrimary text-white group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      cell: ({ row }) => {
        return (
          <p className="max-w-[190px] 2xl:max-w-[220px] truncate font-bold">
            ₱{" "}
            {row.original.total_price
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
              >
                <span>Status</span>
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-darkComponentBg shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-applicationPrimary  text-white group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-applicationPrimary text-white group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },

      cell: ({ row }) => {
        const item = statuses.find(
          (item) => item.value === row.getValue("status")
        );

        if (!item) {
          return null;
        }
        if (item.value === "Paid") {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-green-300 bg-green-300 bg-opacity-20 px-6 py-1 rounded-3xl border border-green-600"
              }
            >
              {item.value}
            </p>
          );
        } else if (item.value === "Pending") {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-yellow-300 bg-yellow-300 bg-opacity-20 px-3 py-1 rounded-3xl border border-yellow-600"
              }
            >
              {item.value}
            </p>
          );
        } else {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-slate-300 bg-slate-200 bg-opacity-20 px-4 py-1 rounded-3xl "
              }
            >
              {item.value}
            </p>
          );
        }
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Link
            className="w-fit py-2 flex place-items-center justify-center text-slate-400 rounded-full px-4 hover:bg-applicationPrimary hover:text-white hover:border-applicationPrimary transition-all duration-300 primary-glow"
            href={`/application/transactions/order/${id}`}
          >
            <FaEye className="mr-2 " />
            View
          </Link>
        );
      },
    },
    {
      id: "barcode",
      accessorKey: "barcode",
    },
    {
      id: "created_at",
      accessorKey: "created_at",
      accessorFn: (row) => format(new Date(row.created_at), "PPP"),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  ];
  return columns;
};
