"use client";
import Navbar from "@/components/layouts/navbar/index";
import Image from "next/image";
import SearchIcon from "@/icons/search-icon.svg";
import AndroidIcon from "@/icons/android-icon.svg";
import Object1 from "@/images/home-object-1.png";
import Object2 from "@/images/home-object-2.png";
import Object3 from "@/images/home-object-3.png";
import VideoImage from "@/images/video-image.png";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { BiSearchAlt } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export default function LandingPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [trackingId, setTrackingId] = useState("");

  const trackingSchema: any = z.object({
    trackingId: z.string().min(1),
  });
  const form = useForm<z.infer<typeof trackingSchema>>({
    resolver: zodResolver(trackingSchema),
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      if (data.trackingId.length < 10) {
        toast({
          title: "ERROR",
          variant: "destructive",
          description: "Please enter a valid tracking ID",
        });
        return;
      }

      router.push(`/tracking/order_service/${data.trackingId}`);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTrackingId("");
      form.setValue("trackingId", "");
    });
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-start place-items-center gap-[15vw] md:gap-28 overflow-hidden">
      <div className="w-full h-auto flex justify-center sticky top-0 z-50 shadow-[0 4px 30px rgba(0, 0, 0, 0.1)] bg-[rgba(0, 0, 0, 0.61)] backdrop-blur-sm">
        <Navbar />
      </div>
      <section className="w-full flex flex-col place-items-center gap-7">
        <h1 className="relative text-[8vw] md:text-5xl font-black uppercase text-center leading-[120%]">
          We take <mark className="text-homePrimary bg-transparent">care</mark>{" "}
          of your
          <br className="hidden md:block"></br>{" "}
          <mark className="text-homePrimary bg-transparent">Vehicle</mark> like
          it’s our own!
          <div className="absolute flex justify-center place-items-center -bottom-[-80%] -right-20 md:bottom-[80%] md:-right-60 w-28 md:w-auto">
            <div className="absolute blob-gradient"></div>
            <Image
              src={Object1}
              alt="Object1"
              className="relative w-full h-full"
            />
          </div>
          <div className="absolute top-[-60%] -left-10 md:top-[-120%] md:-left-44 w-16 md:w-auto">
            <div className="absolute blob-gradient"></div>
            <Image src={Object2} alt="Object2" className="w-full h-full" />
          </div>
          <div className="absolute bottom-[-25%] -left-10 md:bottom-[-260%] md:-left-20 w-20 md:w-auto">
            <div className="absolute blob-gradient"></div>
            <Image src={Object3} alt="Object3" className="w-full h-full" />
          </div>
        </h1>
        <h5 className="text-md md:text-lg text-center text-lightGray">
          The best genuine parts and high quality services for your car needs.
          <br className="hidden md:block"></br>
          Only here at Sentro Autoparts!
        </h5>

        <div className="w-full flex justify-center place-items-center gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-72 flex justify-between place-items-center border border-lightGray rounded-full px-1 py-1"
            >
              <FormField
                control={form.control}
                name="trackingId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        className="w-full h-full bg-transparent border-transparent px-4 text-sm 
                        text-white focus:outline-none"
                        {...field}
                        type="text"
                        placeholder="Tracking ID"
                        value={field.value || ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="text-xs font-bold rounded-full flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
                type="submit"
              >
                <BiSearchAlt
                  className={cn("scale-150", { hidden: isPending })}
                />
                <AiOutlineLoading3Quarters
                  className={cn("animate-spin", {
                    hidden: !isPending,
                  })}
                />
              </Button>
            </form>
          </Form>
          <button className="flex w-fit h-autp px-7 py-3 bg-white border border-white text-black rounded-full text-xs font-bold justify-center place-items-center gap-2 hover:scale-105 transition-all duration-300">
            <Image
              src={AndroidIcon}
              alt="android icon"
              className="h-full"
            ></Image>
            DOWNLOAD
          </button>
        </div>
        <div className="w-fit flex justify-center place-items-center gap-6">
          <div className="w-fit flex justify-center place-items-center gap-3">
            <h1 className="text-[8vw] md:text-5xl font-bold leading-[120%]">
              30K
            </h1>
            <p className="text-sm md:text-md leading-[120%]">
              Satisfied <br /> Customers
            </p>
          </div>
          <div className="w-[2px] h-8 bg-lightGray"></div>
          <div className="w-fit flex justify-center place-items-center gap-3">
            <h1 className="text-[8vw] md:text-5xl font-bold leading-[120%]">
              5K
            </h1>
            <p className="text-sm md:text-md leading-[120%]">
              Mobile <br /> Downloads
            </p>
          </div>
        </div>
      </section>
      <section className="h-screen flex justify-center place-items-center">
        <div className="w-full h-full">
          <Image
            src={VideoImage}
            alt="Object1"
            className="w-full opacity-40"
          ></Image>
        </div>
      </section>
      <Sonner />
      <Toaster />
    </div>
  );
}
