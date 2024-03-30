import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

export default function SelectDemo({ data }: { data: any }) {
  const rolesData = [
    { id: 1, role: "Administrator" },
    { id: 2, role: "Manager" },
    { id: 3, role: "Staff" },
    { id: 4, role: "Cashier" },
    { id: 5, role: "Supervisor" },
    { id: 6, role: "Mechanic" },
  ];

  function findRoleById(idString: any) {
    const id = parseInt(idString);

    const foundItem = rolesData.find((item) => item.id === id);

    if (foundItem) {
      return foundItem.role;
    } else {
      return "Role not found";
    }
  }

  return (
    <Select onValueChange={data.onChange}>
      <FormControl>
        <SelectTrigger
          id="role"
          name="role"
          className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
          {...data}
          value={data.value}
        >
          <SelectValue
            className="text-white"
            placeholder={data ? findRoleById(data.value) : "Select a role"}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          {rolesData.map((role) => (
            <SelectItem key={role.id} value={role.id.toString()}>
              {role.role}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
