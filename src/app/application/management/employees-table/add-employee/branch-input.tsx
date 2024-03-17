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
  return (
    <Select onValueChange={data.onChange}>
      <FormControl>
        <SelectTrigger
          id="branch"
          name="branch"
          className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        >
          <SelectValue className="text-white" placeholder="Select a branch" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          <SelectItem value="North Road">North Road</SelectItem>
          <SelectItem value="Sta. Rosa St.">Sta. Rosa St.</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
