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

import ServiceForm from "./add-service-form";
import { BsBoxSeam } from "react-icons/bs";

export default function ServiceDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          <BsBoxSeam /> New Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[570px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Service</DialogTitle>
          <DialogDescription>
            Add a new service to your inventory
          </DialogDescription>
        </DialogHeader>
        <ServiceForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
