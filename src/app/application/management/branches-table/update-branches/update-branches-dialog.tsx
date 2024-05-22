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
import BranchForm from "./update-branch-form";
import { useState } from "react";

export default function BranchesDialog({ dataProps }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-8 bg-applicationPrimary data-[state=open]:text-white hover:bg-applicationPrimary/80 hover:text-white"
        >
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-fit bg-darkComponentBg border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update Branch</DialogTitle>
          <DialogDescription>
            Fill in the form below to update a new branch
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <BranchForm setDialogOpen={setDialogIsOpen} dataProps={dataProps} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
