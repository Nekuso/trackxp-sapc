import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { Textarea } from "@/components/ui/textarea";
import { TbCurrencyPeso } from "react-icons/tb";

import BranchInput from "./branch-input";
import BrandInput from "./brand-input";

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
import { useParts } from "@/hooks/useParts";

export const partSchema = z.object({
  name: z.string().min(1, {
    message: "Part name is required",
  }),
  description: z.string().min(1, {
    message: "Part description is required",
  }),
  image_url: z.string().default("something"),
  barcode: z.string().min(1, {
    message: "Part barcode is required",
  }),
  stock_quantity: z.coerce.number().min(1, {
    message: "Part quantity must be at least 1",
  }),
  price: z.coerce.number().min(1, {
    message: "Part price is required",
  }),
  inventory_id: z
    .string()
    .min(1, {
      message: "Part inventory id is required",
    })
    .transform((arg) => new Number(arg)),
  brand_id: z
    .string()
    .min(1, {
      message: "Part uom id is required",
    })
    .transform((arg) => new Number(arg)),
  status: z
    .string()
    .min(1, {
      message: "Part status is required",
    })
    .default("Available"),
});

export default function PartForm({ setDialogOpen }: any) {
  const [isPending, startTransition] = useTransition();
  const { createPart } = useParts();
  const form = useForm<z.infer<typeof partSchema>>({
    resolver: zodResolver(partSchema),
    defaultValues: {
      stock_quantity: 0,
      price: 0.0,
      status: "Available",
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await createPart(data, 5000);

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
        description: `Part Added!`,
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
                        <FormLabel className="text-xs">Part Name</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-lg bg-lightComponentBg border-slate-600/50"
                            {...field}
                            type="text"
                            placeholder="Part name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex gap-4">
                  <div className="w-full flex flex-col ">
                    <FormField
                      control={form.control}
                      name="brand_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Brand</FormLabel>
                          <FormControl>
                            <BrandInput data={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <FormField
                      control={form.control}
                      name="stock_quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Quantity</FormLabel>
                          <div className="w-full flex justify-between place-items-center gap-2">
                            <div
                              className="bg-lightComponentBg p-3 rounded-lg cursor-pointer hover:bg-applicationPrimary transition-all duration-300 text-center select-none"
                              onClick={() => {
                                form.setValue(
                                  "stock_quantity",
                                  form.getValues("stock_quantity") - 10
                                );
                              }}
                            >
                              <FiMinus />
                            </div>
                            <FormControl>
                              <Input
                                className="rounded-lg bg-lightComponentBg border-slate-600/50 text-center"
                                {...field}
                                type="number"
                                placeholder="0"
                              />
                            </FormControl>
                            <div
                              className="bg-lightComponentBg p-3 rounded-lg cursor-pointer hover:bg-applicationPrimary transition-all duration-300 text-center select-none"
                              onClick={() => {
                                form.setValue(
                                  "stock_quantity",
                                  form.getValues("stock_quantity") + 10
                                );
                              }}
                            >
                              <IoMdAdd />
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-4">
              <div className="w-[70%] flex flex-col">
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
            <div className="w-full ">
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Barcode</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg bg-lightComponentBg border-slate-600/50"
                        {...field}
                        type="text"
                        placeholder="Enter Barcode"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <span className={cn({ hidden: isPending })}>Create Part</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
