"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UpdateEmployeeForm from "./update-employee-form";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setEmployeeData } from "@/redux/slices/employeeSlice";

export default function UpdateEmployeeDialog({ employeeData }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const employee = employeeData;
  const dispatch = useDispatch();
  dispatch(setEmployeeData(employee));

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-full flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary">
          <MdOutlineModeEdit />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Make sure to input the new correct fields of the user
          </DialogDescription>
        </DialogHeader>
        <UpdateEmployeeForm
          setDialogOpen={setDialogIsOpen}
          dialogIsOpen={dialogIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
