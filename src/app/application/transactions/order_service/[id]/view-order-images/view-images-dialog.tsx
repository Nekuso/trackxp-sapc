import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

import OrderForm from "./view-images-form";
import { FaRegImages } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { plugin } from "postcss";
import Autoplay from "embla-carousel-autoplay";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import { useImages } from "@/hooks/useImages";

export default function UpdateOrderDialog({ data }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [isPending, startTransition] = useTransition();
  const { deleteImage } = useImages();

  async function onSubmit(dataProps: any) {
    startTransition(async () => {
      const result = await deleteImage(dataProps);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "⚠️ Error",
          description: "Failed to delete image",
        });
        return;
      }
      sonner("✨Success", {
        description: "Deleted successfully",
      });
      return;
    });
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          <FaRegImages />
          Images
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[870px] 2xl:max-w-[970px] bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Images</DialogTitle>
          <DialogDescription>Preview all proof images</DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col justify-center min-h-[400px]">
          <div className="w-full h-full flex flex-col justify-center px-12 rounded-2xl">
            {data.image_entries.length > 0 && (
              <div className="w-full h-full flex flex-col justify-center">
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full max-w-full px-12 rounded-2xl"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                  opts={{
                    loop: true,
                    dragFree: true,
                  }}
                >
                  <CarouselContent className="rounded-3xl ">
                    {data.image_entries.map((image: any, index: any) => (
                      <CarouselItem key={index} className="basis-1/3">
                        <div className="p-1">
                          <AspectRatio
                            ratio={1}
                            className="rounded-md relative group scale-95 hover:scale-100 duraton-300 transition-all "
                          >
                            <Image
                              src={image.image_url ?? ""}
                              alt="Photo by Drew Beamer"
                              fill
                              className="rounded-md object-cover group-hover:opacity-25 transition-all duration-300"
                            />
                            <div className="w-full hidden group-hover:flex gap-2 justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <Button
                                variant={"destructive"}
                                className="text-white text-xs rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300"
                                onClick={() => onSubmit(image)}
                              >
                                <span className={cn({ hidden: isPending })}>
                                  Remove
                                </span>
                                <AiOutlineLoading3Quarters
                                  className={cn(" animate-spin", {
                                    hidden: !isPending,
                                  })}
                                />
                              </Button>
                            </div>
                          </AspectRatio>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <span className="text-slate-400 text-xs w-full text-center pt-4">
                  Upload limit: {7 - data.image_entries.length} images remaining
                </span>
              </div>
            )}
            {data.image_entries.length < 1 && (
              <span className="text-center w-full h-full flex justify-center place-items-center text-slate-400">
                No Images
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
