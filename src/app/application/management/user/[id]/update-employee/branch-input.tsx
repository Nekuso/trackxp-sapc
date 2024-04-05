/* eslint-disable react-hooks/exhaustive-deps */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { useBranches } from "@/hooks/useBranches";

export default function SelectDemo({ data, branchesData }: any) {
  function findBranchById(idString: any) {
    const id = parseInt(idString);

    const foundItem = branchesData.find((item: any) => item.id === id);

    if (foundItem) {
      return foundItem.branch_name;
    } else {
      return "No branches found";
    }
  }

  return (
    <Select onValueChange={data.onChange}>
      <FormControl>
        <SelectTrigger
          id="branch"
          name="branch"
          className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
          {...data}
        >
          <SelectValue
            className="text-white"
            placeholder={data ? findBranchById(data.value) : "Select a branch"}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          {branchesData.map((branch: any) => (
            <SelectItem key={branch.id} value={branch.id.toString()}>
              {branch.branch_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
