"use client";

import Link from "next/link";
import Image from "next/image";
import recieptLogo from "@/images/receipt-logo-white.svg";

export default function ProductNotFound() {
  return (
    <div className="w-full flex justify-center place-items-center">
      <div className="w-full md:w-[400px] h-fit flex flex-col gap-4 bg-darkComponentBg p-6 md:p-6 rounded-2xl border border-lightBorder">
        <Link href={"https://trackxp-sapsc.vercel.app/"}>
          <Image
            src={recieptLogo}
            alt="Receipt Logo"
            className="w-[60%] mx-auto mb-2"
          />
        </Link>
        <span className="w-full text-center text-lg font-bold">
          Order Not Found
        </span>
      </div>
    </div>
  );
}
