import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/sapsc-logo-light.png";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start place-items-center gap-[15vw] md:gap-28 overflow-hidden">
      <nav className="w-full h-auto py-2 md:py-4 flex justify-between place-items-center">
        <Link href={"/"} className="w-[13%] max-md:w-[40%]">
          <Image src={Logo} alt="SAPSC Logo" className="w-full"></Image>
        </Link>
      </nav>
    </div>
  );
}
