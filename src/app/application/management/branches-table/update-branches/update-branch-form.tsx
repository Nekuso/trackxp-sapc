"use client";

import { useEffect, useState, useTransition } from "react";
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

import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { TbCurrencyPeso } from "react-icons/tb";
import { useSelector } from "react-redux";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBranches } from "@/hooks/useBranches";

export default function BranchForm({ dataProps, setDialogOpen }: any) {
  const { updateBranch } = useBranches();
  const [isPending, startTransition] = useTransition();

  const branchScheema = z.object({
    id: z.number(),
    branch_name: z.string().min(1, {
      message: "Branch Name is required",
    }),
    branch_location: z.string().min(1, {
      message: "Payment method is required",
    }),
    contact_number: z.string().min(1, {
      message: "Contact number is required",
    }),
  });

  const form = useForm<z.infer<typeof branchScheema>>({
    resolver: zodResolver(branchScheema),
    defaultValues: {
      id: dataProps.id,
      branch_name: dataProps.branch_name,
      branch_location: dataProps.branch_location,
      contact_number: dataProps.contact_number,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      await updateBranch(data);

      setDialogOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="branch_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Branch Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Branch Name"
                  value={field.value}
                  className="bg-lightComponentBg text-white placeholder:text-white/40 border border-lightBorder"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branch_location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Branch Location</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Branch Location"
                  value={field.value}
                  className="bg-lightComponentBg text-white placeholder:text-white/40 border border-lightBorder"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Contact Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Contact Number"
                  value={field.value}
                  className="bg-lightComponentBg text-white placeholder:text-white/40 border border-lightBorder"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 text-red-500 bg-transparent hover:bg-transparent"
            type="button"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Submit</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
