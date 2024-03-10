"use client";

import Link from "next/link";
import Image from "next/image";
import trackxpIcon from "@/icons/trackxp-icon.svg";
import {
  sideLinks,
  systemLinks,
} from "@/components/layouts/side-bar/sideLinks";
import { pathNameFilter } from "@/hooks/pathNameFilter";
import { usePathname } from "next/navigation";
export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 flex flex-col place-items-center justify-start w-auto h-full py-8 px-3 bg-darkComponentBg border border-lightBorder gap-20 rounded-xl">
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
                } hover:bg-applicationPrimary text-sm font-medium p-4 rounded-full hover:shadow-sm hover:shadow-applicationPrimary transition-all gap-4`}
                key={`b_${i}`}
              >
                <Image
                  src={icon}
                  alt="trackxp icon"
                  className="w-6"
                  title={title}
                />
                <span className="invisible group-hover:visible opacity-0 duration-500 group-hover:opacity-100 absolute left-full group-hover:left-[150%] transition-all text-sm bg-applicationPrimary rounded-lg px-4 py-2">
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
                className="group relative w-auto flex place-items-center justify-start bg-transparent hover:bg-applicationPrimary text-sm font-medium p-4 rounded-full hover:shadow-sm hover:shadow-applicationPrimary transition-all gap-4"
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
        </div>
      </div>
    </div>
  );
}
