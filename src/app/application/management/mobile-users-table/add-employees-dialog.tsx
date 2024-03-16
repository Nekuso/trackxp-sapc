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

export default function EmployeesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-lg">New User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px] h-[700px] bg-darkComponentBg border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>
            Add a new user with level role access
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
