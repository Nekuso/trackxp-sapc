"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  StopwatchIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  PersonIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { EmployeeDisplay } from "@/types";

export const statuses = [
  {
    value: "Available",
    label: "Available",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "In Progress",
    label: "In Progress",
    icon: CircleIcon,
  },
  {
    value: "Unavailable",
    label: "Unavailable",
    icon: StopwatchIcon,
  },
  {
    value: "Inactive",
    label: "Inactive",
    icon: CheckCircledIcon,
  },
];
export const roles = [
  {
    value: "Administrator",
    label: "Administrator",
    icon: PersonIcon,
  },
  {
    value: "Manager",
    label: "Manager",
    icon: PersonIcon,
  },
  {
    value: "Staff",
    label: "Staff",
    icon: PersonIcon,
  },
  {
    value: "Cashier",
    label: "Cashier",
    icon: PersonIcon,
  },
  {
    value: "Supervisor",
    label: "Supervisor",
    icon: PersonIcon,
  },
  {
    value: "Mechanic",
    label: "Mechanic",
    icon: PersonIcon,
  },
];

export const branches = [
  {
    value: "North Road",
    label: "North Road",
    icon: HomeIcon,
  },
  {
    value: "Sta. Rosa St.",
    label: "Sta. Rosa St.",
    icon: HomeIcon,
  },
];

export const columns: ColumnDef<EmployeeDisplay>[] = [
  {
    id: "name",
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
            >
              <span>Name</span>
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
          <Avatar className="w-10 h-10 cursor-pointer z-0">
            <AvatarImage src={item.img_url} alt={item.id} />
            <AvatarFallback className="bg-darkBg">
              {`${item.first_name[0]}${item.last_name[0]}`}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {item.first_name} {item.last_name}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
            >
              <span>Email</span>
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
    id: "branch",
    accessorKey: "branches",
    accessorFn: (row) => row.branches.branch_name,
    header: "Branch",
    cell: ({ row }) => {
      const item = branches.find(
        (item) => item.value === row.original.branches.branch_name
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
    accessorKey: "roles",
    accessorFn: (row) => row.roles.role,
    header: "Role",
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.original.roles.role);

      if (!role) {
        return null;
      }

      return role.label;
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
              className="h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-white hover:bg-slate-50/40 hover:text-white"
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
      } else if (item.value === "In Progress") {
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
];
