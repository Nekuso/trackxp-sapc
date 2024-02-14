import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/sapsc-logo-light.png";
import Hamburger from "./home-menu/index";
import { links } from "./links";

export default function Nav() {
  return (
    <nav className="w-full h-auto py-2 md:py-4 flex justify-between place-items-center">
      <div className="w-[13%] max-md:w-[40%]">
        <Image src={Logo} alt="SAPSC Logo" className="w-full"></Image>
      </div>
      <div className="w-fit flex justify-center place-items-center gap-16 max-md:hidden">
        <ul className="w-full flex gap-8">
          {links.map((link, i) => {
            const { title, href } = link;
            return (
              <Link
                href={href}
                className="text-xs font-medium link"
                key={`b_${i}`}
              >
                {title}
              </Link>
            );
          })}
        </ul>

        <Link
          href="/"
          className="w-fit h-fit px-6 py-3 bg-white text-black rounded-full font-bold text-xs hover: hover:bg-slate-200 transition duration-300 shadow-lg"
        >
          Login
        </Link>
      </div>
      <Hamburger />
    </nav>
  );
}
