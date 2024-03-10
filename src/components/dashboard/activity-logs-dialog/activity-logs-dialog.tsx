/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ActivityLogsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="w-16 text-end bg-none text-xs cursor-pointer">
          See All
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px] h-[700px] bg-darkComponentBg border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>Activity Logs</DialogTitle>
          <DialogDescription>Lists of all activity logs.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
