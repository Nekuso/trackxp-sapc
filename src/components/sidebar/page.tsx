import Image from "next/image";
import Logo from "@/images/sapsc-logo-light.png";
import Link from "next/link";
import { sideLinks } from "@/components/sidebar/sideLinks";

export default function SideBar() {
  return (
    <div className="flex flex-col place-items-center justify-start min-w-52 h-full p-4 bg-darkComponentBg border border-lightBorder rounded-2xl gap-4">
      <Image src={Logo} alt="SAPSC Logo" className="w-2/3"></Image>
      <div className="w-full flex flex-col gap-4">
        {sideLinks.map((link, i) => {
          const { title, href } = link;
          return (
            <Link
              href={href}
              className="w-full hover:bg-white hover:text-black text-xs font-medium p-4 rounded-lg"
              key={`b_${i}`}
            >
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
