"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import { useEffect, useRef, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useOrderServices } from "@/hooks/useOrderServices";
import Autoplay from "embla-carousel-autoplay";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useImages } from "@/hooks/useImages";

export default function ImageForm({ setDialogOpen, data }: any) {
  const orderService = data;
  const { createImage } = useImages();
  const [isPending, startTransition] = useTransition();
  const { updateOrderService } = useOrderServices();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [images, setImages] = useState([]);

  const maxNumber = 7 - data.image_entries.length;
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages(imageList as never[]);
  };

  function onCancel() {
    setDialogOpen(false);
  }

  async function onSubmit(dataProps: any) {
    startTransition(async () => {
      if (dataProps.length === 0) {
        toast({
          variant: "destructive",
          title: "⚠️ Error",
          description: "No images uploaded",
        });
        return;
      }
      for (let i = 0; i < dataProps.length; i++) {
        const image = dataProps[i];
        const result = await createImage(
          {
            image_url: `${image.file.name}`,
            image: image.file,
            id: orderService.id,
            file_name: image.file.name,
          },
          1000
        );

        if (result) {
          toast({
            variant: "destructive",
            title: "⚠️ Error",
            description: `${result.message}`,
          });
          return setDialogOpen(false);
        }
      }
      sonner("✨Success", {
        description: `${dataProps.length} Image${
          dataProps.length > 1 ? "s" : ""
        } Added!`,
      });
      return setDialogOpen(false);
    });
  }

  return (
    <div className="w-full flex-col flex justify-between">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="w-full flex flex-col gap-2 min-h-[400px]">
            <div className="w-full flex justify-end place-items-center gap-3">
              <Button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                className="flex gap-2"
              >
                <FaCloudUploadAlt className="text-white " /> Upload
              </Button>
              <Button
                variant={"destructive"}
                onClick={onImageRemoveAll}
                className="flex gap-2"
              >
                <AiOutlineClear className="text-white " /> Clear
              </Button>
            </div>
            <div className="w-full flex flex-col gap-2 min-h-[400px]">
              {images.length > 0 && (
                <div className="w-full h-full flex flex-col justify-center px-12 rounded-2xl">
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
                      {imageList.map((image, index) => (
                        <CarouselItem key={index} className="basis-1/3">
                          <div className="p-1">
                            <AspectRatio
                              ratio={1}
                              className="rounded-md relative group scale-95 hover:scale-100 duraton-300 transition-all "
                            >
                              <Image
                                src={image.dataURL ?? ""}
                                alt="Photo by Drew Beamer"
                                fill
                                className="rounded-md object-cover group-hover:opacity-25 transition-all duration-300"
                              />
                              <div className="w-full hidden group-hover:flex gap-2 justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Button
                                  className="text-white text-xs rounded-full bg-applicationPrimary"
                                  onClick={() => onImageUpdate(index)}
                                >
                                  Update
                                </Button>
                                <Button
                                  variant={"destructive"}
                                  className="text-white text-xs rounded-full bg-red-500 hover:bg-red-600"
                                  onClick={() => onImageRemove(index)}
                                >
                                  Remove
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
                </div>
              )}

              {images.length < 1 && (
                <span className="text-center w-full h-full flex justify-center place-items-center text-slate-400">
                  Upload Images
                </span>
              )}
              <span className="text-slate-400 text-xs w-full text-center pt-4">
                Upload limit: {maxNumber - images.length} images remaining
              </span>
            </div>
          </div>
        )}
      </ImageUploading>
      <DialogFooter>
        <Button
          className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 text-red-500 bg-transparent hover:bg-transparent"
          type="button"
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
        <Button
          className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
          type="submit"
          onClick={() => {
            onSubmit(images);
          }}
        >
          <span className={cn({ hidden: isPending })}>Submit</span>
          <AiOutlineLoading3Quarters
            className={cn(" animate-spin", { hidden: !isPending })}
          />
        </Button>
      </DialogFooter>
    </div>
  );
}
