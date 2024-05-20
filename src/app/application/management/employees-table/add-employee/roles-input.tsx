import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { useSelector } from "react-redux";

export default function SelectDemo({ data }: { data: any }) {
  const userSession = useSelector((state: any) => state.currentSession);
  const rolesData = useSelector((state: any) => state.roles);

  const roles = rolesData.filter(
    (role: any) => role.value !== "Manager" && role.value !== "Administrator"
  );

  return (
    <Select onValueChange={data.onChange}>
      <FormControl>
        <SelectTrigger className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg ">
          <SelectValue className="text-white" placeholder="Select a role" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          {userSession.roles.role === "Administrator"
            ? rolesData.map((role: any) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.value}
                </SelectItem>
              ))
            : roles.map((role: any) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.value}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
