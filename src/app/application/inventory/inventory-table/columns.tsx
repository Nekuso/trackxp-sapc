"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { FaEye } from "react-icons/fa";
import { allProductsDisplay } from "@/types";
import Link from "next/link";
import { store } from "@/redux/store";

export const statuses = [
  {
    value: "Available",
    label: "Available",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Low Stock",
    label: "Low Stock",
    icon: CircleIcon,
  },
  {
    value: "Out Of Stock",
    label: "Out Of Stock",
    icon: CheckCircledIcon,
  },
];

type branch = {
  value: string;
  label: string;
  icon: any;
};
type uom = {
  value: string;
  label: string;
  icon: any;
};

export const initialState = (branches: branch[], uoms: uom[]) => {
  const columns: ColumnDef<allProductsDisplay>[] = [
    {
      id: "barcode",
      accessorKey: "barcode",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
              >
                <span>Barcode</span>
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
    },
    {
      id: "stock_quantity",
      accessorKey: "stock_quantity",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
              >
                <span>Stock</span>
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
    },
    {
      id: "uom",
      accessorKey: "uom",
      accessorFn: (row) => row.uoms.unit_name,
      header: "Unit",
      cell: ({ row }) => {
        const item = uoms?.find(
          (item) => item.value === row.original.uoms.unit_name
        );

        if (!item) {
          return null;
        }
        return item.label;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      id: "name",
      accessorKey: "name",
      header: "Product",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return (
          <p className="max-w-[300px] truncate">
            {row.getValue("description")}
          </p>
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
          (item) => item.value === row.original.inventory.branches.branch_name
        );

        if (!item) {
          return null;
        }
        return item.label;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
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
        if (item.value === "Available") {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-green-300 bg-green-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-green-600"
              }
            >
              {item.value}
            </p>
          );
        } else if (item.value === "Low Stock") {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-yellow-300 bg-yellow-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-yellow-600"
              }
            >
              {item.value}
            </p>
          );
        } else {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-red-300 bg-red-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-red-600"
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
            href={`/application/management/user/${id}`}
          >
            <FaEye className="mr-2 " />
            View
          </Link>
        );
      },
    },
  ];
  return columns;
}

// export const columns: ColumnDef<allProductsDisplay>[] = [
//   {
//     id: "barcode",
//     accessorKey: "barcode",
//     header: ({ column }) => {
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
//             >
//               <span>Barcode</span>
//               {column.getIsSorted() === "desc" ? (
//                 <ArrowDownIcon className="ml-2 h-4 w-4" />
//               ) : column.getIsSorted() === "asc" ? (
//                 <ArrowUpIcon className="ml-2 h-4 w-4" />
//               ) : (
//                 <CaretSortIcon className="ml-2 h-4 w-4" />
//               )}
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             align="start"
//             className="bg-darkComponentBg shadow-2xl border-darkGray border-none"
//           >
//             <DropdownMenuItem
//               onClick={() => column.toggleSorting(false)}
//               className="hover:bg-applicationPrimary  text-white group"
//             >
//               <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
//               Asc
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => column.toggleSorting(true)}
//               className="hover:bg-applicationPrimary text-white group"
//             >
//               <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
//               Desc
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
//   {
//     id: "stock_quantity",
//     accessorKey: "stock_quantity",
//     header: ({ column }) => {
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
//             >
//               <span>Stock</span>
//               {column.getIsSorted() === "desc" ? (
//                 <ArrowDownIcon className="ml-2 h-4 w-4" />
//               ) : column.getIsSorted() === "asc" ? (
//                 <ArrowUpIcon className="ml-2 h-4 w-4" />
//               ) : (
//                 <CaretSortIcon className="ml-2 h-4 w-4" />
//               )}
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             align="start"
//             className="bg-darkComponentBg shadow-2xl border-darkGray border-none"
//           >
//             <DropdownMenuItem
//               onClick={() => column.toggleSorting(false)}
//               className="hover:bg-applicationPrimary  text-white group"
//             >
//               <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
//               Asc
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => column.toggleSorting(true)}
//               className="hover:bg-applicationPrimary text-white group"
//             >
//               <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
//               Desc
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
//   {
//     id: "uom",
//     accessorKey: "uom",
//     accessorFn: (row) => row.uoms.unit_name,
//     header: "Unit",
//     cell: ({ row }) => {
//       const item = uoms?.find(
//         (item) => item.value === row.original.uoms.unit_name
//       );

//       if (!item) {
//         return null;
//       }
//       return item.label;
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//   },

//   {
//     id: "name",
//     accessorKey: "name",
//     header: "Product",
//   },
//   {
//     accessorKey: "description",
//     header: "Description",
//     cell: ({ row }) => {
//       return (
//         <p className="max-w-[300px] truncate">{row.getValue("description")}</p>
//       );
//     },
//   },
//   {
//     id: "branch",
//     accessorKey: "branches",
//     accessorFn: (row) => row.inventory.branches.branch_name,
//     header: "Branch",
//     cell: ({ row }) => {
//       const item = branches?.find(
//         (item) => item.value === row.original.inventory.branches.branch_name
//       );

//       if (!item) {
//         return null;
//       }
//       return item.label;
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//   },
//   {
//     accessorKey: "status",
//     header: ({ column }) => {
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="ghost"
//               size="sm"
//               className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
//             >
//               <span>Status</span>
//               {column.getIsSorted() === "desc" ? (
//                 <ArrowDownIcon className="ml-2 h-4 w-4" />
//               ) : column.getIsSorted() === "asc" ? (
//                 <ArrowUpIcon className="ml-2 h-4 w-4" />
//               ) : (
//                 <CaretSortIcon className="ml-2 h-4 w-4" />
//               )}
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             align="start"
//             className="bg-darkComponentBg shadow-2xl border-darkGray border-none"
//           >
//             <DropdownMenuItem
//               onClick={() => column.toggleSorting(false)}
//               className="hover:bg-applicationPrimary  text-white group"
//             >
//               <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
//               Asc
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => column.toggleSorting(true)}
//               className="hover:bg-applicationPrimary text-white group"
//             >
//               <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-white" />
//               Desc
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },

//     cell: ({ row }) => {
//       const item = statuses.find(
//         (item) => item.value === row.getValue("status")
//       );

//       if (!item) {
//         return null;
//       }
//       if (item.value === "Available") {
//         return (
//           <p
//             className={
//               "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-green-300 bg-green-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-green-600"
//             }
//           >
//             {item.value}
//           </p>
//         );
//       } else if (item.value === "Low Stock") {
//         return (
//           <p
//             className={
//               "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-yellow-300 bg-yellow-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-yellow-600"
//             }
//           >
//             {item.value}
//           </p>
//         );
//       } else {
//         return (
//           <p
//             className={
//               "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-red-300 bg-red-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-red-600"
//             }
//           >
//             {item.value}
//           </p>
//         );
//       }
//     },
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const id = row.original.id;
//       return (
//         <Link
//           className="w-fit py-2 flex place-items-center justify-center text-slate-400 rounded-full px-4 hover:bg-applicationPrimary hover:text-white hover:border-applicationPrimary transition-all duration-300 primary-glow"
//           href={`/application/management/user/${id}`}
//         >
//           <FaEye className="mr-2 " />
//           View
//         </Link>
//       );
//     },
//   },
// ];
