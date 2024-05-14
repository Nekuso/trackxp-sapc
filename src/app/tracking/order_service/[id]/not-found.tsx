"use client";

import Image from "next/image";
import recieptLogo from "@/images/receipt-logo-white.svg";
import NotFound from "@/images/not-found.png";
import { useRouter } from "next/navigation";

export default function ProductNotFound() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center place-items-center">
      <div className="w-full md:w-[400px] h-fit flex flex-col gap-8 bg-darkComponentBg p-6 md:p-6 rounded-2xl border border-lightBorder">
        <Image
          src={recieptLogo}
          alt="Receipt Logo"
          className="w-[60%] mx-auto mb-2 cursor-pointer"
          onClick={() => router.push("https://trackxp-sapsc.vercel.app/")}
        />
        <Image src={NotFound} alt="Receipt Logo" className="w-[60%] mx-auto" />
        <span className="w-full text-center text-lg font-bold">
          Order Not Found
        </span>
      </div>
    </div>
  );
}
