"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";

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

export const columns: ColumnDef<Employee>[] = [
  {
    id: "Name",
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
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original;
      if (item.status === "Available") {
        return (
          <p
            className={
              "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-green-300 bg-green-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-green-600"
            }
          >
            {item.status}
          </p>
        );
      } else if (item.status === "In Progress") {
        return (
          <p
            className={
              "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-yellow-300 bg-yellow-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-yellow-600"
            }
          >
            {item.status}
          </p>
        );
      } else {
        return (
          <p
            className={
              "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-red-300 bg-red-300 bg-opacity-20 px-2 py-1 rounded-3xl border border-red-600"
            }
          >
            {item.status}
          </p>
        );
      }
    },
  },
];
