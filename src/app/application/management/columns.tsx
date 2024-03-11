"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
export type Employee = {
  id: number;
  email: string;
  name: string;
  img_url: string;
  contact_number: string;
  branch: number;
  role: string;
  status: string;
  dob: string;
};

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

export const columns: ColumnDef<Employee>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex place-items-center gap-2">
          <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarImage src={item.img_url} alt={item.name} />
            <AvatarFallback className="bg-darkBg">
              {item.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{item.name}</span>
            <span className="text-xs">{item.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact_number",
    header: "Contact Number",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Sttatus",

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
