import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";

export default function SelectDemo({ data }: { data: any }) {
  const allMobileUsers = useSelector(
    (state: any) => state.allMobileUser.allMobileUser
  ).map((mobileUser: any) => ({
    value: mobileUser.id,
    label: mobileUser.first_name + " " + mobileUser.last_name,
  }));

  return (
    <Select onValueChange={data.onChange} value={data.value || ""}>
      <SelectTrigger
        id="mobile_user_id"
        name="mobile_user_id"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue
          className="text-white"
          placeholder="Select a Mobile User"
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          {allMobileUsers.map((mobileUser: any) => (
            <SelectItem key={mobileUser.value} value={mobileUser.value}>
              {mobileUser.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
