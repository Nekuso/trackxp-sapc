"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
export default function TrackingSkeleton() {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex flex-col max-w-[1840px] justify-center place-items-center gap-4">


      <span>Loading...</span>
    </div>
  );
}
