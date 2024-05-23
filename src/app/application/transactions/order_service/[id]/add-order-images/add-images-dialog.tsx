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

import OrderForm from "./add-images-form";
import { BsBoxSeam } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa";

export default function UpdateOrderDialog({ data }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <div className="w-full flex justify-end">
          <Button className="w-fit text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
            <FaRegImages /> Add Images
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[870px] 2xl:max-w-[970px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Add Images</DialogTitle>
          <DialogDescription>
            Update new more purchases to the order.
          </DialogDescription>
        </DialogHeader>
        <OrderForm setDialogOpen={setDialogIsOpen} data={data} />
      </DialogContent>
    </Dialog>
  );
}
