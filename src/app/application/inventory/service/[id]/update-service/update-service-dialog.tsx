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

import UpdateServiceForm from "./update-service-form";
import { MdOutlineModeEdit } from "react-icons/md";

export default function UpdateServiceDialog({ serviceData }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-lg flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary">
          <MdOutlineModeEdit />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[570] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update Service</DialogTitle>
          <DialogDescription>
            Make sure to input the new correct fields of the service
          </DialogDescription>
        </DialogHeader>
        <UpdateServiceForm
          setDialogOpen={setDialogIsOpen}
          dialogIsOpen={dialogIsOpen}
          service={serviceData}
        />
      </DialogContent>
    </Dialog>
  );
}
