import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

export default function SelectDemo({ data, uomsData }: any) {
  function findUOMById(idString: any) {
    const id = parseInt(idString);

    const foundItem = uomsData.find((item: any) => item.id === id);

    if (foundItem) {
      return foundItem.role;
    } else {
      return "Unit of measure not found";
    }
  }

  return (
    <Select onValueChange={data.onChange} value={data.value}>
      <FormControl>
        <SelectTrigger
          id="branch"
          name="branch"
          value={data.value}
          className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        >
          <SelectValue
            className="text-white"
            placeholder={data ? findUOMById(data.value) : "Select a unit"}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          {uomsData.map((uom: any) => (
            <SelectItem key={uom.id} value={uom.id.toString()}>
              {uom.unit_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
