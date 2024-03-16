/* eslint-disable react/no-unescaped-entities */
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import DobInput from "./dob-input";
import RoleInput from "./roles-input";
import GenderInput from "./gender-input";
import BranchInput from "./branch-input";

import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

const employeeSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  dob: z.date(),
  role: z.string(),
  status: z.string(),
});

export default function EmployeesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-lg flex gap-2">
          <IoPersonAddOutline /> New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-darkComponentBg border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>
            Add a new user with level role access
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex min-h-[300px] gap-6">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full flex place-items-center justify-center gap-2 mb-5">
              <Avatar className="w-20 h-20 rounded-lg  cursor-pointer z-0">
                <AvatarImage
                  className="rounded-lg"
                  src={""}
                  alt={"something"}
                />
                <AvatarFallback className="bg-darkBg rounded-lg">
                  CB
                </AvatarFallback>
              </Avatar>
              <div className="w-full h-full flex flex-col gap-2">
                <Label htmlFor="first_name" className="text-xs">
                  Profile Picture
                </Label>
                <span className="text-xs text-muted-foreground">
                  We support PNGs, JPEGs under 5MB
                </span>
                <Input
                  type="file"
                  accept="image/*"
                  className=" text-xs w-fit h-fit bg-transparent border-none file:px-4 file:py-2 text-slate-500 p-0 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-lightComponentBg file:text-white hover:file:bg-white hover:file:text-black cursor-pointer file:hover:cursor-pointer file:transition-all file:duration-300"
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="first_name" className="text-xs">
                  First Name
                </Label>
                <Input
                  className="rounded-lg bg-lightComponentBg border-slate-600/50"
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="last_name" className="text-xs">
                  Last Name
                </Label>
                <Input
                  className="rounded-lg bg-lightComponentBg border-slate-600/50"
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <Input
                  className="rounded-lg bg-lightComponentBg border-slate-600/50"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            <div className="w-full h-full flex gap-4">
              <div className="w-full h-full flex flex-col gap-2">
                <Label htmlFor="address" className="text-xs">
                  Address
                </Label>
                <Input
                  className="rounded-lg bg-lightComponentBg border-slate-600/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-full"
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                />
              </div>
            </div>
          </div>
          <Separator orientation="vertical" className="bg-white/10" />
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="contact_number" className="text-xs">
                  Contact Number
                </Label>
                <Input
                  className="rounded-lg bg-lightComponentBg border-slate-600/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  id="contact_number"
                  name="contact_number"
                  type="number"
                  placeholder="#"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="gender" className="text-xs">
                  Gender
                </Label>
                <GenderInput />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="dob" className="text-xs">
                  Date of birth
                </Label>
                <DobInput />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="role" className="text-xs">
                  Role
                </Label>
                <RoleInput />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="branch" className="text-xs">
                  Branch
                </Label>
                <BranchInput />
              </div>
            </div>
            <div className="w-full flex gap-4 place-items-end">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="remarks" className="text-xs">
                  Remarks
                </Label>
                <Textarea
                  className="bg-lightComponentBg border-slate-600/50 w-full h-full resize-none"
                  id="remarks"
                  name="remarks"
                  placeholder="About the user"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="rounded-lg">
            Create User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
