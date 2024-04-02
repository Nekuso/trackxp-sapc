import { useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ProductForm from "./add-product-form";

export default function ProductDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-full flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          <IoPersonAddOutline /> Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Product</DialogTitle>
          <DialogDescription>
            Add a new product to your inventory
          </DialogDescription>
        </DialogHeader>
        <ProductForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
