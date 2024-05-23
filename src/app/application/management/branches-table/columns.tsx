"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UpdateForm from "./update-branches/update-branches-dialog";
import DeleteForm from "./delete-branches/delete-branch-dialog";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
export type Branches = {
  id: number;
  branch_name: string;
  branch_location: string;
  branch_manager: string;
  created_at: string;
  contact_number: string;
};

export const columns: ColumnDef<Branches>[] = [
  {
    id: "branch_name",
    accessorKey: "branch_name",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white text-center"
            >
              <span>Branch Name</span>
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
      const item = row.original;
      return (
        <div className="flex place-items-center gap-4 z-0">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">{item.branch_name}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "branch_location",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
            >
              <span>Branch Location</span>
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
    accessorKey: "contact_number",
    header: "Contact Number",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
            >
              <span>Created at</span>
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
      const item = row.original;
      return (
        <div className="flex place-items-center gap-4 z-0">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: "Actons",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex place-items-center gap-4 z-0">
          <UpdateForm dataProps={item} />
          <DeleteForm dataProps={item} />
        </div>
      );
    },
  },
];
