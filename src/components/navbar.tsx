import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/sapsc-logo-light.png";

export default function Nav() {
  return (
    <nav className="w-full h-auto py-4 flex justify-between place-items-center">
      <div className="w-[13%] max-md:w-[40%]">
        <Image src={Logo} alt="SAPSC Logo" className="w-full"></Image>
      </div>
      <div className="w-fit flex justify-center place-items-center gap-16 max-md:hidden">
        <ul className="w-full flex gap-8">
          <Link href="/" className="text-xs font-medium link">
            Home
          </Link>
          <Link href="/" className="text-xs font-medium link">
            Services
          </Link>
          <Link href="/" className="text-xs font-medium link">
            Products
          </Link>
          <Link href="/" className="text-xs font-medium link">
            FAQ
          </Link>
          <Link href="/" className="text-xs font-medium link">
            About
          </Link>
        </ul>

        <Link
          href="/"
          className="w-fit h-fit px-6 py-3 bg-white text-black rounded-full font-bold text-xs hover: hover:bg-slate-200 transition duration-300 shadow-lg"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}