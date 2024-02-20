import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/sapsc-logo-light.png";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center place-items-center overflow-hidden">
      <div className="flex flex-col p-8 place-items-center w-[500px] min-h-[500px] bg-darkGray rounded-2xl shadow-lg border border-lightBorder">
        <Link href={"/"}>
          <Image src={Logo} alt="Sentro Auto Parts & Service Center" />
        </Link>
        <div className="flex flex-col w-full gap-6">
          <h5 className="w-full text-center text-xl font-bold">
            Welcome Back!
          </h5>
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col w-full gap-3">
              <label htmlFor="">Email:</label>
              <input
                type="text"
                className="w-full p-3 rounded-md bg-inputBg "
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <label htmlFor="">Password:</label>
              <input
                type="password"
                className="w-full p-3 rounded-md bg-inputBg "
              />
            </div>
          </div>
          <button className="w-full p-5 bg-homePrimary font-bold rounded-lg">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
