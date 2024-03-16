import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger
        id="role"
        name="role"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
      >
        <SelectValue className="text-white" placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          <SelectItem value="administrator">Administrator</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
          <SelectItem value="staff">Staff</SelectItem>
          <SelectItem value="cashier">Cashier</SelectItem>
          <SelectItem value="supervisor">Supervisor</SelectItem>
          <SelectItem value="mechanic">Mechanic</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
