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

import RewardForm from "./add-reward-form";
import { BsBoxSeam } from "react-icons/bs";

export default function RewardDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          <BsBoxSeam /> New Reward
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Reward</DialogTitle>
          <DialogDescription>
            Add a new reward to your inventory
          </DialogDescription>
        </DialogHeader>
        <RewardForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
