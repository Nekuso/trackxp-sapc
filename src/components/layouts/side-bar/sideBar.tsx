"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import trackxpIcon from "@/icons/trackxp-icon.svg";
import {
  sideLinks,
  systemLinks,
} from "@/components/layouts/side-bar/sideLinks";
import { pathNameFilter } from "@/hooks/pathNameFilter";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/actions/index";
import { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
export default function SideBar() {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSignOut = async () => {
    toast({
      description: "Logging out...",
    });
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await signOut();
    });
  };

  return (
    <div className="h-full py-4 sticky top-0 z-10">
      <div className="flex flex-col place-items-center justify-start w-auto h-full py-8 px-3 bg-darkComponentBg border border-lightBorder gap-20 rounded-xl">
        <Link href="/" className="w-full flex justify-center">
          <Image src={trackxpIcon} alt="trackxp icon" className="w-[60%]" />
        </Link>

        <div className="w-auto h-full flex flex-col justify-between">
          <div className="w-auto flex flex-col gap-2">
            {sideLinks.map((link, i) => {
              const { title, href, icon } = link;
              return (
                <Link
                  href={href}
                  className={`group relative w-auto flex place-items-center justify-start bg-${
                    href.toLowerCase() === pathname
                      ? "applicationPrimary"
                      : href
                          .toLowerCase()
                          .includes(pathNameFilter(pathname).toLowerCase())
                      ? "applicationPrimary"
                      : "transparent"
                  } hover:bg-applicationPrimary text-sm font-medium p-4 rounded-xl primary-glow transition-all duration-300 gap-4 hover:scale-110`}
                  key={`b_${i}`}
                >
                  <Image src={icon} alt="trackxp icon" className="w-6" />
                  <span className="invisible group-hover:visible opacity-0 duration-500 group-hover:opacity-100 absolute left-full group-hover:left-[150%] transition-all text-sm bg-applicationPrimary rounded-lg px-4 py-2 shadow-2xl">
                    {title}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="w-full flex flex-col gap-2">
            {systemLinks.map((link, i) => {
              const { title, href, icon } = link;
              return (
                <Link
                  href={href}
                  className="group relative w-auto flex place-items-center justify-start bg-transparent hover:bg-applicationPrimary text-sm font-medium p-4 rounded-xl primary-glow transition-all duration-300 gap-4 hover:scale-110"
                  key={`b_${i}`}
                >
                  <Image
                    src={icon}
                    alt="trackxp icon"
                    className="w-6"
                    title={title}
                  />
                  <span className="invisible group-hover:visible opacity-0 duration-500 group-hover:opacity-100 absolute left-full group-hover:left-[150%] transition-all text-sm bg-applicationPrimary rounded-lg px-4 py-2 z-50">
                    {title}
                  </span>
                </Link>
              );
            })}
            <div
              onClick={() => {
                onSignOut();
              }}
              className="cursor-pointer group relative w-auto flex place-items-center justify-center bg-transparent hover:bg-red-500 text-sm font-medium p-4 rounded-xl hover:shadow-sm primary-glow transition-all gap-4"
            >
              <LogOut className={cn("w-4 h-5", { hidden: isPending })} />
              <AiOutlineLoading3Quarters
                className={cn(" animate-spin w-4 h-5", { hidden: !isPending })}
              />
              <span className="w-[100px] text-center invisible group-hover:visible opacity-0 duration-500 group-hover:opacity-100 absolute left-full group-hover:left-[150%] transition-all text-sm bg-red-500 rounded-lg px-4 py-2 z-50">
                Log out
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
