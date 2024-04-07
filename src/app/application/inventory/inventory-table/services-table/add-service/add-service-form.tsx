import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { Textarea } from "@/components/ui/textarea";
import { TbCurrencyPeso } from "react-icons/tb";

import BranchInput from "./branch-input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import ImageInput from "./image-input";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useServices } from "@/hooks/useServices";

export const serviceSchema = z.object({
  name: z.string().min(1, {
    message: "Service name is required",
  }),
  description: z.string().min(1, {
    message: "Service description is required",
  }),
  image_url: z.string().default("something"),
  duration: z.coerce.number(),
  price: z.coerce.number().min(1, {
    message: "Service price is required",
  }),
  inventory_id: z
    .string()
    .min(1, {
      message: "Service inventory id is required",
    })
    .transform((arg) => new Number(arg)),
  status: z
    .string()
    .min(1, {
      message: "Service status is required",
    })
    .default("Available"),
});

export default function ServiceForm({ setDialogOpen }: any) {
  const [isPending, startTransition] = useTransition();
  const { createService } = useServices();
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      duration: 0,
      price: 0.0,
      status: "Available",
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await createService(data, 5000);

      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️Error",
          description: error.message,
        });
        return;
      }
      // toast({
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md border border-lightBorder bg-slate-950 p-4">
      //       {/* <code className="text-white">Successfully Registered!</code> */}
      //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // });
      sonner("✨Success", {
        description: `Service Added!`,
      });
      setDialogOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex flex-col min-h-[300px]">
          <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full flex justify-center place-items-center gap-4">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem className="h-fit">
                    <FormControl>
                      <ImageInput data={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Service Name</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-lg bg-lightComponentBg border-slate-600/50"
                            {...field}
                            type="text"
                            placeholder="Service name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex gap-4">
                  <div className="w-full flex flex-col">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Price</FormLabel>
                          <div className="w-full flex place-items-center rounded-lg bg-lightComponentBg border border-slate-600/50 ">
                            <div className="h-full px-3 bg-darkBg rounded-tl-lg rounded-bl-lg">
                              <TbCurrencyPeso className="h-full w-5 text-center" />
                            </div>
                            <FormControl>
                              <Input
                                className="w-full text-start bg-transparent border-none rounded-tr-lg rounded-br-lg"
                                {...field}
                                type="number"
                                placeholder="0.00"
                              />
                            </FormControl>
                          </div>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">
                            Duration (mins)
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="rounded-lg bg-lightComponentBg border-slate-600/50"
                              {...field}
                              type="number"
                              placeholder="Duration"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="inventory_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Branch</FormLabel>
                      <BranchInput data={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Description</FormLabel>
                    <Textarea
                      className="bg-lightComponentBg border-slate-600/50 w-full h-full resize-none"
                      placeholder="Description"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Create Service</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
