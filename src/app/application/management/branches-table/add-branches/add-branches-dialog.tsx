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
import BranchForm from "./add-branch-form";
import { useState } from "react";

export default function BranchesDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-lg">New Branch</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-fit bg-darkComponentBg border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>New Branch</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new branch
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <BranchForm setDialogOpen={setDialogIsOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
