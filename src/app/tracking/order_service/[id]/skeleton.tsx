"use client";

import Image from "next/image";
import Searching from "@/images/loading-search.gif";
export default function TrackingSkeleton() {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex flex-col max-w-[1840px] justify-center place-items-center gap-4">
      <Image
        src={Searching}
        alt="Receipt Logo"
        className="w-full md:w-[25%] mx-auto"
      />
    </div>
  );
}
