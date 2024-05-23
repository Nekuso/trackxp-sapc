"use client";

import { useState, useTransition } from "react";
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
import { RiDeleteBinLine } from "react-icons/ri";

import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { useBranches } from "@/hooks/useBranches";

export default function DeleteBranch({ dataProps }: any) {
  const [isPending, startTransition] = useTransition();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const branch = dataProps;
  const { deleteBranch } = useBranches();

  async function onSubmit(dataProps?: any) {
    startTransition(async () => {
      await deleteBranch(dataProps, 2000);

      toast({
        description: (
          <pre className="mt-2 min-w-[340px] max-width-[840px] rounded-md border border-lightBorder bg-slate-950 p-4">
            <code className="text-white">Successfuly! Deleted</code>
          </pre>
        ),
      });
      setDialogIsOpen(false);
    });
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-8 bg-red-500 data-[state=open]:text-white hover:bg-red-600 hover:text-white"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Delete Branch</DialogTitle>
          <DialogDescription>
            This operation is destructive. You wont be able to revert this
            action. Are you sure you want to delete this branch?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-4 justify-center place-items-center">
          <span className="text-xs font-bold text-muted-foreground cursor-pointer hover:underline transition-all duration-300">
            Cancel
          </span>

          <Button
            variant="destructive"
            className="text-xs font-bold min-w-[100px] rounded-md flex gap-2 transition-all duration-300"
            onClick={() => onSubmit(branch)}
          >
            <span
              className={cn("flex gap-2 place-items-center justify-center", {
                hidden: isPending,
              })}
            >
              <RiDeleteBinLine />
              Delete
            </span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
