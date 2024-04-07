"use client";

import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="w-full flex justify-center place-items-center">
      <div className="w-full h-[805px] 2xl:h-[882px] flex max-w-[1840px] justify-center place-items-center gap-7 py-4">
        Service not found
        <Link href={"/application/inventory"}>Go back</Link>
      </div>
    </div>
  );
}
