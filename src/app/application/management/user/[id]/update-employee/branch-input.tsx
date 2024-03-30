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
  // let { data: branches, error } = await supabase.from("branches").select("*");
  const branchesData = [
    {
      id: 1,
      branch_name: "North Road",
      branch_location: "Sta. Rosa St, Dumaguete, 6200 Negros Oriental",
    },
    {
      id: 2,
      branch_name: "Sta. Rosa St.",
      branch_location:
        "North Road, National Highway, Buñao Rd, Dumaguete, Negros Oriental",
    },
  ];

  function findBranchById(idString: any) {
    const id = parseInt(idString);

    const foundItem = branchesData.find((item) => item.id === id);

    if (foundItem) {
      return foundItem.branch_name;
    } else {
      return "Role not found";
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
          {branchesData.map((branch) => (
            <SelectItem key={branch.id} value={branch.id.toString()}>
              {branch.branch_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
