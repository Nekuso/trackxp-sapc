import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/sapsc-logo-light.png";

export default function Nav() {
  return (
    <nav className="w-full h-auto py-4 flex justify-between place-items-center">
      <div className="w-[12%]">
        <Image src={Logo} alt="SAPSC Logo" className="w-full"></Image>
      </div>
      <div className="w-fit flex justify-center place-items-center gap-32">
        <ul className="w-full flex gap-8">
          <Link href="/" className="text-sm">
            Home
          </Link>
          <Link href="/" className="text-sm">
            Services
          </Link>
          <Link href="/" className="text-sm">
            Produts
          </Link>
          <Link href="/" className="text-sm">
            FAQ
          </Link>
          <Link href="/" className="text-sm">
            About
          </Link>
        </ul>

        <Link
          href="/"
          className="w-fit h-fit px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover: hover:bg-slate-200 transition duration-300 shadow-lg"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
